import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';

// --- SHARED COMPONENTS (These should be imported from a shared file) ---

const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/D8xghzQNPWe1jaHH4T6hM5";

// Icon component (from index.jsx)
const Icon = ({ name, size = 24, strokeWidth = 2, className = '' }) => {
  const icons = {
    'check-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-8.68" />
        <path d="m22 4-7 7-4-4" />
      </svg>
    ),
    'arrow-left': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
    ),
    'linkedin': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    'instagram': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
        <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
      </svg>
    ),
    'menu': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    ),
    'x': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" x2="6" y1="6" y2="18" />
        <line x1="6" x2="18" y1="6" y2="18" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// Header component (from index.jsx)
const Header = () => {
  return (
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-gray-950/70 py-3 md:py-4 px-6 md:px-12 rounded-b-xl shadow-lg">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href="/">
            <a className="group flex items-center gap-3 md:gap-4">
              <span className="relative block h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16">
                <img
                  src="/brand/aiway-mark.png"
                  alt="The AI Way logo"
                  className="object-contain w-full h-full"
                />
              </span>
              <span className="inline-block font-poppins-medium text-white leading-none tracking-tight text-[18px] md:text-[21px] lg:text-[22px]">
                The AI Way
              </span>
            </a>
          </Link>
        </nav>
      </header>
  );
};

// Footer component (from index.jsx)
const Footer = () => (
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
        <p>&copy; 2025 The AI Way. All Rights Reserved.</p>
        <p>For support, please email: <a href="mailto:theaiway.official@gmail.com" className="text-purple-400 hover:underline">theaiway.official@gmail.com</a></p>
      </div>
    </div>
  </footer>
);


// --- THANK YOU PAGE COMPONENT ---

const ThankYouPage = () => {
    useEffect(() => {
        document.title = "Thank You - The AI Way";
    }, []);

    return (
        <div className="bg-gray-950 text-gray-200 font-sans leading-relaxed tracking-wide antialiased overflow-x-hidden">
             <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
                html, body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
                body { font-family: 'Inter', sans-serif; }
                .font-poppins-medium { font-family: 'Poppins', sans-serif; font-weight: 500; }
            `}</style>

            <Header />
            
            <main className="pt-20">
                 <div className="relative overflow-hidden flex items-center justify-center min-h-screen bg-gray-950">
                    <video
                        className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-110 saturate-125"
                        src="/animation_1.mp4"
                        playsInline
                        muted
                        autoPlay
                        loop
                        preload="auto"
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gray-950/50" aria-hidden="true" />

                    <div className="relative z-10 container mx-auto px-6 w-full flex flex-col items-center">
                        <Link href="/">
                            <a className="absolute top-8 left-8 flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                                <Icon name="arrow-left" size={20} className="mr-2" /> Back to Home
                            </a>
                        </Link>

                        <motion.div
                            className="w-full max-w-2xl bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-purple-800/40 p-8 md:p-12 shadow-2xl shadow-purple-900/20 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.div
                                className="mx-auto mb-6"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                            >
                                <Icon name="check-circle" size={64} className="text-green-400 mx-auto" />
                            </motion.div>

                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Payment Successful!</h1>
                            <p className="text-lg text-gray-300 mb-6">
                                All the best for taking a step towards your Gen AI excellence.
                            </p>
                            <div className="text-left bg-gray-950/50 border border-gray-800 rounded-lg p-6 space-y-4">
                                <p className="text-gray-300">
                                    <strong>Next Steps:</strong>
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li>The meeting link will be sent to your email one hour before the call.</li>
                                    <li>Join our WhatsApp community for the latest updates and to connect with fellow learners.</li>
                                </ul>
                            </div>
                            <motion.a
                                href={WHATSAPP_COMMUNITY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-block w-full sm:w-auto py-3 px-8 text-base font-semibold rounded-full bg-[#0A472E] text-white"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Join the Community
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ThankYouPage;
