import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebaseClient.js';
import Icon from './common/Icon.jsx';
import { WHATSAPP_COMMUNITY_URL } from '../lib/constants.js';

// --- HEADER COMPONENT ---
const Header = ({ scrollToSection, setShowCoursesPage, setIsMenuOpen, handleExploreCourses }) => (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-950/70 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 h-16 md:h-20 flex justify-between items-center">
            <a href="/" className="flex items-center gap-2">
                <img src="/logo_transparent.png" alt="The AI Way Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">The AI Way</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
                <button onClick={() => scrollToSection('courses')} className="text-gray-300 hover:text-white transition-colors">Courses</button>
                <button onClick={() => scrollToSection('mentors')} className="text-gray-300 hover:text-white transition-colors">Mentors</button>
                <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white transition-colors">Testimonials</button>
            </nav>
            <div className="flex items-center gap-4">
                <motion.a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="hidden md:block py-2 px-5 text-sm font-semibold rounded-full bg-purple-600 text-white" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Join Community
                </motion.a>
                <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
                    <Icon name="menu" size={28} />
                </button>
            </div>
        </div>
    </header>
);

// --- MOBILE MENU COMPONENT ---
const MobileMenu = ({ isMenuOpen, setIsMenuOpen, scrollToSection, handleExploreCourses }) => (
    <AnimatePresence>
        {isMenuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
                <motion.div initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="absolute top-0 right-0 h-full w-full max-w-xs bg-gray-900 p-6 flex flex-col" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-xl font-bold text-white">Menu</span>
                        <button onClick={() => setIsMenuOpen(false)}><Icon name="x" size={28} /></button>
                    </div>
                    <nav className="flex flex-col gap-6 text-lg">
                        <button onClick={() => { scrollToSection('courses'); setIsMenuOpen(false); }} className="text-left text-gray-300 hover:text-white transition-colors">Courses</button>
                        <button onClick={() => { scrollToSection('mentors'); setIsMenuOpen(false); }} className="text-left text-gray-300 hover:text-white transition-colors">Mentors</button>
                        <button onClick={() => { scrollToSection('testimonials'); setIsMenuOpen(false); }} className="text-left text-gray-300 hover:text-white transition-colors">Testimonials</button>
                    </nav>
                    <motion.a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="mt-auto w-full py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Join Community
                    </motion.a>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// --- FOOTER COMPONENT (Reverted) ---
const Footer = ({ onAdminClick, isAdmin }) => (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} The AI Way. All rights reserved.</p>
            <button onClick={onAdminClick} className="text-xs mt-2 hover:text-gray-300">
                {isAdmin ? 'Exit Admin Mode' : 'Admin Panel'}
            </button>
        </div>
    </footer>
);


// --- LOGIN MODAL COMPONENT (Reverted to simpler design) ---
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
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-700 p-2 rounded text-white placeholder-gray-400"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        className="w-full bg-gray-700 p-2 rounded text-white placeholder-gray-400"
                        placeholder="Password"
                    />
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

// --- ADMIN MODAL COMPONENT ---
const AdminModal = ({ isOpen, onClose, currentDates, onSave, formatSprintDate, formatAcceleratorDate }) => {
    const [sprintDates, setSprintDates] = useState([]);
    const [acceleratorDates, setAcceleratorDates] = useState([]);
    const [newSprintDate, setNewSprintDate] = useState('');
    const [newAcceleratorDate, setNewAcceleratorDate] = useState('');

    useEffect(() => {
        if (isOpen) {
            setSprintDates(currentDates.sprint ? [...currentDates.sprint] : []);
            setAcceleratorDates(currentDates.accelerator ? [...currentDates.accelerator] : []);
        }
    }, [isOpen, currentDates]);

    const handleAddSprintDate = () => {
        if (newSprintDate) {
            const date = new Date(newSprintDate + 'T19:00:00');
            const updatedDates = [...sprintDates, date].sort((a, b) => a - b);
            setSprintDates(updatedDates);
            setNewSprintDate('');
        }
    };
    
    const handleAddAcceleratorDate = () => {
        if (newAcceleratorDate) {
            const start = new Date(newAcceleratorDate + 'T10:00:00');
            const end = new Date(start);
            end.setDate(start.getDate() + 1);
            end.setHours(19,0,0,0);
            const updatedDates = [...acceleratorDates, { start, end }].sort((a, b) => a.start - b.start);
            setAcceleratorDates(updatedDates);
            setNewAcceleratorDate('');
        }
    };

    const handleRemoveSprintDate = (indexToRemove) => setSprintDates(sprintDates.filter((_, index) => index !== indexToRemove));
    const handleRemoveAcceleratorDate = (indexToRemove) => setAcceleratorDates(acceleratorDates.filter((_, index) => index !== indexToRemove));

    const handleSave = () => {
        onSave({ sprint: sprintDates, accelerator: acceleratorDates });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="bg-gray-800 border border-purple-800/50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                             <h3 className="text-xl font-bold text-white">Admin: Manage Cohort Dates</h3>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors"><Icon name="x" size={20} /></button>
                        </div>
                        <div className="p-6 grid md:grid-cols-2 gap-6 overflow-y-auto">
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-white text-lg mb-3">Champion Sprint</h4>
                                <div className="space-y-2 mb-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {sprintDates.map((date, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                                            <span className="text-sm">{formatSprintDate(date)}</span>
                                            <button onClick={() => handleRemoveSprintDate(index)}><Icon name="x" size={16} className="text-red-400 hover:text-red-300"/></button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input type="date" value={newSprintDate} onChange={e => setNewSprintDate(e.target.value)} className="bg-gray-700 text-white p-2 rounded w-full text-sm"/>
                                    <button onClick={handleAddSprintDate} className="bg-purple-600 px-4 rounded text-sm font-semibold hover:bg-purple-500">Add</button>
                                </div>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-white text-lg mb-3">Superstar Accelerator</h4>
                                <div className="space-y-2 mb-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {acceleratorDates.map((cohort, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                                            <span className="text-sm">{formatAcceleratorDate(cohort)}</span>
                                            <button onClick={() => handleRemoveAcceleratorDate(index)}><Icon name="x" size={16} className="text-red-400 hover:text-red-300"/></button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                     <input type="date" value={newAcceleratorDate} onChange={e => setNewAcceleratorDate(e.target.value)} className="bg-gray-700 text-white p-2 rounded w-full text-sm" placeholder="Select start (Saturday)"/>
                                    <button onClick={handleAddAcceleratorDate} className="bg-purple-600 px-4 rounded text-sm font-semibold hover:bg-purple-500">Add</button>
                                </div>
                                 <p className="text-xs text-gray-500 mt-2">Note: Select the start date (Saturday) for the weekend cohort.</p>
                            </div>
                        </div>
                         <div className="p-4 border-t border-gray-700 mt-auto flex justify-end gap-3">
                            <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm bg-gray-600 hover:bg-gray-500">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 rounded-lg text-sm bg-purple-600 hover:bg-purple-500 font-semibold">Save Changes</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- MAIN LAYOUT COMPONENT ---
export const Layout = ({ children, scrollToSection, setShowCoursesPage, handleExploreCourses, cohortDates, onSaveDates, formatSprintDate, formatAcceleratorDate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const handleAdminClick = () => {
        if (isAdmin) {
            setIsAdmin(false);
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <div className="bg-gray-950 text-gray-200 font-sans leading-relaxed tracking-wide antialiased overflow-x-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
                html, body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
                body { font-family: 'Inter', sans-serif; }
                .font-poppins-medium { font-family: 'Poppins', sans-serif; font-weight: 500; }
                .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
                .animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
                .marquee { --gap: 2.25rem; overflow: hidden; }
                .marquee__track { display: flex; gap: var(--gap); animation: marquee var(--dur, 52s) linear infinite; }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - var(--gap) / 2)); } }
            `}</style>
            <AnimatePresence>
                {isAdmin && (
                    <motion.div initial={{y: '-100%'}} animate={{y: '0%'}} exit={{y: '-100%'}} className="fixed top-0 left-0 right-0 bg-yellow-400 text-black text-center p-2 text-sm font-bold z-50">
                       Admin Mode is Active. <button onClick={() => setShowAdminModal(true)} className="underline hover:text-purple-800">Edit Cohort Dates</button>
                    </motion.div>
                )}
            </AnimatePresence>
            <Header scrollToSection={scrollToSection} setShowCoursesPage={setShowCoursesPage} setIsMenuOpen={setIsMenuOpen} handleExploreCourses={handleExploreCourses} />
            <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} handleExploreCourses={handleExploreCourses} />
            <main className="pt-16 md:pt-20">{children}</main>
            <Footer onAdminClick={handleAdminClick} isAdmin={isAdmin} />
            <AdminModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} currentDates={cohortDates} onSave={onSaveDates} formatSprintDate={formatSprintDate} formatAcceleratorDate={formatAcceleratorDate} />
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLoginSuccess={() => { setIsAdmin(true); setShowLoginModal(false); }} />
        </div>
    );
};
