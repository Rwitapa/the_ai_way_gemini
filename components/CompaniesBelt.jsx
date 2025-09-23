import React from 'react';
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { LOGOS } from '../lib/constants';
import Image from 'next/image';

const CompaniesBelt = () => {
    const baseX = useMotionValue(0);

    // This is the core animation logic that runs on every frame
    useAnimationFrame((t, delta) => {
        // This calculates the distance to move per frame to maintain a consistent speed
        let moveBy = -0.5 * (delta / 1000);

        // This handles the looping logic
        if (baseX.get() <= -25) {
            baseX.set(0);
        }

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <section id="companies" className="relative w-full pt-8 md:pt-10 pb-6 md:pb-8 overflow-hidden">
            <h3 className="text-center text-white/90 font-semibold text-lg md:text-xl mb-5 md:mb-6">
                Our graduates work at leading tech companies
            </h3>

            <motion.div
                className="flex whitespace-nowrap"
                style={{ x: `${baseX.get()}%` }} // Apply the x value directly
            >
                {/* We render 8 sets of logos to ensure it's always seamless, even on very wide screens */}
                {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                    <div key={`${logo.name}-${i}`} className="shrink-0 list-none mx-4" aria-hidden={i >= LOGOS.length}>
                        <div className="relative flex items-center justify-center rounded-xl ring-1 ring-black/6 shadow-sm bg-[#F3F4F6] w-[156px] md:w-[168px] h-[58px] md:h-[64px]">
                            <div className="absolute inset-0 rounded-xl bg-black/12 z-0 pointer-events-none" />
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={120}
                                height={40}
                                className="relative z-10 w-auto object-contain max-h-9 md:max-h-10"
                            />
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default CompaniesBelt;
