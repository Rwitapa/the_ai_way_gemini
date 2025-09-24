// components/CourseComparator.jsx
import React from 'react';
import { motion } from "framer-motion";
import Icon from './common/Icon.jsx';

const comparisonData = [
    {
        feature: 'Best For',
        sprint: 'Getting a quick, tangible win',
        accelerator: 'A full career transformation',
    },
    {
        feature: 'Main Outcome',
        sprint: '1 Automated Workflow',
        accelerator: 'A 4-Project Portfolio',
    },
    {
        feature: 'Core Skills',
        sprint: 'Basic Prompting & Automation',
        accelerator: '4 Advanced AI Techniques',
    },
    {
        feature: 'Human-in-the-Loop Design',
        sprint: { included: false },
        accelerator: { included: true },
    },
    {
        feature: 'Career Branding & Portfolio',
        sprint: { included: false },
        accelerator: { included: true },
    },
];

const Checkmark = ({ included }) => (
    <div className={`flex items-center justify-center w-6 h-6 rounded-full ${included ? 'bg-green-500/20' : 'bg-red-500/10'}`}>
        <Icon name={included ? 'check-circle' : 'x'} size={16} className={included ? 'text-green-400' : 'text-red-400/50'} />
    </div>
);


const CourseComparator = () => (
    <section className="py-16 md:py-20 bg-gray-950">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Which Path is Right For You?</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                    Find the perfect fit for your goals, time, and ambition.
                </p>
            </div>
            
            {/* Desktop View: Table */}
            <motion.div 
                className="hidden md:block w-full max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <div className="grid grid-cols-[2fr_1fr_1fr] gap-px bg-gray-800 border border-gray-800 rounded-2xl overflow-hidden">
                    {/* Headers */}
                    <div className="bg-gray-900/50 p-6 font-semibold text-purple-400 uppercase text-sm tracking-wider">Feature</div>
                    <div className="bg-gray-900/50 p-6 font-semibold text-white text-center">3-Hour Champion Sprint</div>
                    <div className="bg-purple-900/20 p-6 font-semibold text-purple-300 text-center relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded-full text-xs">Popular</span>
                        </div>
                        16-Hour Superstar Accelerator
                    </div>
                    
                    {/* Rows */}
                    {comparisonData.map((row, index) => (
                        <React.Fragment key={index}>
                            <div className="bg-gray-900/50 p-6 font-semibold text-white">{row.feature}</div>
                            <div className="bg-gray-900/50 p-6 text-gray-300 text-center flex items-center justify-center">
                                {typeof row.sprint === 'object' ? <Checkmark included={row.sprint.included} /> : <p>{row.sprint}</p>}
                            </div>
                            <div className="bg-purple-900/10 p-6 text-white text-center font-medium flex items-center justify-center">
                                {typeof row.accelerator === 'object' ? <Checkmark included={row.accelerator.included} /> : <p>{row.accelerator}</p>}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </motion.div>

            {/* Mobile View: Stacked Cards */}
            <div className="block md:hidden max-w-lg mx-auto space-y-8">
                {comparisonData.map((row, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h4 className="font-semibold text-white text-lg text-center mb-4">{row.feature}</h4>
                        <div className="space-y-4">
                            {/* Sprint */}
                            <div className="border-b border-gray-800 pb-4">
                                <p className="text-sm font-medium text-gray-300 mb-2">3-Hour Champion Sprint</p>
                                <div className="flex items-center gap-3 text-white">
                                    {typeof row.sprint === 'object' ? <Checkmark included={row.sprint.included} /> : <p>{row.sprint}</p>}
                                </div>
                            </div>
                            {/* Accelerator */}
                            <div>
                                <p className="text-sm font-medium text-purple-300 mb-2">16-Hour Superstar Accelerator</p>
                                <div className="flex items-center gap-3 text-white font-semibold">
                                    {typeof row.accelerator === 'object' ? <Checkmark included={row.accelerator.included} /> : <p>{row.accelerator}</p>}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default CourseComparator;
