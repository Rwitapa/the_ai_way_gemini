import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Icon, faqs } from '../lib/constants';

const FAQSection = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("FAQ video autoplay was prevented:", error);
            });
        }
    }, []);

    return (
        <section className="relative py-16 md:py-20 animate-on-scroll overflow-hidden">
            <video
                ref={videoRef}
                poster="/poster.png"
                className="absolute inset-0 h-full w-full object-cover brightness-50"
                src="/faq.mp4"
                playsInline
                muted
                autoPlay
                loop
                preload="auto"
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gray-950/50" aria-hidden="true" />
            <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">Your most common questions, answered.</p>
                <div className="text-left space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                    {faqs.map((faq, index) => (
                        <div key={index} className="rounded-lg border border-purple-800/30 bg-gray-950/50 backdrop-blur-sm overflow-hidden">
                            <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                                <motion.div animate={{ rotate: openFaq === index ? 45 : 0 }} transition={{duration:0.3}}><Icon name="plus" size={24} className="text-purple-500" /></motion.div>
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                        <p className="text-gray-400 px-6 pb-6">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
