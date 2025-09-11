import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Icon, courseData, mascots, formatSprintDate, formatAcceleratorDate, RAZORPAY_PAYMENT_URL, SUPERSTAR_ACCELERATOR_URL } from '../lib/constants';

const CourseContent = ({ course, paymentUrl, selectedCohort, onOpenCalendar }) => {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (moduleTitle) => {
      const identifier = `${course.title}-${moduleTitle}`;
      setOpenModule(openModule === identifier ? null : identifier);
  };

  const formattedDate = course.mascot === 'champion' ? formatSprintDate(selectedCohort) : formatAcceleratorDate(selectedCohort);
 
  return (
      <motion.div 
          key={course.mascot}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 mb-12 lg:mb-16">
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                  <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 shadow-lg">
                      <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 flex-shrink-0 mt-1">{mascots[course.mascot]}</div>
                          <div>
                              <h2 className="text-3xl font-bold text-white leading-tight">{course.title}</h2>
                              <p className="text-lg text-purple-300 mt-2">{course.subtitle}</p>
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                          <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg"><Icon name="bar-chart-2" size={18} className="text-purple-400"/> <div><p className="text-gray-400 text-xs">Level</p><p className="font-semibold text-white">{course.level}</p></div></div>
                          <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg"><Icon name="clock" size={18} className="text-purple-400"/> <div><p className="text-gray-400 text-xs">Duration</p><p className="font-semibold text-white">{course.duration}</p></div></div>
                      </div>
                      
                      <div className="mb-6">
                          <label className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2 block">Select Cohort Date</label>
                          <button 
                              onClick={onOpenCalendar} 
                              className="w-full text-left p-3 rounded-xl border border-gray-700 bg-gray-800 hover:bg-purple-900/30 hover:border-purple-600 transition-all flex justify-between items-center group"
                          >
                               <div className="flex items-center gap-3">
                                  <Icon name="calendar" size={20} className="text-purple-400 transition-colors group-hover:text-purple-300"/>
                                  <span className="font-semibold text-white text-sm">{formattedDate}</span>
                              </div>
                              <Icon name="calendar" size={20} className="text-purple-400 transition-colors group-hover:text-purple-300"/>
                          </button>
                      </div>

                      <div className="text-center mt-auto">
                          <div className="mb-4">
                              <p className="text-white font-bold text-3xl inline-block mr-3">{course.price}</p>
                              <p className="text-gray-400 line-through inline-block">{course.originalPrice}</p>
                              <p className="text-green-400 font-semibold text-sm mt-1">{course.bonus}</p>
                          </div>
                          <motion.a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="w-full block py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              Enroll for {course.price}
                          </motion.a>
                          <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1.5"><Icon name="shield-check" size={14}/> {course.guarantee}</p>
                      </div>
                  </div>
              </div>

              <div className="lg:col-span-6">
                  <div className="flex flex-col gap-8">
                      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 shadow-lg">
                          <h3 className="text-2xl font-bold text-white mb-4">What You'll Build</h3>
                          <div className="space-y-4">
                              {course.keyOutcomes.map((outcome, i) => (
                                  <div key={i} className="flex items-center gap-4 bg-gray-800/60 p-4 rounded-lg">
                                      <Icon name={outcome.icon} size={24} className="text-purple-400 flex-shrink-0" />
                                      <span className="text-gray-200 font-medium">{outcome.text}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 shadow-lg hidden lg:block">
                          <p className="text-gray-300 text-lg leading-relaxed">{course.detailedDescription}</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 shadow-lg overflow-hidden">
              <h3 className="text-3xl md:text-4xl font-bold text-white p-8 pb-6">Course Modules</h3>
              <div className="border-t border-gray-800">
                  {course.modules.map((module, index) => (
                      <div key={index} className="border-b border-gray-800 last:border-b-0">
                          <button
                              className="w-full flex justify-between items-center text-left p-5 hover:bg-gray-800/50 transition-colors"
                              onClick={() => toggleModule(module.title)}
                          >
                              <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                              <motion.div animate={{ rotate: openModule === `${course.title}-${module.title}` ? 45 : 0 }}>
                                  <Icon name="plus" size={24} className="text-purple-500 transform transition-transform duration-300" strokeWidth={2.5} />
                              </motion.div>
                          </button>
                          <AnimatePresence>
                              {openModule === `${course.title}-${module.title}` && (
                                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                      <div className="px-5 pb-5">
                                      <p className="text-gray-400">{module.summary}</p>
                                      </div>
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </div>
                  ))}
              </div>
          </div>
      </motion.div>
  );
};

const CoursesPage = ({ onBack, cohortDates, handleOpenCalendar, setSelectedCohorts, selectedCohorts }) => {
    const [activeCourseId, setActiveCourseId] = useState('sprint');
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            video.current.play().catch(error => {
                console.log("Courses page video autoplay was prevented:", error);
            });
        }
    }, []);

    const activeCourseData = activeCourseId === 'sprint' ? courseData.sprint : courseData.accelerator;

    return (
        <div className="min-h-screen bg-gray-950 relative overflow-hidden">
            <video
                ref={videoRef}
                poster="/poster.png"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.3]"
                src="/faq.mp4"
                playsInline muted autoPlay loop preload="auto" aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/80 to-gray-950"></div>
          
            <div className="relative z-10 container mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-16">
                <button onClick={onBack} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8 group">
                    <Icon name="arrow-left" size={20} className="mr-2 transition-transform group-hover:-translate-x-1" /> Back to Home
                </button>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Your Path to AI Mastery</h1>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">Detailed curriculum and schedule for our hands-on, outcome-focused courses.</p>
                </div>
                
                <div className="flex justify-center mb-12">
                    <div className="relative flex items-center bg-gray-800/50 border border-gray-700 rounded-full p-1.5">
                        <button
                            onClick={() => setActiveCourseId('sprint')}
                            className={`px-6 py-2.5 text-sm font-semibold rounded-full relative z-10 transition-colors ${activeCourseId === 'sprint' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Champion Sprint
                        </button>
                        <button
                            onClick={() => setActiveCourseId('accelerator')}
                            className={`px-6 py-2.5 text-sm font-semibold rounded-full relative z-10 transition-colors ${activeCourseId === 'accelerator' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Superstar Accelerator
                        </button>
                        <motion.div
                            layoutId="course-selector-bg"
                            className="absolute inset-0 bg-purple-600/60 border border-purple-500 rounded-full z-0"
                            animate={{ x: activeCourseId === 'sprint' ? '0%' : '100%' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            style={{ width: '50%'}}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <CourseContent
                        key={activeCourseId}
                        course={activeCourseData}
                        paymentUrl={activeCourseId === 'sprint' ? RAZORPAY_PAYMENT_URL : SUPERSTAR_ACCELERATOR_URL}
                        selectedCohort={selectedCohorts[activeCourseId]}
                        onOpenCalendar={(e) => handleOpenCalendar(e, activeCourseId)}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};
