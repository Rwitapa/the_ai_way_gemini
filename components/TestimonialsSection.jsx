import React from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion';
import { testimonials, TestimonialCard } from '../lib/constants';

const TestimonialColumn = ({ testimonials, direction = 'up', className }) => {
    const baseY = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });
    
    // Adjust the range based on the number of testimonials to ensure seamless looping
    const y = useTransform(baseY, (v) => `${wrap(direction === 'up' ? -45 : -20, direction === 'up' ? -20 : -45, v)}%`);

    useAnimationFrame((t, delta) => {
        // Increased the 'up' direction speed from 2 to 3 for a faster scroll on mobile
        let moveBy = (direction === 'up' ? 3 : -1.5) * (delta / 1000);

        if (velocityFactor.get() < 0) {
            moveBy *= direction === 'up' ? -1 : 1;
        }
        baseY.set(baseY.get() + moveBy);
    });

    return (
        <motion.div
            className={`w-full md:w-1/2 flex flex-col space-y-6 ${className || ''}`}
            style={{ y, userSelect: 'none' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.05}
            onDragStart={() => { baseY.stop() }}
            onDragEnd={() => { baseY.start() }}
        >
            {testimonials.map((testimonial, index) => (
                <TestimonialCard key={`col-${index}`} testimonial={testimonial} />
            ))}
        </motion.div>
    );
};


const TestimonialsSection = ({ sectionRef }) => {
    const middleIndex = Math.ceil(testimonials.length / 2);
    // We duplicate the testimonials to create a seamless loop
    const column1Testimonials = [...testimonials.slice(0, middleIndex), ...testimonials.slice(0, middleIndex)];
    const column2Testimonials = [...testimonials.slice(middleIndex), ...testimonials.slice(middleIndex)];

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-gray-900 overflow-hidden animate-on-scroll">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">What Our Students Are Saying</h2>
                <div className="relative h-[450px] overflow-hidden">
                    <div className="absolute inset-0 flex justify-center gap-6">
                        <TestimonialColumn testimonials={column1Testimonials} direction="up" />
                        <TestimonialColumn testimonials={column2Testimonials} direction="down" className="hidden md:flex" />
                    </div>
                     <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
                     <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
