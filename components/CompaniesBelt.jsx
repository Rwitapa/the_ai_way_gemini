import React from 'react';
import { motion } from "framer-motion";
import { LOGOS } from '../lib/constants';
import Image from 'next/image';

// Belt of logos
const CompaniesBelt = () => {
    const DURATION = 52; // Duration in seconds

    return (
        <section id="companies" className="relative w-full pt-8 md:pt-10 pb-6 md:pb-8">
            <h3 className="text-center text-white/90 font-semibold text-lg md:text-xl mb-5 md:mb-6">
                Our graduates work at leading tech companies
            </h3>

            <div className="relative overflow-hidden">
                <motion.div
                    className="flex"
                    drag="x"
                    dragConstraints={{ right: 0, left: -2080 }} // Adjust this value based on the total width of your logos
                    animate={{ x: [0, -2080] }} // Adjust this value to match the drag constraint
                    transition={{
                        ease: 'linear',
                        duration: DURATION,
                        repeat: Infinity,
                    }}
                >
                    <ul className="flex items-center" style={{'--dur': `${DURATION}s`}}>
                        {LOGOS.map((logo, i) => (
                            <li key={`${logo.name}-${i}`} className="shrink-0 mx-4">
                                <div className="relative flex items-center justify-center rounded-xl ring-1 ring-black/6 shadow-sm bg-[#F3F4F6] w-[156px] md:w-[168px] h-[58px] md:h-[64px]">
                                    <div className="absolute inset-0 rounded-xl bg-black/12 z-0 pointer-events-none" aria-hidden="true" />
                                    <Image
                                        src={logo.src}
                                        alt={logo.name}
                                        width={120}
                                        height={40}
                                        className="relative z-10 w-auto object-contain max-h-9 md:max-h-10"
                                    />
                                </div>
                            </li>
                        ))}
                        {LOGOS.map((logo, i) => (
                            <li key={`${logo.name}-${i}-clone`} className="shrink-0 mx-4" aria-hidden="true">
                                <div className="relative flex items-center justify-center rounded-xl ring-1 ring-black/6 shadow-sm bg-[#F3F4F6] w-[156px] md:w-[168px] h-[58px] md:h-[64px]">
                                    <div className="absolute inset-0 rounded-xl bg-black/12 z-0 pointer-events-none" aria-hidden="true" />
                                    <Image
                                        src={logo.src}
                                        alt={logo.name}
                                        width={120}
                                        height={40}
                                        className="relative z-10 w-auto object-contain max-h-9 md:max-h-10"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default CompaniesBelt;
