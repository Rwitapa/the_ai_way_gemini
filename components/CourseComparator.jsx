// components/CourseComparator.jsx
import React from 'react';
import { motion } from "framer-motion";
import Icon from './common/Icon.jsx';

const CourseCard = ({ isPopular, title, tagline, price, features, buttonText, buttonLink }) => {
    return (
        <div className={`relative rounded-2xl border ${isPopular ? 'border-purple-700 bg-purple-900/20' : 'border-gray-800 bg-gray-900/50'}`}>
            {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="px-3 py-1 bg-yellow-500 text-black font-bold rounded-full text-xs shadow-lg">MOST POPULAR</span>
                </div>
            )}
            <div className="p-6 md:p-8">
                <div className="text-center">
                    <h3 className={`text-xl md:text-2xl font-bold ${isPopular ? 'text-purple-300' : 'text-white'}`}>{title}</h3>
                    <p className={`text-sm mt-1 mb-6 ${isPopular ? 'text-purple-400/80' : 'text-gray-400'}`}>{tagline}</p>
                </div>
                <ul className="space-y-3 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Icon name="check-circle" size={20} className={`mt-0.5 flex-shrink-0 ${isPopular ? 'text-green-400' : 'text-purple-500'}`} />
                            <span className={`text-base ${isPopular ? 'text-gray-200' : 'text-gray-300'}`}>{feature.text}</span>
                        </li>
                    ))}
                </ul>
                <div className="text-center mt-auto">
                    <p className={`text-4xl font-bold mb-6 ${isPopular ? 'text-white' : 'text-gray-200'}`}>{price}</p>
                    <motion.a 
                        href={buttonLink}
                        className={`block w-full text-center py-3 px-6 rounded-full font-semibold transition-colors ${isPopular ? 'bg-white text-gray-950 hover:bg-gray-200' : 'bg-purple-600 text-white hover:bg-purple-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {buttonText}
                    </motion.a>
                </div>
            </div>
        </div>
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
                <CourseCard 
                    isPopular={false}
                    title="3-Hour Champion Sprint"
                    tagline="For a quick, tangible win"
                    price="₹349"
                    features={[
                        { text: 'Automate one high-value report' },
                        { text: 'Master practical prompting for SQL' },
                        { text: 'Build a live AI workflow' },
                        { text: 'Get proof of work to show your manager' }
                    ]}
                    buttonText="Enroll in Sprint"
                    buttonLink="/courses"
                />
                <CourseCard 
                    isPopular={true}
                    title="16-Hour Superstar Accelerator"
                    tagline="For a complete career transformation"
                    price="₹4,999"
                    features={[
                        { text: 'Solve 4 real-world business problems' },
                        { text: 'Master 4 advanced AI techniques (RAG, Agents)' },
                        { text: 'Design trusted, human-in-the-loop systems' },
                        { text: 'Build a powerful portfolio project' },
                        { text: 'Learn career branding & positioning' }
                    ]}
                    buttonText="Enroll in Accelerator"
                    buttonLink="/courses"
                />
            </motion.div>
        </div>
    </section>
);

export default CourseComparator;
