// Final CTA
import React from 'react';
import { motion } from "framer-motion";

const FinalCTASection = ({ handleExploreCourses }) => {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-purple-900 to-gray-900 text-center animate-on-scroll">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Report generator → ROI generator.</h2>
                <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto mb-8">AI isn't the future. It's already here. Analysts who adapt will lead. Join The AI Way to automate your work, prove impact, and become the analyst your team looks up to.</p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <motion.button onClick={handleExploreCourses} className="w-full sm:w-auto py-3 px-8 text-lg font-semibold rounded-full bg-white text-gray-950" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Explore Courses
                    </motion.button>
                </div>
            </div>
        </section>
    );
};
export default FinalCTASection;
