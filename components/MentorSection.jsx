import React, { useEffect, useRef } from 'react';
import { motion } from "framer-motion";
// FIX: Changed from a broken named import to the correct default import path.
import Icon from './common/Icon.jsx';

const MentorSection = ({ sectionRef }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Mentor video autoplay was prevented:", error);
            });
        }
    }, []);

    return (
        <motion.section
            ref={sectionRef}
            className="pt-16 md:pt-20 pb-8 md:pb-10 bg-gray-950"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-12"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                    }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                        Learn from a Proven Industry Leader
                    </h2>
                </motion.div>
                <motion.div
                    className="w-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-purple-800/40 p-8 md:p-12 shadow-2xl shadow-purple-900/20"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
                    }}
                    whileHover={{ y: -5, scale: 1.01, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                        <div className="md:col-span-1 flex justify-center">
                            <div className="relative">
                                <div className="p-[6px] rounded-full bg-[conic-gradient(at_70%_30%,#8b5cf6,#22d3ee,#22c55e,#8b5cf6)]">
                                    <div className="rounded-full overflow-hidden bg-[#0b1220] w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 aspect-square">
                                        <video
                                            ref={videoRef}
                                            src="/Rwitapa.mp4"
                                            poster="/Rwitapa.png"
                                            className="block w-full h-full object-cover object-center scale-[1.04]"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">Rwitapa Mitra</h3>
                            <p className="text-purple-300 font-medium mt-2">
                                <span className="block">Director - Analytics</span>
                                <span className="block text-sm">9+ years at Flipkart, PharmEasy, Mu Sigma &amp; Pilgrim</span>
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4 mb-5">
                                <span className="text-xs font-bold uppercase tracking-wider bg-purple-900/80 text-purple-200 px-3 py-1 rounded-full">
                                    Director-Level Experience
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider bg-purple-900/80 text-purple-200 px-3 py-1 rounded-full">
                                    Billion-Dollar Impact
                                </span>
                            </div>
                            <p className="text-gray-400 text-base">
                                Your instructor has walked the path you're on. Rwitapa transformed from a curious analyst to
                                Director of Analytics at India's top companies. She has scaled high-growth startups by turning
                                analytics into action with measurable outcomes, won PharmEasy’s hackathon, and is a mentor at
                                Google’s Agentic AI Hackathon.
                            </p>
                            <p className="text-gray-400 text-base mt-3">
                                <strong>Real Results:</strong> She has revolutionized supply chains (25% efficiency gains),
                                transformed underperforming teams into profit centers (85% YoY improvement), and built
                                industry-leading data platforms. Now she's teaching the exact playbooks that accelerated her
                                career and will accelerate yours.
                            </p>
                            <motion.a
                                href="https://www.linkedin.com/in/rwitapa-mitra-3b43a999/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold rounded-full bg-gray-800 text-white shadow-lg ring-1 ring-white/10 hover:bg-gray-700"
                                whileHover={{ y: -2, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon name="linkedin" size={18} className="mr-2" /> LinkedIn
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

// FIX: The export was missing from the provided file. Added it back.
export default MentorSection;
