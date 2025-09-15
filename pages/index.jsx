import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { auth, db } from "../lib/firebaseClient";
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
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
    
    // useRef to ensure maintenance logic runs only once per session.
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

        const manageAndListenForDates = (user) => {
            if (!user) return;
            
            const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
            const datesDocRef = doc(db, `/artifacts/${appId}/public/data/cohorts/dates`);

            // --- Step 1: Perform a one-time check and maintenance operation ---
            const runMaintenance = async () => {
                if (maintenanceCheckPerformed.current) return;
                maintenanceCheckPerformed.current = true;

                try {
                    const docSnap = await getDoc(datesDocRef);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    let currentSprints = [];
                    let currentAccelerators = [];
                    let needsUpdate = false;

                    if (!docSnap.exists()) {
                        console.log("No cohort document. Will create one.");
                        needsUpdate = true;
                    } else {
                        const data = docSnap.data();
                        currentSprints = data.sprint ? data.sprint.map(d => d.toDate()) : [];
                        currentAccelerators = data.accelerator ? data.accelerator.map(c => ({ start: c.start.toDate(), end: c.end.toDate() })) : [];
                    }

                    // Prune past dates
                    const prunedSprints = currentSprints.filter(d => d >= today);
                    if (prunedSprints.length !== currentSprints.length) needsUpdate = true;

                    const prunedAccelerators = currentAccelerators.filter(c => c.start >= today);
                    if (prunedAccelerators.length !== currentAccelerators.length) needsUpdate = true;

                    // Extend dates if calendar is running short
                    let finalSprints = [...prunedSprints];
                    let finalAccelerators = [...prunedAccelerators];
                    const fiveYearsFromNow = new Date();
                    fiveYearsFromNow.setFullYear(fiveYearsFromNow.getFullYear() + 5);

                    const lastSprint = finalSprints.length > 0 ? finalSprints[finalSprints.length - 1] : new Date(0);
                    if (lastSprint < fiveYearsFromNow) {
                        const nextDayToGenerate = lastSprint > new Date(0) ? new Date(lastSprint) : today;
                        if (lastSprint > new Date(0)) nextDayToGenerate.setDate(nextDayToGenerate.getDate() + 1);
                        
                        const newSprints = getNextSprintDates(nextDayToGenerate, 5);
                        finalSprints.push(...newSprints);
                        needsUpdate = true;
                    }
                    
                    const lastAcceleratorStart = finalAccelerators.length > 0 ? finalAccelerators[finalAccelerators.length - 1].start : new Date(0);
                    if (lastAcceleratorStart < fiveYearsFromNow) {
                        const nextDayToGenerate = lastAcceleratorStart > new Date(0) ? new Date(lastAcceleratorStart) : today;
                        if (lastAcceleratorStart > new Date(0)) nextDayToGenerate.setDate(nextDayToGenerate.getDate() + 1);

                        const newAccelerators = getNextAcceleratorDates(nextDayToGenerate, 5);
                        finalAccelerators.push(...newAccelerators);
                        needsUpdate = true;
                    }

                    if (needsUpdate) {
                        console.log("Performing DB maintenance: creating/pruning/extending dates.");
                        const uniqueSprints = [...new Map(finalSprints.map(item => [item.getTime(), item])).values()].sort((a,b) => a-b);
                        const uniqueAccelerators = [...new Map(finalAccelerators.map(item => [item.start.getTime(), item])).values()].sort((a,b) => a.start - b.start);
                        
                        await setDoc(datesDocRef, { sprint: uniqueSprints, accelerator: uniqueAccelerators });
                    }
                } catch (error) {
                    console.error("Error during date maintenance:", error);
                }
            };

            // --- Step 2: Attach the real-time listener ---
            const unsubscribe = onSnapshot(datesDocRef, (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    const liveDates = {
                        sprint: data.sprint ? data.sprint.map(d => d.toDate()) : [],
                        accelerator: data.accelerator ? data.accelerator.map(c => ({ start: c.start.toDate(), end: c.end.toDate() })) : []
                    };
                    setCohortDates(liveDates);
                }
            }, (error) => {
                console.error("Error listening to cohort dates:", error);
            });

            runMaintenance(); // Run maintenance once, then the listener will handle real-time changes.
            return unsubscribe;
        };

        // Main authentication flow
        let unsubscribe = () => {};
        if (auth.currentUser) {
            unsubscribe = manageAndListenForDates(auth.currentUser);
        } else {
            const authUnsubscribe = onAuthStateChanged(auth, (user) => {
                signInAnonymously(auth).then(cred => {
                    unsubscribe = manageAndListenForDates(cred.user);
                }).catch(error => console.error("Anonymous sign-in failed:", error));
                authUnsubscribe(); // We only need this to run once to get a user
            });
        }
        
        return () => unsubscribe();

    }, [db, auth]);

    // This effect correctly sets the default selected cohort whenever the main date list changes.
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

    // This function for admin saves remains the same, as it was correct.
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
