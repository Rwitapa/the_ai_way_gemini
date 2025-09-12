import { motion } from "framer-motion";
import React from 'react';
import { Icon, courseData, RAZORPAY_PAYMENT_URL, SUPERSTAR_ACCELERATOR_URL } from '../lib/constants';

const CoursesSection = ({ sectionRef, handleExploreCourses, handleOpenCalendar, selectedCohorts, formatSprintDate, formatAcceleratorDate }) => {
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 flex flex-col justify-between" whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }}>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{courseData.sprint.title}</h3>
                            <p className="text-lg text-gray-400 mb-4">{courseData.sprint.subtitle}</p>
                            <p className="text-gray-300 mb-6 text-base">{courseData.sprint.description}</p>
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Select Cohort Date</h4>
                                <button onClick={(e) => handleOpenCalendar(e, 'sprint')} className="text-white text-base font-semibold border border-gray-600 rounded-lg px-4 py-2 w-full text-left hover:bg-gray-800 transition-colors flex justify-between items-center group">
                                    <span className="truncate">{formatSprintDate(selectedCohorts.sprint)}</span>
                                    <Icon name="calendar" size={18} className="ml-2 text-purple-400 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                            <ul className="text-gray-400 space-y-2 mb-6 text-sm">
                                <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-500 mr-2 mt-1 flex-shrink-0" /><span>Learn to spot repetitive reports that eat your time.</span></li>
                                <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-500 mr-2 mt-1 flex-shrink-0" /><span>Automate a high-value report using SQL or no-code.</span></li>
                                <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-500 mr-2 mt-1 flex-shrink-0" /><span>Package your win into an Impact Memo.</span></li>
                            </ul>
                            <div className="mb-6">
                                <p className="text-white font-bold text-2xl inline-block mr-3">{courseData.sprint.price}</p>
                                <p className="text-gray-400 line-through inline-block">{courseData.sprint.originalPrice}</p>
                                <p className="text-green-400 font-semibold text-sm mt-1">{courseData.sprint.bonus}</p>
                            </div>
                        </div>
                        <motion.a href={RAZORPAY_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Enroll Now
                        </motion.a>
                    </motion.div>
                    <motion.div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl p-6 md:p-8 border border-purple-700 flex flex-col justify-between relative" whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }} transition={{ type: 'spring', stiffness: 300 }}>
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1 bg-yellow-500 text-black font-bold rounded-full text-sm">Popular</div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{courseData.accelerator.title}</h3>
                            <p className="text-lg text-gray-300 mb-4">{courseData.accelerator.subtitle}</p>
                            <p className="text-gray-200 mb-6 text-base">{courseData.accelerator.description}</p>
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Select Cohort Date</h4>
                                <button onClick={(e) => handleOpenCalendar(e, 'accelerator')} className="text-white text-base font-semibold border border-gray-600 rounded-lg px-4 py-2 w-full text-left hover:bg-gray-800 transition-colors flex justify-between items-center group">
                                    <span className="truncate">{formatAcceleratorDate(selectedCohorts.accelerator)}</span>
                                    <Icon name="calendar" size={18} className="ml-2 text-purple-400 group-hover:text-white transition-colors"/>
                                </button>
                            </div>
                            <ul className="text-gray-200 space-y-2 mb-6 text-sm">
                                <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-300 mr-2 mt-1 flex-shrink-0" /><span>Master fundamentals without the fluff.</span></li>
                                <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-300 mr-2 mt-1 flex-shrink-0" /><span>Design and deploy AI agents for reporting, funnels, and alerts.</span></li>
                                <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-300 mr-2 mt-1 flex-shrink-0" /><span>Build a portfolio case study that proves ROI.</span></li>
                            </ul>
                            <div className="mb-6">
                                <p className="text-white font-bold text-2xl inline-block mr-3">{courseData.accelerator.price}</p>
                                <p className="text-gray-300 line-through inline-block">{courseData.accelerator.originalPrice}</p>
                                <p className="text-green-400 font-semibold text-sm mt-1">{courseData.accelerator.bonus}</p>
                            </div>
                        </div>
                        <motion.a href={SUPERSTAR_ACCELERATOR_URL} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full py-3 px-6 text-center rounded-full bg-white text-gray-950 font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Enroll Now
                        </motion.a>
                    </motion.div>
                </div>
                <div className="text-center mt-12">
                    <motion.button onClick={handleExploreCourses} className="py-3 px-8 text-lg font-semibold rounded-full bg-purple-600 text-white shadow-xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Explore All Courses
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
