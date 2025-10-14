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
            description: "Go beyond theory. Automate repetitive reports, build RAG agents to query unstructured data, and deploy real-time anomaly detectors. You'll ship four complete portfolio projects."
        },
        {
            icon: 'bar-chart-2',
            title: 'Drive Measurable ROI',
            description: "Learn to identify high-value problems and create AI systems that save hundreds of hours, uncover revenue opportunities, and prove your impact with compelling memos."
        },
        {
            icon: 'user-check',
            title: 'Master Director-Level Playbooks',
            description: "Get direct mentorship from a Director of Analytics. You'll learn the battle-tested strategies used to drive billion-dollar growth at Flipkart, PharmEasy, and more."
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-gray-950 text-center animate-on-scroll">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Stop Delivering Dashboards. Start Delivering Answers.
                </h2>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
                    Your company has enough charts. They need insights that drive action. Our hands-on courses teach you to build the AI systems that find them.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12 text-left">
                    {keyPoints.map((point, index) => (
                        <motion.div 
                            key={index}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Icon name={point.icon} size={32} className="text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                            <p className="text-gray-400">{point.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link href="/courses" passHref>
                        <motion.a 
                            className="py-3 px-8 text-lg font-semibold rounded-full bg-white text-gray-950 cursor-pointer" 
                            whileHover={{ scale: 1.05 }} 
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
