import React from 'react';
import { motion } from "framer-motion";
import Icon from './common/Icon.jsx';

const AiGeneratedSection = () => (
    <section className="py-12 md:py-16 bg-gray-900 animate-on-scroll">
        <motion.div
            className="container mx-auto px-6 text-center max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <div className="inline-block bg-gray-800 p-3 rounded-full mb-4">
                <Icon name="cpu" size={28} className="text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">We Practice What We Preach</h2>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                This entire website—from the React components and Next.js backend to the marketing copy you're reading—was crafted by a generative AI assistant. We believe in building with the tools we teach.
            </p>
        </motion.div>
    </section>
);

export default AiGeneratedSection;
