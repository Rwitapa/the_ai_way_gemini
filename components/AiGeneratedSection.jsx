// components/AiGeneratedSection.jsx
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
            <h2 className="text-2xl md:text-3xl font-bold text-white">This Entire Website Is Completely AI Generated.</h2>
            <p className="text-lg md:text-xl text-gray-400 mt-4">Built using the skills we teach, this site is proof that you can deliver real business growth. This isn't just a demo; it's a demonstration.</p>
        </motion.div>
    </section>
);

export default AiGeneratedSection;
