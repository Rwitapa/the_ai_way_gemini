// components/Layout.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Icon from './common/Icon';
import { WHATSAPP_COMMUNITY_URL } from '../lib/constants';

const Layout = ({ children, scrollToSection }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Courses', href: '/courses' },
        { name: 'Mentors', section: 'mentors' },
        { name: 'Testimonials', section: 'testimonials' },
        { name: 'Join Community', href: WHATSAPP_COMMUNITY_URL, isExternal: true },
    ];
    
    const handleNavClick = (link) => {
        if (link.href && !link.isExternal) {
            router.push(link.href);
        } else if (link.isExternal) {
            window.open(link.href, '_blank', 'noopener,noreferrer');
        } else if (link.section) {
            if (router.pathname === '/') {
                scrollToSection(link.section);
            } else {
                router.push(`/#${link.section}`);
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
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                             <button
                                key={link.name}
                                onClick={() => handleNavClick(link)}
                                className={link.name === 'Join Community'
                                    ? "bg-[#0A472E] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#083925] transition-colors text-lg"
                                    : "font-semibold text-gray-300 hover:text-white transition-colors text-lg"
                                }
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                            <Icon name={isMobileMenuOpen ? "x" : "menu"} size={24} />
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800"
                        >
                            <nav className="flex flex-col items-center gap-6 py-8">
                                {navLinks.map(link => (
                                     <button
                                        key={link.name}
                                        onClick={() => handleNavClick(link)}
                                        className="text-xl font-semibold"
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
