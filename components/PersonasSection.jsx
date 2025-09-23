import React from 'react';
import { motion } from "framer-motion";
import { personas } from '../lib/constants';
import Icon from './common/Icon.jsx';

// Personas

const PersonasSection = () => (
    <section className="pt-10 md:pt-16 pb-16 bg-gray-950 animate-on-scroll">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">This Is For You If You're An...</h2>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
                Ambitious, practical, and tired of being seen as a "report generator." You want clarity, speed, and visibility.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {personas.map((persona, index) => (
                    <motion.div key={index} className="group bg-gray-900 border border-gray-800 rounded-xl p-6 text-left flex items-center space-x-4 transition-all duration-300 animate-on-scroll" whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)', boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                        <Icon name={persona.icon} size={28} className="text-purple-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-gray-300 font-medium text-base">{persona.text}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
export default PersonasSection;
