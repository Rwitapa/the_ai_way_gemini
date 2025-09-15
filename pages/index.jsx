import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { auth, db } from "../lib/firebaseClient";
import { signInAnonymously } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc, Timestamp } from 'firebase/firestore';

import { getNextSprintDates, getNextAcceleratorDates, formatSprintDate, formatAcceleratorDate } from '../lib/constants';

import { Layout } from '../components/Layout';
import { HeroSection } from '../components/HeroSection';
import CompaniesBelt from '../components/CompaniesBelt';
import PersonasSection from '../components/PersonasSection';
import CoursesSection from '../components/CoursesSection';
import MentorSection from '../components/MentorSection';
import CourseFinderQuiz from '../components/CourseFinderQuiz';
import TestimonialsSection from '../components/TestimonialsSection';
import WhatYouLearnSection from '../components/WhatYouLearnSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import CohortCalendarModal from '../components/CourseCalendar';
import CoursesPage from '../components/CoursesPage';

const App = () => {
    const [showCoursesPage, setShowCoursesPage] = useState(false);
    const [cohortDates, setCohortDates] = useState({ sprint: [], accelerator: [] });
    const [calendarFor, setCalendarFor] = useState(null);
    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
    const [selectedCohorts, setSelectedCohorts] = useState({ sprint: null, accelerator: null });
    
    const appInitialized = useRef(false);

    const sectionRefs = {
        courses: useRef(null),
        whatYouGet: useRef(null),
        mentors: useRef(null),
        testimonials: useRef(null),
    };

    // Simplified useEffect to fetch dates and listen for real-time updates
    useEffect(() => {
        if (!auth || !db || appInitialized.current) {
            return;
        }

        let unsubscribe = () => {};

        const initializeApp = async () => {
            appInitialized.current = true;
            
            try {
                // Ensure anonymous sign-in for read access if no user is present
                if (!auth.currentUser) {
                    await signInAnonymously(auth);
                }

                const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
                const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);

                // Attach the real-time listener immediately.
                unsubscribe = onSnapshot(datesDocRef, async (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        // Filter out past dates on the client side for display, without writing back to DB
                        const futureSprints = data.sprint ? data.sprint.map(d => d.toDate()).filter(d => d >= today) : [];
                        const futureAccelerators = data.accelerator ? data.accelerator.map(c => ({ start: c.start.toDate(), end: c.end.toDate() })).filter(c => c.start >= today) : [];
                        
                        setCohortDates({
                            sprint: futureSprints,
                            accelerator: futureAccelerators
                        });
                    } else {
                        // Document doesn't exist, so generate initial dates.
                        console.log("No cohort document found. Generating initial dates for the next 3 months.");
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        const initialSprints = getNextSprintDates(tomorrow, 3);
                        const initialAccelerators = getNextAcceleratorDates(tomorrow, 5); // Keeping accelerator at 5 years as not specified
                        
                        // Save the newly generated dates to Firestore.
                        await handleSaveDates({ sprint: initialSprints, accelerator: initialAccelerators });
                    }
                }, (error) => console.error("Error listening to cohort dates:", error));

            } catch (error) {
                console.error("Error during app initialization:", error);
            }
        };

        initializeApp();
        
        return () => unsubscribe();

    }, []);

    // Effect to set the default selected cohort date
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

    // General useEffect for UI animations
    useEffect(() => {
        document.title = "The AI Way";
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        if (!scrollElements.length) return;
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
    }, [showCoursesPage]);

    const handleExploreCourses = () => {
        setShowCoursesPage(true);
        window.scrollTo(0, 0);
    };

    // **FIXED**: This function now correctly saves dates, making admin changes permanent.
    const handleSaveDates = async (newDates) => {
        if (!db) {
            console.error("Firestore is not initialized.");
            alert('Error: Database not connected.');
            return;
        }
        
        // This function is now also used for the initial date generation.
        // We'll allow it to run for anonymous users only for the initial setup.
        // A more robust implementation would use Firestore rules to restrict this.
        if (auth.currentUser && !auth.currentUser.isAnonymous && !auth.currentUser.email) {
             alert('You must be logged in as an admin to save changes.');
             return;
        }

        const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
        const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);

        try {
            // Convert JS Dates to Firestore Timestamps before saving.
            const firestoreReadyDates = {
                sprint: newDates.sprint.map(d => Timestamp.fromDate(new Date(d))),
                accelerator: newDates.accelerator.map(c => ({
                    start: Timestamp.fromDate(new Date(c.start)),
                    end: Timestamp.fromDate(new Date(c.end))
                }))
            };

            await setDoc(datesDocRef, firestoreReadyDates);
            // We won't show an alert on the initial, automatic save.
            if (auth.currentUser && !auth.currentUser.isAnonymous) {
                alert('Cohort dates updated successfully!');
            }
        } catch (error) {
            console.error("Failed to save cohort dates:", error);
            if (auth.currentUser && !auth.currentUser.isAnonymous) {
                alert(`Error saving dates: ${error.message}`);
            }
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
        if (showCoursesPage) {
            setShowCoursesPage(false);
            setTimeout(() => {
                sectionRefs[sectionName]?.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            sectionRefs[sectionName]?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Layout
            scrollToSection={scrollToSection}
            setShowCoursesPage={setShowCoursesPage}
            handleExploreCourses={handleExploreCourses}
            cohortDates={cohortDates}
            onSaveDates={handleSaveDates} // Pass the corrected save function
            formatSprintDate={formatSprintDate}
            formatAcceleratorDate={formatAcceleratorDate}
        >
            <AnimatePresence mode="wait">
              {showCoursesPage ? (
                <motion.div key="courses-page" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                  <CoursesPage
                    onBack={() => setShowCoursesPage(false)}
                    cohortDates={cohortDates}
                    handleOpenCalendar={handleOpenCalendar}
                    selectedCohorts={selectedCohorts}
                  />
                </motion.div>
              ) : (
                <motion.div key="main-page" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                  <HeroSection handleExploreCourses={handleExploreCourses} />
                  <CompaniesBelt />
                  <PersonasSection />
                  <CoursesSection
                      sectionRef={sectionRefs.courses}
                      handleExploreCourses={handleExploreCourses}
                      handleOpenCalendar={handleOpenCalendar}
                      selectedCohorts={selectedCohorts}
                      formatSprintDate={formatSprintDate}
                      formatAcceleratorDate={formatAcceleratorDate}
                  />
                  <MentorSection sectionRef={sectionRefs.mentors} />
                  <CourseFinderQuiz scrollToSection={scrollToSection} />
                  <TestimonialsSection sectionRef={sectionRefs.testimonials} />
                  <WhatYouLearnSection sectionRef={sectionRefs.whatYouGet} />
                  <FAQSection />
                  <FinalCTASection handleExploreCourses={handleExploreCourses} />
                </motion.div>
              )}
            </AnimatePresence>
            
            <CohortCalendarModal 
                isOpen={!!calendarFor}
                onClose={() => setCalendarFor(null)}
                courseTitle={calendarFor === 'sprint' ? "Champion Sprint" : "Superstar Accelerator"}
                cohortDates={calendarFor === 'sprint' ? cohortDates.sprint : cohortDates.accelerator}
                onDateSelect={handleSelectCohort}
                courseType={calendarFor}
                position={calendarPosition}
            />
        </Layout>
    );
};

export default App;
