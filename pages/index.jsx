// rwitapa/the_ai_way_gemini/the_ai_way_gemini-staging/pages/index.jsx
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { auth, db } from "../lib/firebaseClient";
import { signInAnonymously } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

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
    
    // useRef to ensure initialization logic runs only once.
    const appInitialized = useRef(false);

    const sectionRefs = {
        courses: useRef(null),
        whatYouGet: useRef(null),
        mentors: useRef(null),
        testimonials: useRef(null),
    };

    useEffect(() => {
        if (!auth || !db || appInitialized.current) {
            return;
        }

        let unsubscribe = () => {};

        const initializeApp = async () => {
            appInitialized.current = true; // Mark as initialized to prevent re-runs
            
            try {
                await signInAnonymously(auth);
                const user = auth.currentUser;
                if (!user) {
                    console.error("Critical: Failed to sign in anonymously.");
                    return;
                }

                const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
                const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);

                // --- Step 1: Perform a one-time database check and maintenance ---
                const docSnap = await getDoc(datesDocRef);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                let currentSprints = [];
                let currentAccelerators = [];
                let needsDbUpdate = false;

                if (!docSnap.exists()) {
                    console.log("No cohort document found. Generating initial dates.");
                    needsDbUpdate = true;
                } else {
                    const data = docSnap.data();
                    currentSprints = data.sprint ? data.sprint.map(d => d.toDate()) : [];
                    currentAccelerators = data.accelerator ? data.accelerator.map(c => ({ start: c.start.toDate(), end: c.end.toDate() })) : [];
                }
                
                const prunedSprints = currentSprints.filter(d => d >= today);
                if (prunedSprints.length !== currentSprints.length) needsDbUpdate = true;

                const prunedAccelerators = currentAccelerators.filter(c => c.start >= today);
                if (prunedAccelerators.length !== currentAccelerators.length) needsDbUpdate = true;
                
                let finalSprints = [...prunedSprints];
                let finalAccelerators = [...prunedAccelerators];
                const fiveYearsFromNow = new Date();
                fiveYearsFromNow.setFullYear(fiveYearsFromNow.getFullYear() + 5);

                const lastSprint = finalSprints.length > 0 ? finalSprints[finalSprints.length - 1] : new Date(0);
                if (lastSprint < fiveYearsFromNow) {
                    const nextDayToGenerate = lastSprint > new Date(0) ? new Date(lastSprint) : today;
                    if (lastSprint > new Date(0)) nextDayToGenerate.setDate(nextDayToGenerate.getDate() + 1);
                    finalSprints.push(...getNextSprintDates(nextDayToGenerate, 5));
                    needsDbUpdate = true;
                }
                
                const lastAcceleratorStart = finalAccelerators.length > 0 ? finalAccelerators[finalAccelerators.length - 1].start : new Date(0);
                if (lastAcceleratorStart < fiveYearsFromNow) {
                    const nextDayToGenerate = lastAcceleratorStart > new Date(0) ? new Date(lastAcceleratorStart) : today;
                    if (lastAcceleratorStart > new Date(0)) nextDayToGenerate.setDate(nextDayToGenerate.getDate() + 1);
                    finalAccelerators.push(...getNextAcceleratorDates(nextDayToGenerate, 5));
                    needsDbUpdate = true;
                }

                const finalUniqueSprints = [...new Map(finalSprints.map(item => [item.getTime(), item])).values()].sort((a,b) => a-b);
                const finalUniqueAccelerators = [...new Map(finalAccelerators.map(item => [item.start.getTime(), item])).values()].sort((a,b) => a.start - b.start);
                const newDates = { sprint: finalUniqueSprints, accelerator: finalUniqueAccelerators };

                if (needsDbUpdate) {
                    console.log("DB Maintenance: Creating/pruning/extending dates.");
                    await setDoc(datesDocRef, newDates);
                }

                // Directly set the state with the corrected dates *before* listening.
                setCohortDates(newDates);

                // --- Step 2: Attach the real-time listener for future changes ---
                unsubscribe = onSnapshot(datesDocRef, (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        setCohortDates({
                            sprint: data.sprint ? data.sprint.map(d => d.toDate()) : [],
                            accelerator: data.accelerator ? data.accelerator.map(c => ({ start: c.start.toDate(), end: c.end.toDate() })) : []
                        });
                    }
                }, (error) => console.error("Error listening to cohort dates:", error));

            } catch (error) {
                console.error("Error during app initialization:", error);
            }
        };

        initializeApp();
        
        return () => unsubscribe();

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

    const handleSaveDates = async (newDates) => {
        if (!db) {
            console.error("Firestore is not initialized.");
            return;
        }
        const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
        const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);
        try {
            await setDoc(datesDocRef, newDates);
            alert('Cohort dates updated successfully!');
        } catch (error) {
            console.error("Failed to save cohort dates:", error);
            alert('Error saving dates. Please check the console.');
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
