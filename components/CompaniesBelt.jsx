import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from "framer-motion";
import { LOGOS } from '../lib/constants';
import Image from 'next/image';

const CompaniesBelt = () => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
        const calculateWidth = () => {
            if (containerRef.current) {
                const scrollWidth = containerRef.current.scrollWidth;
                setWidth(scrollWidth / 2);
            }
        };

        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, [LOGOS]);

    useEffect(() => {
        if (width > 0) {
            controls.start({
                x: [0, -width],
                transition: {
                    ease: 'linear',
                    duration: 52,
                    repeat: Infinity,
                }
            });
        }
    }, [width, controls]);

    const handleDragEnd = (event, info) => {
        if (width > 0) {
            const currentX = controls.get('x');
            controls.start({
                x: [currentX, -width],
                transition: {
                    ease: 'linear',
                    duration: ((-width - currentX) / -width) * 52,
                    repeat: Infinity,
                }
            });
        }
    };


    return (
        <section id="companies" className="relative w-full pt-8 md:pt-10 pb-6 md:pb-8 overflow-hidden">
            <h3 className="text-center text-white/90 font-semibold text-lg md:text-xl mb-5 md:mb-6">
                Our graduates work at leading tech companies
            </h3>

            <motion.div
                ref={containerRef}
                className="flex cursor-grab active:cursor-grabbing"
                style={{ userSelect: 'none' }} // This prevents text selection on drag
                drag="x"
                dragConstraints={{ left: -width, right: 0 }}
                dragElastic={0.05}
                onDragStart={() => controls.stop()}
                onDragEnd={handleDragEnd}
                animate={controls}
            >
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
