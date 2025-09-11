import React from 'react';
import { LOGOS } from '../lib/constants';

const CompaniesBelt = () => {
    const DURATION = "52s";

    return (
        <section id="companies" className="relative w-full pt-8 md:pt-10 pb-6 md:pb-8">
            <h3 className="text-center text-white/90 font-semibold text-lg md:text-xl mb-5 md:mb-6">
                Our graduates work at leading tech companies
            </h3>

            <div className="relative overflow-hidden">
                <div className="marquee">
                    <ul className="marquee__track" style={{ ["--dur"]: DURATION }}>
                        {LOGOS.map((logo, i) => (
                            <li key={`${logo.name}-${i}`} className="shrink-0">
                                <div className="relative flex items-center justify-center rounded-xl ring-1 ring-black/6 shadow-sm bg-[#F3F4F6] w-[156px] md:w-[168px] h-[58px] md:h-[64px]">
                                    <div className="absolute inset-0 rounded-xl bg-black/12 z-0 pointer-events-none" aria-hidden="true" />
                                    <img
                                        src={logo.src}
                                        alt={logo.name}
                                        loading="lazy"
                                        decoding="async"
                                        className={`relative z-10 w-auto object-contain ${
                                          logo.name === "PharmEasy" ? "max-h-8 md:max-h-9" : "max-h-9 md:max-h-10"
                                        }`}
                                    />
                                </div>
                            </li>
                        ))}
                        {LOGOS.map((logo, i) => (
                            <li key={`${logo.name}-${i}-clone`} className="shrink-0" aria-hidden="true">
                                <div className="relative flex items-center justify-center rounded-xl ring-1 ring-black/6 shadow-sm bg-[#F3F4F6] w-[156px] md:w-[168px] h-[58px] md:h-[64px]">
                                    <div className="absolute inset-0 rounded-xl bg-black/12 z-0 pointer-events-none" aria-hidden="true" />
                                    <img
                                        src={logo.src}
                                        alt={logo.name}
                                        loading="lazy"
                                        decoding="async"
                                        className={`relative z-10 w-auto object-contain ${
                                          logo.name === "PharmEasy" ? "max-h-8 md:max-h-9" : "max-h-9 md:max-h-10"
                                        }`}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
