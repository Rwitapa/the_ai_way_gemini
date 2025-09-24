// components/CompaniesBelt.jsx
import React from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from "framer-motion";
import { LOGOS } from '../lib/constants';
import Image from 'next/image';

const CompaniesBelt = () => {
    const baseX = useMotionValue(0);

    // Use Framer Motion's `wrap` function for a seamless, looping animation
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    useAnimationFrame((t, delta) => {
        // This calculates the distance to move per frame for a consistent speed
        let moveBy = -2 * (delta / 1000); // Speed can be adjusted here
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <section id="companies" className="relative w-full pt-8 md:pt-10 pb-6 md:pb-8 overflow-hidden">
            <h3 className="text-center text-white/90 font-semibold text-lg md:text-xl mb-5 md:mb-6">
                Alumni at leading companies including
            </h3>

            <motion.div
                className="flex whitespace-nowrap"
                style={{ x, willChange: 'transform' }} // Use the transformed `x` value for smooth looping
            >
                {/* We only need to render 2 sets of logos for the wrapping logic to work */}
                {[...LOGOS, ...LOGOS].map((logo, i) => (
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
