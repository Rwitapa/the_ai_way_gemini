import React from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";
import { LOGOS } from '../lib/constants';
import Image from 'next/image';

const CompaniesBelt = () => {
    // Base velocity for the automatic scroll
    const baseX = useMotionValue(0);

    // Get scroll velocity to pause animation when scrolling page
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Transform velocity to scale the animation speed
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // This creates the repeating (wrapping) animation effect
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    // This is the core animation logic that runs on every frame
    useAnimationFrame((t, delta) => {
        let moveBy = 2 * (delta / 1000); // Adjust this number to change speed

        // Slow down the animation if the user is scrolling the page
        if (velocityFactor.get() < 0) {
            moveBy *= -1;
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
                style={{ x }} // Apply the transformed x value
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.05}
                onDragStart={() => { baseX.stop() }}
                onDragEnd={() => { baseX.start() }}
            >
                {/* We render 4 sets of logos to ensure it's always seamless */}
                {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
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
