// components/Layout.jsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebaseClient.js';
import Icon from './common/Icon.jsx';
import { WHATSAPP_COMMUNITY_URL } from '../lib/constants.js';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = ({ scrollToSection, setIsMenuOpen }) => {
  const router = useRouter();
  const sections = [
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
      <header className="fixed top-0 z-40 w-full backdrop-blur-md bg-gray-950/70 py-3 md:py-4 px-6 md:px-12 rounded-b-xl shadow-lg">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" passHref>
            <a aria-label="The AI Way — Home" className="group flex items-center gap-3 md:gap-4">
              <span className="relative block h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16">
                <img src="/brand/aiway-mark.png" alt="The AI Way logo" className="object-contain w-full h-full" />
              </span>
              <span className="inline-block font-poppins-medium text-white leading-none tracking-tight text-[18px] md:text-[21px] lg:text-[22px]">
                The AI Way
              </span>
            </a>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" passHref>
              <a className="text-[16px] md:text-[17px] font-semibold hover:text-purple-300 transition-colors rounded-lg px-3 py-2">Courses</a>
            </Link>
            {sections.map((section) => (
              <button key={section.ref} onClick={() => handleNavClick(section.ref)} className="text-[16px] md:text-[17px] font-semibold hover:text-purple-300 transition-colors rounded-lg px-3 py-2">
                {section.name}
              </button>
            ))}
            <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="text-[16px] md:text-[17px] font-semibold bg-[#0A472E] text-white hover:bg-[#0D573A] transition-colors px-5 py-2.5 rounded-full">
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

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => {
    const router = useRouter();
    const sections = [
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="md:hidden fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-lg flex flex-col items-center justify-center p-6">
                <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 p-2 rounded-md" aria-label="Close menu">
                    <Icon name="x" size={32} className="text-white" />
                </button>
                <div className="flex flex-col items-center space-y-8 text-center">
                    <Link href="/courses" passHref>
                        <a onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-white hover:text-purple-400 transition-colors">Courses</a>
                    </Link>
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

const Footer = ({ onAdminClick, isAdmin }) => (
    // ... Footer code remains unchanged
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
            <span className="font-poppins-medium text-white text-xl md:text-2xl leading-none">
              The AI Way
            </span>
          </div>
  
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/company/the-ai-way/?viewAsMember=true"
              aria-label="LinkedIn Profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2"
            >
              <Icon name="linkedin" size={24} />
            </a>
            <a
              href="https://www.instagram.com/theaiway.official/"
              aria-label="Instagram Profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2"
            >
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

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    // ... LoginModal code remains unchanged
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

const AdminModal = ({ isOpen, onClose, currentDates, onSave, formatSprintDate, formatAcceleratorDate }) => {
    // ... AdminModal code remains unchanged
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
                         <div className="p-4 border-t border-gray-700 mt-auto flex justify-end items-center">
                            <div className="flex gap-3">
                                <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm bg-gray-600 hover:bg-gray-500">Cancel</button>
                                <button onClick={handleSave} className="px-4 py-2 rounded-lg text-sm bg-purple-600 hover:bg-purple-500 font-semibold">Save Changes</button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const Layout = ({ children, scrollToSection, cohortDates, onSaveDates, formatSprintDate, formatAcceleratorDate }) => {
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
            auth.signOut();
            setIsAdmin(false);
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <div className="bg-gray-950 text-gray-200 font-sans leading-relaxed tracking-wide antialiased overflow-x-hidden">
            <AnimatePresence>
                {isAdmin && (
                    <motion.div initial={{y: '-100%'}} animate={{y: '0%'}} exit={{y: '-100%'}} className="fixed top-0 left-0 right-0 bg-yellow-400 text-black text-center p-2 text-sm font-bold z-50">
                       Admin Mode is Active. <button onClick={() => setShowAdminModal(true)} className="underline hover:text-purple-800">Edit Cohort Dates</button>
                    </motion.div>
                )}
            </AnimatePresence>
            <Header scrollToSection={scrollToSection} setIsMenuOpen={setIsMenuOpen} />
            <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} />
            <main className="pt-16 md:pt-20">{children}</main>
            <Footer onAdminClick={handleAdminClick} isAdmin={isAdmin} />
            <AdminModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} currentDates={cohortDates} onSave={onSaveDates} formatSprintDate={formatSprintDate} formatAcceleratorDate={formatAcceleratorDate} />
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLoginSuccess={() => { setIsAdmin(true); setShowLoginModal(false); }} />
        </div>
    );
};
