import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { auth, db } from "../lib/firebaseClient";
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { doc, onSnapshot, setDoc, Timestamp } from 'firebase/firestore';

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
    
    const sectionRefs = {
        courses: useRef(null),
        whatYouGet: useRef(null),
        mentors: useRef(null),
        testimonials: useRef(null),
    };

    // This effect handles authentication and fetching data for all users.
    useEffect(() => {
        let unsubscribe = () => {};

        const authUnsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // A user is signed in (either as admin or anonymously).
                // We have permission to read the dates document.
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
                    } else {
                        // Document doesn't exist. Clear local dates. The admin must create it.
                        setCohortDates({ sprint: [], accelerator: [] });
                    }
                }, (error) => console.error("Error in onSnapshot listener:", error));
            } else {
                // No user. Attempt to sign in anonymously to get read permissions.
                signInAnonymously(auth).catch((error) => {
                    console.error("CRITICAL: Anonymous sign-in is failing. This must be fixed in the Firebase project settings.", error);
                });
            }
        });
        
        return () => {
            authUnsubscribe();
            unsubscribe();
        };
    }, []);

    // This effect sets the default selected date when the cohort dates are loaded.
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

    // This effect handles animations.
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

    // This function is for the admin to save manual edits from the modal.
    const handleSaveDates = async (newDates) => {
        if (!auth.currentUser || auth.currentUser.isAnonymous) {
            alert('You must be logged in as an admin to save changes.');
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
            console.error("Error saving dates to Firestore:", error);
            alert(`Error saving dates: ${error.message}`);
        }
    };

    // **THE HACK**: This function is self-contained and works only for the admin.
    const forceSyncDates = async () => {
        if (!auth.currentUser || auth.currentUser.isAnonymous) {
            alert('You must be logged in as an admin to force sync.');
            return;
        }

        const confirmation = confirm("Are you sure? This will overwrite existing dates with the default schedule for the next 3 months.");
        if (!confirmation) return;

        try {
            // 1. Generate the new dates
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const newSprints = getNextSprintDates(tomorrow, 3);
            const newAccelerators = getNextAcceleratorDates(tomorrow, 5);
            const newDatesForDb = {
                sprint: newSprints.map(d => Timestamp.fromDate(d)),
                accelerator: newAccelerators.map(c => ({
                    start: Timestamp.fromDate(c.start),
                    end: Timestamp.fromDate(c.end)
                }))
            };
            
            // 2. Save them directly to Firestore
            const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
            const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);
            await setDoc(datesDocRef, newDatesForDb);

            // 3. Update the local state to show the changes immediately
            setCohortDates({ sprint: newSprints, accelerator: newAccelerators });

            alert('Default dates have been successfully synced!');

        } catch (error) {
            console.error("FORCE SYNC: Error generating or saving dates:", error);
            alert('An error occurred during the sync. Please check the console.');
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
            onSaveDates={handleSaveDates}
            formatSprintDate={formatSprintDate}
            formatAcceleratorDate={formatAcceleratorDate}
            forceSync={forceSyncDates}
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
