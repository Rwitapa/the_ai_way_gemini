// components/HeroSection.jsx
import { motion } from "framer-motion";
import React from 'react';
import { WHATSAPP_COMMUNITY_URL } from '../lib/constants';
import Link from 'next/link';
import Image from 'next/image';

export const HeroSection = () => {
    return (
        <section className="relative overflow-hidden flex items-center bg-gray-950">
            <video
                poster="/poster.png"
                className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-110 saturate-125"
                src="/animation_1.mp4"
                playsInline
                muted
                autoPlay
                loop
                preload="auto"
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gray-950/25" aria-hidden="true" />

            <div className="relative z-10 container mx-auto px-6 w-full">
                <div className="min-h-[86svh] md:min-h-[88vh] pt-24 md:pt-28 pb-10 md:pb-10 flex flex-col items-center justify-center text-center">
                    <div className="mb-4">
                        <Image
                            src="/ai_stamp.jpg"
                            alt="AI Generated Stamp"
                            width={150}
                            height={150}
                            className="opacity-90"
                        />
                    </div>
                    <Link href="/courses" passHref>
                        <a className="inline-block py-1.5 px-5 rounded-full text-sm font-semibold text-purple-100 bg-purple-900/60 backdrop-blur-sm cursor-pointer hover:bg-purple-900/80 transition-colors">
                            Gen AI for Analysts
                        </a>
                    </Link>


                    <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-normal text-white max-w-5xl">
                        Still fixing reports manually?
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100 pb-2">
                            Build agents that find insight
                        </span>
                    </h1>

                    <p className="mt-5 max-w-3xl text-base md:text-xl text-gray-200">
                        Automate reporting, turn dashboards into narratives, solve real problems with AI.
                    </p>

                    <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/courses" passHref>
                            <motion.a
                                className="w-full sm:w-auto py-3.5 px-10 text-lg font-semibold rounded-full bg-purple-600 text-white shadow-xl cursor-pointer"                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Courses
                            </motion.a>
                        </Link>

                        <motion.a
                            href={WHATSAPP_COMMUNITY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto py-3.5 px-10 text-lg font-semibold rounded-full bg-[#0A472E] text-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Join Community
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
