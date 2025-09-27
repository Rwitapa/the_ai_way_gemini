// components/Layout.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebaseClient.js';
import Icon from './common/Icon.jsx';
import { WHATSAPP_COMMUNITY_URL } from '../lib/constants.js';

// --- HEADER ---
const Header = ({ scrollToSection, setIsMenuOpen }) => {
    const router = useRouter();
    const sections = [
        { name: 'Courses', ref: 'courses' },
        { name: 'Mentors', ref: 'mentors' },
        { name: 'Testimonials', ref: 'testimonials' },
    ];

    const handleNavClick = (sectionRef) => {
        if (router.pathname === '/') {
            scrollToSection(sectionRef);
        } else {
            router.push(`/#${sectionRef}`);
        }
    };

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-gray-950/70 py-3 md:py-4 px-6 md:px-12 border-b border-gray-800/50 shadow-lg">
            <nav className="flex items-center justify-between h-16 md:h-20">
                <Link href="/" passHref>
                    <a aria-label="The AI Way — Home" className="group flex items-center gap-3 md:gap-4">
                        <span className="relative block h-12 w-12 md:h-14 md:w-14">
                            <img src="/brand/aiway-mark.png" alt="The AI Way logo" className="object-contain w-full h-full" />
                        </span>
                        <span className="font-bold text-xl text-white">
                            The AI Way
                        </span>
                    </a>
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    {sections.map((section) => (
                        <button key={section.ref} onClick={() => handleNavClick(section.ref)} className="text-[16px] md:text-[17px] font-semibold text-gray-300 hover:text-white transition-colors rounded-lg px-3 py-2">
                            {section.name}
                        </button>
                    ))}
                    <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="text-[16px] md:text-[17px] font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors px-5 py-2.5 rounded-full">
                        Join Community
                    </a>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" aria-label="Open menu">
                        <Icon name="menu" size={30} className="text-white" />
                    </button>
                </div>
            </nav>
        </header>
    );
};

// --- MOBILE MENU ---
const MobileMenu = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => {
    const router = useRouter();
    const sections = [
        { name: 'Courses', ref: 'courses' },
        { name: 'Mentors', ref: 'mentors' },
        { name: 'Testimonials', ref: 'testimonials' },
    ];

    const handleMobileNavClick = (sectionRef) => {
        setIsMenuOpen(false);
        if (router.pathname === '/') {
            scrollToSection(sectionRef);
        } else {
            router.push(`/#${sectionRef}`);
        }
    };

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-lg flex flex-col items-center justify-center p-6"
                >
                    <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-2 rounded-md" aria-label="Close menu">
                        <Icon name="x" size={32} className="text-white" />
                    </button>
                    <div className="flex flex-col items-center space-y-8 text-center">
                        {sections.map(section => (
                            <button key={section.ref} onClick={() => handleMobileNavClick(section.ref)} className="text-3xl font-semibold text-white hover:text-purple-400 transition-colors">
                                {section.name}
                            </button>
                        ))}
                        <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-white hover:text-purple-400 transition-colors">
                            Join Community
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- FOOTER ---
const Footer = ({ onAdminClick, isAdmin }) => (
    <footer className="bg-gray-950 py-10 border-t border-gray-800">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="mb-6 md:mb-0 flex items-center gap-3 md:gap-4">
                    <span className="relative block h-10 w-10 md:h-12 md:w-12">
                        <img
                            src="/brand/aiway-mark.png"
                            alt="The AI Way logo"
                            className="object-contain w-full h-full"
                        />
                    </span>
                    <span className="font-bold text-xl text-white">
                        The AI Way
                    </span>
                </div>
                <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/company/the-ai-way/?viewAsMember=true" aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2">
                        <Icon name="linkedin" size={24} />
                    </a>
                    <a href="https://www.instagram.com/theaiway.official/" aria-label="Instagram Profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2">
                        <Icon name="instagram" size={24} />
                    </a>
                </div>
            </div>
            <div className="text-center text-gray-500 text-sm space-y-1">
                <p>&copy; {new Date().getFullYear()} The AI Way. All Rights Reserved.</p>
                <p>For support, please email: <a href="mailto:theaiway.official@gmail.com" className="text-purple-400 hover:underline">theaiway.official@gmail.com</a></p>
                <button onClick={onAdminClick} className="text-xs text-gray-700 hover:text-gray-500 transition-colors mt-2">
                    {isAdmin ? 'Admin Logout' : 'Admin Panel'}
                </button>
            </div>
        </div>
    </footer>
);

// --- LOGIN MODAL ---
const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!auth) {
            setError("Authentication service is not available.");
            return;
        }
        try {
            setError('');
            await signInWithEmailAndPassword(auth, email, password);
            onLoginSuccess();
        } catch (err) {
            setError("Login failed. Please check credentials.");
            console.error(err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-white">Admin Login</h3>
                <div className="space-y-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-700 p-2 rounded text-white placeholder-gray-400" placeholder="Email"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} className="w-full bg-gray-700 p-2 rounded text-white placeholder-gray-400" placeholder="Password"/>
                </div>
                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                <div className="flex justify-end gap-3 mt-5">
                    <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white text-sm">Cancel</button>
                    <button onClick={handleLogin} className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold">Login</button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN LAYOUT COMPONENT ---
const Layout = ({ children, scrollToSection, cohortDates, onSaveDates, formatSprintDate, formatAcceleratorDate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAdmin(!!user && !user.isAnonymous);
        });
        return () => unsubscribe();
    }, []);

    const handleAdminClick = () => {
        if (isAdmin) {
            auth.signOut();
            setIsAdmin(false);
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <div className="bg-gray-950 text-gray-200 font-sans leading-relaxed tracking-wide antialiased">
             <AnimatePresence>
                {isAdmin && (
                    <motion.div initial={{y: '-100%'}} animate={{y: '0%'}} exit={{y: '-100%'}} className="fixed top-0 left-0 right-0 bg-yellow-400 text-black text-center p-2 text-sm font-bold z-50">
                        Admin Mode is Active. <button onClick={() => setShowAdminModal(true)} className="underline hover:text-purple-800">Edit Cohort Dates</button>
                    </motion.div>
                )}
            </AnimatePresence>
            <Header scrollToSection={scrollToSection} setIsMenuOpen={setIsMenuOpen} />
            <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} />
            <main className="pt-24 md:pt-28">{children}</main>
            <Footer onAdminClick={handleAdminClick} isAdmin={isAdmin} />
            
            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => {
                    setShowLoginModal(false);
                    setIsAdmin(true);
                }}
            />
        </div>
    );
};

export default Layout;
