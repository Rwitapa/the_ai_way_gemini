// components/CourseComparator.jsx
import React from 'react';
import { motion } from "framer-motion";
import Icon from './common/Icon.jsx';

const comparisonData = [
    {
        feature: 'Theme',
        sprint: 'Automate your first reporting task and win back hours every week.',
        accelerator: 'Go beyond dashboards. Build AI agents that act, analyze, and deliver insights.'
    },
    {
        feature: 'Who It\'s For',
        sprint: 'Beginners who want proof that AI can solve a real analyst problem today.',
        accelerator: 'Analysts ready to master AI workflows and build a significant career edge.'
    },
    {
        feature: 'Time Commitment',
        sprint: '3 Hours (Single Session)',
        accelerator: '16 Hours (Weekend Intensive)'
    },
    {
        feature: 'Main Outcome',
        sprint: 'One working AI workflow for a repetitive reporting task.',
        accelerator: 'A portfolio of 4 real-world workflows + career positioning.'
    },
    {
        feature: 'What You\'ll Learn',
        sprint: { included: true, text: 'Practical Prompting & Automation' },
        accelerator: { included: true, text: '4 Advanced AI Techniques (RAG, Agents) & Human-in-Loop Design' }
    },
    {
        feature: 'Capstone Project',
        sprint: { included: true, text: 'A reporting workflow that saves hours weekly.' },
        accelerator: { included: true, text: 'A portfolio-ready case study + LinkedIn post draft.' }
    }
];

const FeatureCell = ({ children }) => (
    <div className="p-4 md:p-6 text-sm md:text-base font-semibold text-gray-300 flex items-center">{children}</div>
);

const DataCell = ({ children, isPopular = false }) => (
    <div className={`p-4 md:p-6 text-sm md:text-base ${isPopular ? 'text-gray-200' : 'text-gray-400'}`}>
        {typeof children === 'object' && children !== null ? (
            <div className="flex items-start gap-2">
                <Icon name="check-circle" size={18} className={`flex-shrink-0 mt-0.5 ${isPopular ? 'text-green-400' : 'text-purple-400'}`} />
                <span>{children.text}</span>
            </div>
        ) : (
            children
        )}
    </div>
);


const CourseComparator = () => {
    return (
        <section className="py-16 md:py-20 bg-gray-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Which Path is Right For You?</h2>
                    <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                        An honest comparison to help you choose.
                    </p>
                </div>

                <motion.div
                    className="w-full max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_2fr_2fr] border border-gray-800 rounded-2xl overflow-hidden">
                        {/* Headers */}
                        <div className="bg-gray-900/50 p-4 md:p-6 font-bold text-purple-400 uppercase text-xs md:text-sm tracking-wider flex items-center">Feature</div>
                        
                        <div className="bg-gray-900/50 p-4 md:p-6 text-left">
                            <span className="block text-xs text-gray-400 mb-1">Quick Start</span>
                            <h3 className="text-lg md:text-xl font-bold text-white">3-Hour Champion Sprint</h3>
                        </div>

                        <div className="bg-purple-900/20 p-4 md:p-6 text-left relative">
                             <div className="absolute top-0 left-1/2 md:left-6 -translate-y-1/2">
                                <span className="px-3 py-1 bg-cyan-400 text-black font-bold rounded-full text-xs shadow-lg whitespace-nowrap">MOST POPULAR - BEST VALUE</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white">16-Hour Superstar Accelerator</h3>
                        </div>

                        {/* Rows */}
                        {comparisonData.map((row, index) => (
                            <React.Fragment key={index}>
                                <FeatureCell>{row.feature}</FeatureCell>
                                <DataCell>{row.sprint}</DataCell>
                                <DataCell isPopular={true}>{row.accelerator}</DataCell>
                            </React.Fragment>
                        ))}

                        {/* Footer / CTA */}
                        <div className="bg-gray-900/50 hidden md:block"></div>
                        <div className="col-span-2 md:col-span-1 bg-gray-900/50 p-4 md:p-6 flex items-center justify-center">
                             <motion.a 
                                href="/courses"
                                className="block w-full text-center py-3 px-6 rounded-full font-semibold transition-colors bg-purple-600 text-white hover:bg-purple-500"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Learn More
                            </motion.a>
                        </div>
                         <div className="col-span-2 md:col-span-1 bg-purple-900/20 p-4 md:p-6 flex items-center justify-center">
                             <motion.a 
                                href="/courses"
                                className="block w-full text-center py-3 px-6 rounded-full font-semibold transition-colors bg-white text-gray-950 hover:bg-gray-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Enroll Now
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CourseComparator;
