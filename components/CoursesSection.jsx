// components/CoursesSection.jsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from 'react';
import Link from 'next/link';
import Icon from './common/Icon.jsx';
import { courseData } from '../lib/constants';

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <div key={index} className="rounded-lg bg-gray-800/50 overflow-hidden">
                    <button
                        className="w-full flex justify-between items-center text-left p-4"
                        onClick={() => toggle(index)}
                    >
                        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        <motion.div animate={{ rotate: openIndex === index ? 45 : 0 }}>
                            <Icon name="plus" size={20} className="text-purple-500" />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <p className="text-gray-400 text-sm px-4 pb-4">{item.summary}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};


const CoursesSection = ({ sectionRef, id, handleOpenCalendar, selectedCohorts, openCheckoutForm, formatSprintDate, formatAcceleratorDate }) => {
    
    // ... (sprintHomePageKeyOutcomes and acceleratorHomePageKeyOutcomes remain the same)

    return (
        <section ref={sectionRef} id={id} className="py-16 md:py-20 bg-gray-900 animate-on-scroll">
            <div className="container mx-auto px-6">
                {/* ... (Header remains the same) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Sprint Course Card - Mostly unchanged, but added trust badge */}
                    <motion.div /* ... */ >
                         {/* ... existing content ... */}
                        <motion.button onClick={() => openCheckoutForm(courseData.sprint)} className="mt-auto block w-full py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Enroll Now for {courseData.sprint.price}
                        </motion.button>
                        <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1.5"><Icon name="shield-check" size={14}/> Secure Payment via Razorpay</p>
                    </motion.div>
                    
                    {/* Accelerator Course Card - Updated with Accordion and Trust Badge */}
                    <motion.div /* ... */ >
                        {/* ... existing header and outcomes ... */}
                        
                        <div className="my-6">
                            <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-3">Course Curriculum</h4>
                            <Accordion items={courseData.accelerator.modules.slice(0, 4)} /> 
                        </div>

                        {/* ... date selection and price ... */}
                        
                        <motion.button onClick={() => openCheckoutForm(courseData.accelerator)} className="mt-auto block w-full py-3 px-6 text-center rounded-full bg-white text-gray-950 font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                             Enroll Now for {courseData.accelerator.price}
                        </motion.button>
                        <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5"><Icon name="shield-check" size={14}/> Secure Payment via Razorpay</p>
                    </motion.div>
                </div>
                {/* ... (View Detailed Curriculum button remains the same) */}
            </div>
        </section>
    );
};

export default CoursesSection;
