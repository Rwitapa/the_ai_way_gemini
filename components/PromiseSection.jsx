import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import Icon from './common/Icon.jsx';

const PromiseSection = () => {
    const promises = [
        {
            icon: 'rocket',
            title: 'Ship Real Projects, Not Demos.',
            description: "You won't just learn theory. You'll build and deploy a working AI workflow that solves a real business problem. You leave with a tangible portfolio asset, not just a certificate."
        },
        {
            icon: 'user-check',
            title: 'Learn from a Proven Leader.',
            description: "Your mentor is a Director of Analytics at top Indian tech companies. You'll learn the exact playbooks she used to drive billion-dollar impacts and accelerate her career."
        },
        {
            icon: 'bar-chart-2',
            title: 'Focus on Career Impact, Not Tools.',
            description: "Our curriculum is designed to make you highly employable. You'll learn how to prove your ROI, build impact memos, and position yourself as the AI leader on your team."
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
