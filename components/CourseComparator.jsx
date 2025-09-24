// components/CourseComparator.jsx
import React from 'react';
import { motion } from "framer-motion";
import Icon from './common/Icon.jsx';

const sprintFeatures = [
    "Automate one high-value report",
    "Master practical prompting for SQL",
    "Build a live AI workflow",
    "Get proof of work to show your manager"
];

const acceleratorFeatures = [
    "Solve 4 real-world business problems",
    "Master 4 advanced AI techniques (RAG, Agents)",
    "Design trusted, human-in-the-loop systems",
    "Build a powerful portfolio project",
    "Learn career branding & positioning"
];

const CourseCard = ({ courseType }) => {
    const isSprint = courseType === 'sprint';
    const features = isSprint ? sprintFeatures : acceleratorFeatures;

    return (
        <motion.div
            className={`w-full rounded-2xl p-6 md:p-8 flex flex-col ${isSprint ? 'bg-gray-900/50 border border-gray-800' : 'bg-purple-900/20 border border-purple-800'}`}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold ${isSprint ? 'text-white' : 'text-purple-300'}`}>
                    {isSprint ? '3-Hour Champion Sprint' : '16-Hour Superstar Accelerator'}
                </h3>
                <p className={`mt-2 text-sm ${isSprint ? 'text-gray-400' : 'text-purple-400/80'}`}>
                    {isSprint ? 'For a quick, tangible win.' : 'For a complete career transformation.'}
                </p>
            </div>

            <div className="flex-grow space-y-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <Icon name="check-circle" size={20} className={`mt-0.5 flex-shrink-0 ${isSprint ? 'text-purple-500' : 'text-green-400'}`} />
                        <span className={`text-base ${isSprint ? 'text-gray-300' : 'text-gray-200'}`}>{feature}</span>
                    </div>
                ))}
            </div>
            
            <div className="mt-8">
                <a href="/courses" className={`block w-full text-center py-3 px-6 rounded-full font-semibold transition-colors ${isSprint ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-white text-gray-950 hover:bg-gray-200'}`}>
                    Learn More
                </a>
            </div>
        </motion.div>
    );
};


const CourseComparator = () => (
    <section className="py-16 md:py-20 bg-gray-950">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Which Path is Right For You?</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                    Choose the course that best fits your immediate goals and long-term career ambition.
                </p>
            </div>
            
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
                <CourseCard courseType="sprint" />
                <div className="relative">
                    <div className="absolute top-0 right-6 -translate-y-1/2">
                        <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded-full text-xs shadow-lg">Popular</span>
                    </div>
                    <CourseCard courseType="accelerator" />
                </div>
            </motion.div>
        </div>
    </section>
);

export default CourseComparator;
