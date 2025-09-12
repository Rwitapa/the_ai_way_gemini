import React from 'react';
import { testimonials, TestimonialCard } from '../lib/constants';
// Testimonials

const TestimonialsSection = ({ sectionRef }) => {
    const middleIndex = Math.ceil(testimonials.length / 2);
    const column1Testimonials = testimonials.slice(0, middleIndex);
    const column2Testimonials = testimonials.slice(middleIndex);

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-gray-900 overflow-hidden animate-on-scroll">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">What Our Students Are Saying</h2>
                <div className="relative h-[450px] overflow-hidden">
                    <div className="absolute inset-0 flex justify-center gap-6">
                        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-6 scrolling-column-up">
                            {column1Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col1-${index}`} testimonial={testimonial} />
                            ))}
                            {column1Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col1-${index}-clone`} testimonial={testimonial} aria-hidden="true" />
                            ))}
                        </div>
                        <div className="hidden md:flex w-full md:w-1/2 lg:w-1/3 flex-col space-y-6 scrolling-column-down">
                            {column2Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col2-${index}`} testimonial={testimonial} />
                            ))}
                            {column2Testimonials.map((testimonial, index) => (
                                <TestimonialCard key={`col2-${index}-clone`} testimonial={testimonial} aria-hidden="true" />
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-gray-900 to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
