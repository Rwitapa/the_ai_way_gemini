// components/PromiseSection.jsx
import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import Icon from './common/Icon.jsx';

const PromiseSection = () => {
    const keyPoints = [
        {
            icon: 'rocket',
            title: 'Build Real AI Solutions',
            description: "Automate reports, build RAG agents, and deploy anomaly detectors. You'll ship four portfolio-ready projects that solve real business problems."
        },
        {
            icon: 'bar-chart-2',
            title: 'Drive Measurable ROI',
            description: "Create AI systems that save hours, uncover revenue, and prove your impact. Learn to build solutions that management notices and values."
        },
        {
            icon: 'user-check',
            title: 'Master Director-Level Playbooks',
            description: "Learn the exact playbooks used by a Director of Analytics to drive billion-dollar growth at companies like Flipkart and PharmEasy. Get direct mentorship and career strategy."
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-950 to-purple-950 text-center animate-on-scroll border-t border-purple-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    Stop Delivering Dashboards. Start Delivering Answers.
                </h2>
                <p className="text-base md:text-lg text-purple-200 max-w-3xl mx-auto mb-12 drop-shadow">
                    Your company has enough charts. They need insights that drive action. Our hands-on courses teach you to build the AI systems that find them.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12 text-left">
                    {keyPoints.map((point, index) => (
                        <motion.div 
                            key={index}
                            className="bg-gray-900/70 border border-purple-800 rounded-xl p-6 shadow-xl backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }}
                        >
                            <Icon name={point.icon} size={32} className="text-purple-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                            <p className="text-gray-300">{point.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link href="/courses" passHref>
                        <motion.a 
                            className="py-3 px-8 text-lg font-semibold rounded-full bg-purple-600 text-white shadow-2xl ring-2 ring-purple-400 hover:bg-purple-700 transition-all duration-300 cursor-pointer" 
                            whileHover={{ scale: 1.07, boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)' }} 
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Courses
                        </motion.a>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PromiseSection;
