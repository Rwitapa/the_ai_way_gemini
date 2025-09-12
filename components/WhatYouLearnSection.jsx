import React from 'react';
import { motion } from "framer-motion";
import { whatYouLearnItems } from '../lib/constants';
import Icon from './common/Icon.jsx';

const WhatYouLearnSection = ({ sectionRef }) => (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gray-950 animate-on-scroll overflow-hidden">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-base md:text-lg font-bold uppercase tracking-wider text-purple-400 mb-2">What You’ll Learn</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">From Repetition to ROI</h3>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">Learn how to free yourself from manual tasks and build credibility fast.</p>
            <div className="flex flex-nowrap overflow-x-auto gap-6 pb-6 -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {whatYouLearnItems.map((item, index) => (
                    <motion.div key={index} className="group relative flex-shrink-0 w-[80vw] sm:w-64 bg-gray-900 border border-gray-800 rounded-xl p-6 text-left overflow-hidden transition-all duration-300 animate-on-scroll" whileHover={{ y: -5, boxShadow: '0 0 25px rgba(168, 85, 247, 0.25)' }} transition={{ type: 'spring', stiffness: 300 }}>
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon name={item.icon} size={28} className="text-purple-500 mb-4" />
                        <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default WhatYouLearnSection;
