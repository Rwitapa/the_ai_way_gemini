// components/CoursesSection.jsx
import { motion } from "framer-motion";
import React from 'react';
import Link from 'next/link';
import Icon from './common/Icon.jsx';
import { courseData } from '../lib/constants';

const CoursesSection = ({ sectionRef, handleOpenCalendar, selectedCohorts, openCheckoutForm, formatSprintDate, formatAcceleratorDate }) => {
    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-gray-900 animate-on-scroll">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <p className="text-green-400 font-semibold">Registrations are now open!</p>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Choose Your Path to Impact</h2>
                    <div className="mt-6 flex justify-center items-center gap-x-4 md:gap-x-6 text-sm text-gray-300">
                        <span className="flex items-center gap-2"><Icon name="play-circle" size={18}/> ONLINE</span>
                        <span className="flex items-center gap-2 whitespace-nowrap"><Icon name="tool" size={18}/> HANDS-ON</span>
                        <span className="flex items-center gap-2"><Icon name="award" size={18}/> CERTIFICATE</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <motion.div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 flex flex-col justify-between" whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }}>
                        <div>
                            {/* --- START OF THE FIX --- */}
                            <h3 className="text-3xl font-bold text-white mb-2 text-center">{courseData.sprint.title}</h3>
                            <p className="text-gray-400 mb-6 text-center">{courseData.sprint.tagline}</p>
                            {/* --- END OF THE FIX --- */}
                            
                            <ul className="text-gray-300 space-y-3 mb-8 text-base">
                                {courseData.sprint.keyOutcomes.map((outcome, i) => (
                                    <li key={i} className="flex items-start gap-3"><Icon name="check-circle" size={20} className="text-purple-500 mt-0.5 flex-shrink-0" /><span>{outcome.text}</span></li>
                                ))}
                            </ul>
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Select Cohort Date</h4>
                                <button onClick={(e) => handleOpenCalendar(e, 'sprint')} className="text-white text-base font-semibold border border-gray-600 rounded-lg px-4 py-2 w-full text-left hover:bg-gray-800 transition-colors flex justify-between items-center group">
                                    <span className="truncate">{formatSprintDate(selectedCohorts.sprint)}</span>
                                    <Icon name="calendar" size={18} className="ml-2 text-purple-400 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                            <div className="mb-6">
                                <p className="text-white font-bold text-2xl inline-block mr-3">{courseData.sprint.price}</p>
                                <p className="text-gray-400 line-through inline-block">{courseData.sprint.originalPrice}</p>
                                <p className="text-green-400 font-semibold text-sm mt-1">{courseData.sprint.bonus}</p>
                            </div>
                        </div>
                        <motion.button onClick={() => openCheckoutForm(courseData.sprint)} className="mt-auto block w-full py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Enroll Now
                        </motion.button>
                    </motion.div>
                    <motion.div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl p-6 md:p-8 border border-purple-700 flex flex-col justify-between relative" whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }} transition={{ type: 'spring', stiffness: 300 }}>
                        <div className="absolute top-0 right-0 -mt-3 mr-5 px-4 py-1 bg-yellow-500 text-black font-bold rounded-full text-sm">Popular</div>
                        <div>
                            {/* --- START OF THE FIX --- */}
                            <h3 className="text-3xl font-bold text-white mb-2 text-center">{courseData.accelerator.title}</h3>
                            <p className="text-purple-300 mb-6 text-center">{courseData.accelerator.tagline}</p>
                            {/* --- END OF THE FIX --- */}

                            <ul className="text-gray-200 space-y-3 mb-8 text-base">
                                {courseData.accelerator.keyOutcomes.map((outcome, i) => (
                                     <li key={i} className="flex items-start gap-3"><Icon name="check-circle" size={20} className="text-green-400 mt-0.5 flex-shrink-0" /><span>{outcome.text}</span></li>
                                ))}
                            </ul>
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Select Cohort Date</h4>
                                <button onClick={(e) => handleOpenCalendar(e, 'accelerator')} className="text-white text-base font-semibold border border-gray-600 rounded-lg px-4 py-2 w-full text-left hover:bg-gray-800 transition-colors flex justify-between items-center group">
                                    <span className="truncate">{formatAcceleratorDate(selectedCohorts.accelerator)}</span>
                                    <Icon name="calendar" size={18} className="ml-2 text-purple-400 group-hover:text-white transition-colors"/>
                                </button>
                            </div>
                            <div className="mb-6">
                                <p className="text-white font-bold text-2xl inline-block mr-3">{courseData.accelerator.price}</p>
                                <p className="text-gray-300 line-through inline-block">{courseData.accelerator.originalPrice}</p>
                                <p className="text-green-400 font-semibold text-sm mt-1">{courseData.accelerator.bonus}</p>
                            </div>
                        </div>
                        <motion.button onClick={() => openCheckoutForm(courseData.accelerator)} className="mt-auto block w-full py-3 px-6 text-center rounded-full bg-white text-gray-950 font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Enroll Now
                        </motion.button>
                    </motion.div>
                </div>
                <div className="text-center mt-16">
                    <Link href="/courses" passHref>
                        <motion.a className="py-3 px-8 text-lg font-semibold rounded-full bg-gray-800 text-white shadow-lg ring-1 ring-white/10 hover:bg-gray-700 cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            View Detailed Curriculum
                        </motion.a>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
