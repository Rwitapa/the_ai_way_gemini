// components/Layout.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Icon from './common/Icon';
import { WHATSAPP_COMMUNITY_URL } from '../lib/constants';

const Layout = ({ children, scrollToCourses, scrollToFAQ }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } }
    };
    
    const navLinks = [
        { name: 'Courses', action: scrollToCourses, isExternal: false, isButton: false },
        { name: 'Mentors', action: null, isExternal: false, isButton: false, href: '/#mentors' },
        { name: 'Testimonials', action: null, isExternal: false, isButton: false, href: '/#testimonials' },
        { name: 'Join Community', action: () => window.open(WHATSAPP_COMMUNITY_URL, '_blank', 'noopener,noreferrer'), isExternal: true, isButton: true, href: WHATSAPP_COMMUNITY_URL }
    ];

    const handleLinkClick = (link) => {
        if (link.action) {
            link.action();
        } else if (link.href && !link.isExternal) {
            // Basic scroll to section for demo purposes
            const section = document.querySelector(link.href.replace('/', ''));
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setMobileMenuOpen(false);
    };

    return (
        <div className="bg-gray-950 text-gray-300 font-sans">
            <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/80 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" passHref>
                        <a className="flex items-center gap-2">
                            <Image src="/brand/aiway-mark.png" alt="The AI Way Logo" width={32} height={32} />
                            <span className="font-bold text-xl text-white">The AI Way</span>
                        </a>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.div key={link.name} variants={navItemVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}>
                                <button onClick={() => handleLinkClick(link)} className={link.isButton ? "bg-green-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-green-700 transition-colors" : "font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"}>
                                    {link.name}
                                </button>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                            <Icon name={isMobileMenuOpen ? "x" : "menu"} size={24} />
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800"
                        >
                            <nav className="flex flex-col items-center gap-6 py-8">
                                {navLinks.map(link => (
                                     <button
                                        key={link.name}
                                        onClick={() => handleLinkClick(link)}
                                        className={`${link.isButton ? 'bg-green-600 text-white font-semibold px-6 py-3 rounded-full' : 'text-lg font-semibold'}`}
                                     >
                                        {link.name}
                                     </button>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
            <main>{children}</main>
            <footer className="bg-gray-900 border-t border-gray-800">
                <div className="container mx-auto px-6 py-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} The AI Way. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;

