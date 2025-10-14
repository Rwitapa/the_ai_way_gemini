// components/TestimonialsSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials, TestimonialCard } from '../lib/constants';
import Icon from './common/Icon';

const TestimonialsSection = ({ sectionRef, id }) => {
    const [index, setIndex] = useState(0);

    const paginate = (newDirection) => {
        setIndex(prevIndex => (prevIndex + newDirection + testimonials.length) % testimonials.length);
    };

    return (
        <section ref={sectionRef} id={id} className="py-16 md:py-20 bg-gray-900 overflow-hidden animate-on-scroll">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">What Our Students Are Saying</h2>
                <div className="relative max-w-2xl mx-auto min-h-[420px] md:min-h-0 flex flex-col justify-center">
                    {/* Testimonial Card Slider */}
                    <div className="relative h-[320px] flex items-center justify-center">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={index}
                                className="absolute w-full px-2"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <TestimonialCard testimonial={testimonials[index]} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-6 flex justify-center items-center gap-4 md:mt-0">
                         <button
                            onClick={() => paginate(-1)}
                            className="p-3 rounded-full bg-gray-800/50 hover:bg-purple-600 transition-colors md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-16"
                        >
                            <Icon name="arrow-left" size={24} />
                        </button>
                        <button
                            onClick={() => paginate(1)}
                            className="p-3 rounded-full bg-gray-800/50 hover:bg-purple-600 transition-colors md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-16"
                        >
                            <Icon name="arrow-right" size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
