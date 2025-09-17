import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { testimonials, TestimonialCard } from '../lib/constants';

const TestimonialsSection = ({ sectionRef }) => {
    const middleIndex = Math.ceil(testimonials.length / 2);
    const column1Testimonials = testimonials.slice(0, middleIndex);
    const column2Testimonials = testimonials.slice(middleIndex);

    // We'll use motion values to track the y-position of the columns
    const y1 = useMotionValue(0);
    const y2 = useMotionValue(0);

    // You can adjust this value to change the scrolling speed
    const scrollSpeed = -20;

    // Use the `useTransform` hook to create a repeating animation
    const transformedY1 = useTransform(y1, (value) => value % (y1.getVelocity() || scrollSpeed));
    const transformedY2 = useTransform(y2, (value) => value % (y2.getVelocity() || -scrollSpeed));

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-gray-900 overflow-hidden animate-on-scroll">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">What Our Students Are Saying</h2>
                <div className="relative h-[450px] overflow-hidden">
                    <div className="absolute inset-0 flex justify-center gap-6">
                        <motion.div
                            className="w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-6"
                            style={{ y: transformedY1 }}
                            drag="y"
                            dragConstraints={{ top: -100, bottom: 100 }}
                            animate={{ y: [0, -1080] }}
                            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                        >
                            {column1Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col1-${index}`} testimonial={testimonial} />
                            ))}
                            {/* Duplicate for seamless scroll */}
                            {column1Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col1-${index}-clone`} testimonial={testimonial} aria-hidden="true" />
                            ))}
                        </motion.div>
                        <motion.div
                            className="hidden md:flex w-full md:w-1/2 lg:w-1/3 flex-col space-y-6"
                            style={{ y: transformedY2 }}
                            drag="y"
                            dragConstraints={{ top: -100, bottom: 100 }}
                            animate={{ y: [0, 1080] }}
                            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                        >
                            {column2Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col2-${index}`} testimonial={testimonial} />
                            ))}
                            {/* Duplicate for seamless scroll */}
                            {column2Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col2-${index}-clone`} testimonial={testimonial} aria-hidden="true" />
                            ))}
                        </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-gray-900 to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
