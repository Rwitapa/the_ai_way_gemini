// pages/index.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { auth, db } from "../lib/firebaseClient";
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { doc, onSnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { formatSprintDate, formatAcceleratorDate } from '../lib/constants';
import { Layout } from '../components/Layout';
import { HeroSection } from '../components/HeroSection';
import CompaniesBelt from '../components/CompaniesBelt';
import PersonasSection from '../components/PersonasSection';
import CoursesSection from '../components/CoursesSection';
import MentorSection from '../components/MentorSection';
import CourseFinderQuiz from '../components/CourseFinderQuiz';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';

const CohortCalendarModal = dynamic(() => import('../components/CourseCalendar'));
const CheckoutForm = dynamic(() => import('../components/CheckoutForm'));

const App = () => {
    const router = useRouter();
    const [cohortDates, setCohortDates] = useState({ sprint: [], accelerator: [] });
    const [calendarFor, setCalendarFor] = useState(null);
    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
    const [selectedCohorts, setSelectedCohorts] = useState({ sprint: null, accelerator: null });
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [checkoutCourse, setCheckoutCourse] = useState(null);

    const sectionRefs = {
        courses: useRef(null),
        mentors: useRef(null),
        testimonials: useRef(null),
    };

    useEffect(() => {
        let unsubscribe = () => {};
        const authUnsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
                const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);
                unsubscribe = onSnapshot(datesDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const futureSprints = data.sprint ? data.sprint.map(d => d.toDate()).filter(d => d >= today) : [];
                        const futureAccelerators = data.accelerator ? data.accelerator.map(c => ({ start: c.start.toDate(), end: c.end.toDate() })).filter(c => c.start >= today) : [];
                        setCohortDates({ sprint: futureSprints, accelerator: futureAccelerators });
                    }
                });
            } else {
                signInAnonymously(auth).catch((error) => console.error("Anonymous sign-in failed.", error));
            }
        });
        return () => { authUnsubscribe(); unsubscribe(); };
    }, []);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const futureSprints = cohortDates.sprint.filter(d => d >= today);
        const futureAccelerators = cohortDates.accelerator.filter(c => c.start >= today);
        setSelectedCohorts({
            sprint: futureSprints[0] || null,
            accelerator: futureAccelerators[0] || null,
        });
    }, [cohortDates]);

    useEffect(() => {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        scrollElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    
    const handleSaveDates = async (newDates) => {
        if (!auth.currentUser || auth.currentUser.isAnonymous) {
            alert('Admin access required to save changes.');
            return;
        }
        const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
        const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);
        try {
            const firestoreReadyDates = {
                sprint: newDates.sprint.map(d => Timestamp.fromDate(new Date(d))),
                accelerator: newDates.accelerator.map(c => ({
                    start: Timestamp.fromDate(new Date(c.start)),
                    end: Timestamp.fromDate(new Date(c.end))
                }))
            };
            await setDoc(datesDocRef, firestoreReadyDates);
            alert('Cohort dates updated successfully!');
        } catch (error) {
            console.error("Error saving dates:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleOpenCalendar = (e, courseType) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCalendarPosition({ top: rect.bottom + 8, left: rect.left });
        setCalendarFor(courseType);
    };

    const handleSelectCohort = (courseType, cohort) => {
        setSelectedCohorts(prev => ({ ...prev, [courseType]: cohort }));
        setCalendarFor(null);
    };

    const scrollToSection = (sectionName) => {
        // Special case for quiz button to navigate to the new page
        if (sectionName === 'courses') {
            router.push('/courses');
        } else {
            sectionRefs[sectionName]?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openCheckoutForm = (course) => {
        setCheckoutCourse(course);
        setShowCheckoutForm(true);
    };

    const handlePayment = async (customerDetails) => {
        setShowCheckoutForm(false);
        const course = checkoutCourse;
        const cohortTypeKey = course.mascot === 'champion' ? 'sprint' : 'accelerator';
        const selectedCohort = selectedCohorts[cohortTypeKey];
        if (!selectedCohort) {
            alert('Please select a cohort date before enrolling.');
            return;
        }
        const orderResponse = await fetch('/api/create-razorpay-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: parseFloat(course.price.replace('₹', '').replace(',', '')) * 100,
                courseType: course.title,
                cohort: selectedCohort,
                ...customerDetails,
            }),
        });
        const order = await orderResponse.json();
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'The AI Way',
            description: course.title,
            order_id: order.id,
            handler: (response) => {
                router.push(`/thank-you?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}`);
            },
            prefill: { ...customerDetails },
            theme: { color: '#8B5CF6' }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <Layout
            scrollToSection={scrollToSection}
            cohortDates={cohortDates}
            onSaveDates={handleSaveDates}
            formatSprintDate={formatSprintDate}
            formatAcceleratorDate={formatAcceleratorDate}
        >
            <HeroSection />
            <CompaniesBelt />
            <PersonasSection />
            <CoursesSection
                sectionRef={sectionRefs.courses}
                handleOpenCalendar={handleOpenCalendar}
                selectedCohorts={selectedCohorts}
                openCheckoutForm={openCheckoutForm}
                formatSprintDate={formatSprintDate}
                formatAcceleratorDate={formatAcceleratorDate}
            />
            <MentorSection sectionRef={sectionRefs.mentors} />
            <CourseFinderQuiz scrollToSection={scrollToSection} />
            <TestimonialsSection sectionRef={sectionRefs.testimonials} />
            <FAQSection />
            <FinalCTASection />
            
            <CohortCalendarModal 
                isOpen={!!calendarFor}
                onClose={() => setCalendarFor(null)}
                courseTitle={calendarFor === 'sprint' ? "Champion Sprint" : "Superstar Accelerator"}
                cohortDates={calendarFor === 'sprint' ? cohortDates.sprint : cohortDates.accelerator}
                onDateSelect={handleSelectCohort}
                courseType={calendarFor}
                position={calendarPosition}
            />
            {showCheckoutForm && checkoutCourse && (
                <CheckoutForm
                    isOpen={showCheckoutForm}
                    onClose={() => setShowCheckoutForm(false)}
                    onCheckout={handlePayment}
                    courseTitle={checkoutCourse.title}
                    price={checkoutCourse.price}
                />
            )}
        </Layout>
    );
};

export default App;
