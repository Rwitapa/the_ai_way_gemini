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
        { name: 'Courses', section: 'courses' },
        { name: 'Mentors', section: 'mentors' },
        { name: 'Testimonials', section: 'testimonials' },
        { name: 'FAQ', section: 'faq' },
        { name: 'Join Community', href: WHATSAPP_COMMUNITY_URL, isExternal: true },
    ];
    
    const handleNavClick = (link) => {
        setMobileMenuOpen(false);

        if (link.isExternal) {
            window.open(link.href, '_blank', 'noopener,noreferrer');
            return;
        }

        if (link.section) {
            if (router.pathname === '/') {
                if(scrollToSection) {
                    scrollToSection(link.section);
                }
            } else {
                router.push(`/#${link.section}`);
            }
            return;
        }
        
        if (link.href) {
            router.push(link.href);
        }
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
                                    ? "bg-green-600/90 text-white font-semibold px-5 py-2 rounded-full hover:bg-green-700 transition-colors"
                                    : "font-semibold text-gray-300 hover:text-purple-400 transition-colors"
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
                                        className="text-lg font-semibold"
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
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                        {/* Column 1: Brand */}
                        <div className="flex flex-col items-center md:items-start">
                            <Link href="/" passHref>
                                <a className="flex items-center gap-2 mb-4">
                                    <Image src="/brand/aiway-mark.png" alt="The AI Way Logo" width={32} height={32} />
                                    <span className="font-bold text-xl text-white">The AI Way</span>
                                </a>
                            </Link>
                            <p className="text-gray-400 max-w-xs">
                                A career accelerator for analysts ready to drive business impact with AI.
                            </p>
                        </div>

                        {/* Column 2: Connect */}
                        <div>
                            <h3 className="font-semibold text-white uppercase tracking-wider mb-4">Connect</h3>
                            <nav className="flex flex-col space-y-3">
                                <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">Join Community</a>
                                <a href="https://www.linkedin.com/in/rwitapa-mitra-3b43a999/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">LinkedIn</a>
                            </nav>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
                        <p className="mb-4">
                            For questions or support, email us at <a href="mailto:theaiway.official@gmail.com" className="text-purple-400 hover:underline">theaiway.official@gmail.com</a>
                        </p>
                        <div className="flex justify-center space-x-6 mb-4 text-sm">
                            <Link href="/privacy-policy" passHref><a className="hover:text-purple-400 transition-colors">Privacy Policy</a></Link>
                            <Link href="/refund-policy" passHref><a className="hover:text-purple-400 transition-colors">Refund Policy</a></Link>
                        </div>
                        <p>&copy; {new Date().getFullYear()} The AI Way. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
