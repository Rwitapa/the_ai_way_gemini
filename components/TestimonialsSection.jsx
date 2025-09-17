import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";
import { testimonials, TestimonialCard } from '../lib/constants';

const TestimonialsSection = ({ sectionRef }) => {
    const middleIndex = Math.ceil(testimonials.length / 2);
    const column1Testimonials = [...testimonials.slice(0, middleIndex), ...testimonials.slice(0, middleIndex)];
    const column2Testimonials = [...testimonials.slice(middleIndex), ...testimonials.slice(middleIndex)];

    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);

    const controls1 = useAnimation();
    const controls2 = useAnimation();

    const animateColumn = (controls, containerRef, direction) => {
        if (!containerRef.current) return;
        const height = containerRef.current.scrollHeight / 2;
        const yTarget = direction === 'up' ? -height : height;
        const yInitial = direction === 'up' ? 0 : -height;

        controls.start({
            y: [yInitial, yTarget],
            transition: {
                ease: 'linear',
                duration: 40,
                repeat: Infinity,
            }
        });
    };
    
    useEffect(() => {
        animateColumn(controls1, containerRef1, 'up');
        animateColumn(controls2, containerRef2, 'down');
    }, [controls1, controls2]);
    
    const handleDragEnd = (controls, containerRef, direction) => {
        if (!containerRef.current) return;
        const height = containerRef.current.scrollHeight / 2;
        const yTarget = direction === 'up' ? -height : height;
        const currentY = controls.get('y');
        
        // Calculate remaining distance and duration to maintain consistent speed
        const remainingDistance = direction === 'up' ? Math.abs(yTarget - currentY) : Math.abs(currentY - yTarget);
        const remainingDuration = (remainingDistance / height) * 40;

        controls.start({
            y: [currentY, yTarget],
            transition: {
                ease: 'linear',
                duration: remainingDuration,
                repeat: Infinity,
                // Adjust the repeat starting point for the 'down' column
                repeatType: 'loop',
                ...(direction === 'down' && { from: -height })
            }
        });
    };

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-gray-900 overflow-hidden animate-on-scroll">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">What Our Students Are Saying</h2>
                <div className="relative h-[450px] overflow-hidden">
                    <div className="absolute inset-0 flex justify-center gap-6">
                        {/* Column 1 */}
                        <motion.div
                            ref={containerRef1}
                            className="w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-6 cursor-grab active:cursor-grabbing"
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.1}
                            onDragStart={() => controls1.stop()}
                            onDragEnd={() => handleDragEnd(controls1, containerRef1, 'up')}
                            animate={controls1}
                        >
                            {column1Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col1-${index}`} testimonial={testimonial} />
                            ))}
                        </motion.div>
                        
                        {/* Column 2 */}
                        <motion.div
                            ref={containerRef2}
                            className="hidden md:flex w-full md:w-1/2 lg:w-1/3 flex-col space-y-6 cursor-grab active:cursor-grabbing"
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.1}
                            onDragStart={() => controls2.stop()}
                            onDragEnd={() => handleDragEnd(controls2, containerRef2, 'down')}
                            animate={controls2}
                        >
                            {column2Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col2-${index}`} testimonial={testimonial} />
                            ))}
                        </motion.div>
                    </div>
                     <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
                     <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
