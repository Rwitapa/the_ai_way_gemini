// rwitapa/the_ai_way_gemini/the_ai_way_gemini-staging/pages/index.jsx

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { auth, db } from "../lib/firebaseClient";
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

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
    const [cohortDates, setCohortDates] = useState({
        sprint: [],
        accelerator: [],
    });
    const [calendarFor, setCalendarFor] = useState(null);
    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
    const [selectedCohorts, setSelectedCohorts] = useState({
        sprint: null,
        accelerator: null,
    });
    
    // A flag to ensure the database maintenance logic runs only once per session.
    const maintenanceCheckPerformed = useRef(false);

    const sectionRefs = {
        courses: useRef(null),
        whatYouGet: useRef(null),
        mentors: useRef(null),
        testimonials: useRef(null),
    };

    useEffect(() => {
        if (!auth || !db) {
            console.warn("Firebase not initialized. Cannot connect to the database.");
            return;
        }

        const signInAndListen = async () => {
            try {
                await signInAnonymously(auth);
            } catch (error) {
                console.error("Firebase anonymous sign-in failed:", error);
            }
        };

        const authUnsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
                const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);

                const dbUnsubscribe = onSnapshot(datesDocRef, (docSnap) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Normalize to the beginning of the day

                    // If the document doesn't exist, create it and populate the local state.
                    if (!docSnap.exists()) {
                        // Prevent this block from running in a loop if there's an issue.
                        if (maintenanceCheckPerformed.current) return;
                        maintenanceCheckPerformed.current = true;
                        
                        console.log("No cohort dates document found. Creating one with dates for the next 5 years.");
                        const initialDates = {
                            sprint: getNextSprintDates(today, 5),
                            accelerator: getNextAcceleratorDates(today, 5),
                        };
                        
                        // Set local state immediately for a fast UI response.
                        setCohortDates(initialDates); 
                        // Asynchronously write the new dates to the database.
                        setDoc(datesDocRef, initialDates).catch(e => console.error("Error creating initial dates doc:", e));
                        return;
                    }

                    // If the document exists, parse the dates.
                    const data = docSnap.data();
                    const firestoreDates = {
                        sprint: data.sprint ? data.sprint.map(d => d.toDate()) : [],
                        accelerator: data.accelerator ? data.accelerator.map(c => ({
                            start: c.start.toDate(),
                            end: c.end.toDate()
                        })) : []
                    };
                    
                    setCohortDates(firestoreDates);

                    // --- Database Maintenance Logic ---
                    if (!maintenanceCheckPerformed.current) {
                        maintenanceCheckPerformed.current = true;
                        let needsUpdate = false;

                        // 1. Prune past dates
                        const prunedSprints = firestoreDates.sprint.filter(d => d >= today);
                        const prunedAccelerators = firestoreDates.accelerator.filter(c => c.start >= today);

                        if (prunedSprints.length !== firestoreDates.sprint.length || prunedAccelerators.length !== firestoreDates.accelerator.length) {
                            needsUpdate = true;
                        }

                        // 2. Extend dates if the calendar is running short
                        const fiveYearsFromNow = new Date();
                        fiveYearsFromNow.setFullYear(fiveYearsFromNow.getFullYear() + 5);
                        
                        let finalSprints = [...prunedSprints];
                        let finalAccelerators = [...prunedAccelerators];

                        const lastSprint = finalSprints.length > 0 ? finalSprints[finalSprints.length - 1] : today;
                        if (lastSprint < fiveYearsFromNow) {
                            const newSprints = getNextSprintDates(lastSprint, 5);
                            finalSprints.push(...newSprints.filter(d => d > lastSprint));
                            needsUpdate = true;
                        }

                        const lastAccelerator = finalAccelerators.length > 0 ? finalAccelerators[finalAccelerators.length - 1].start : today;
                        if (lastAccelerator < fiveYearsFromNow) {
                            const newAccelerators = getNextAcceleratorDates(lastAccelerator, 5);
                            finalAccelerators.push(...newAccelerators.filter(c => c.start > lastAccelerator));
                            needsUpdate = true;
                        }

                        if (needsUpdate) {
                             const updatedDates = { 
                                sprint: [...new Map(finalSprints.map(item => [item.getTime(), item])).values()].sort((a,b) => a-b), 
                                accelerator: [...new Map(finalAccelerators.map(item => [item.start.getTime(), item])).values()].sort((a,b) => a.start - b.start)
                            };
                            console.log("DB Maintenance: Pruning past dates and extending future dates.");
                            setDoc(datesDocRef, updatedDates).catch(e => console.error("Error updating dates doc:", e));
                        }
                    }

                }, (error) => {
                    console.error("Error listening to cohort dates:", error);
                });

                return () => dbUnsubscribe();
            }
        });

        signInAndListen();
        return () => authUnsubscribe();

    }, [db, auth]);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const futureSprints = cohortDates.sprint.filter(d => d >= today);
        const futureAccelerators = cohortDates.accelerator.filter(c => c.start >= today);

        setSelectedCohorts({
            sprint: futureSprints.length > 0 ? futureSprints[0] : null,
            accelerator: futureAccelerators.length > 0 ? futureAccelerators[0] : null,
        });
    }, [cohortDates]);

    useEffect(() => {
        document.title = "The AI Way";
    }, []);

    useEffect(() => {
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

    const handleSaveDates = async (newDates) => {
        if (!db) {
            console.error("Firestore is not initialized. Cannot save dates.");
            return;
        }
        const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
        const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);
        try {
            await setDoc(datesDocRef, newDates);
            alert('Cohort dates updated successfully!');
        } catch (error) {
            console.error("Failed to save cohort dates to Firestore:", error);
            alert('Error saving dates. Please check the console.');
        }
    };

    const handleOpenCalendar = (e, courseType) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCalendarPosition({
            top: rect.bottom + 8,
            left: rect.left,
        });
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
        >
            <AnimatePresence mode="wait">
              {showCoursesPage ? (
                <motion.div key="courses-page" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                  <CoursesPage
                    onBack={() => setShowCoursesPage(false)}
                    cohortDates={cohortDates}
                    handleOpenCalendar={handleOpenCalendar}
                    setSelectedCohorts={setSelectedCohorts}
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
