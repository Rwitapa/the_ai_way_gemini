import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import Icon from './common/Icon.jsx';

const PromiseSection = () => {
    const promises = [
        {
            icon: 'rocket',
            title: 'Ship Production-Ready AI, Not Toy Demos.',
            description: "Stop watching tutorials. In the 3-hour Sprint, you’ll automate one of your own repetitive reports. In the 16-hour Accelerator, you’ll build four complete AI projects, including automated dashboard narratives, customer insight agents using RAG, and real-time anomaly detection. You leave with a portfolio of working systems that prove you can deliver."
        },
        {
            icon: 'user-check',
            title: 'Learn from a Proven Leader.',
            description: "Your mentor is a Director of Analytics at top Indian tech companies. You'll learn the exact playbooks she used to drive billion-dollar impacts and accelerate her career."
        },
        {
            icon: 'bar-chart-2',
            title: 'Go from Report Builder to ROI Driver.',
            description: "Tools become obsolete; real-world impact doesn't. We teach you to identify high-value business problems and build trusted AI solutions with essential human-in-the-loop checks. You'll learn to create compelling impact memos that get you noticed, positioning yourself as the go-to AI expert who drives measurable results."
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-gray-950 text-center animate-on-scroll">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Your Journey from Analyst to AI Leader, Guaranteed.</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">We're not just another course. We're a career accelerator built on three core promises.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12 text-left">
                    {promises.map((promise, index) => (
                        <motion.div 
                            key={index}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Icon name={promise.icon} size={32} className="text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">{promise.title}</h3>
                            <p className="text-gray-400">{promise.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link href="/courses" passHref>
                        <motion.a className="py-3 px-8 text-lg font-semibold rounded-full bg-white text-gray-950 cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Start Your Transformation
                        </motion.a>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PromiseSection;
