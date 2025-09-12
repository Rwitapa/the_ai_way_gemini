import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Icon, courseData } from '../lib/constants';

const CourseFinderQuiz = ({ scrollToSection }) => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(null);

    const mascots = {
        champion: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(168, 85, 247)', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: 'rgb(236, 72, 153)', stopOpacity: 1}} />
                    </linearGradient>
                </defs>
                <path d="M15 30 L50 10 L85 30 L80 70 L50 90 L20 70 Z" stroke="url(#grad1)" strokeWidth="4" />
                <path d="M50 35 V 65 M 35 50 H 65" stroke="white" strokeWidth="4" />
                <path d="M15 30 C 5 50, 5 70, 20 70" fill="none" stroke="url(#grad1)" strokeWidth="3" strokeDasharray="5,5" />
                <path d="M85 30 C 95 50, 95 70, 80 70" fill="none" stroke="url(#grad1)" strokeWidth="3" strokeDasharray="5,5" />
            </svg>
        ),
        accelerator: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(139, 92, 246)', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: 'rgb(34, 211, 238)', stopOpacity: 1}} />
                    </linearGradient>
                </defs>
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="url(#grad2)" />
                <circle cx="50" cy="50" r="10" fill="white" />
                <path d="M20 80 L30 70 M70 70 L80 80 M50 20 L50 30" stroke="white" strokeWidth="3" />
            </svg>
        )
    };

    const questions = [
        {
            question: "Which best describes your day-to-day with data?",
            options: [
                { text: "Mostly in Excel/Sheets, creating reports manually.", score: 0 },
                { text: "I write SQL and use BI tools like Tableau/Power BI.", score: 1 }
            ],
        },
        {
            question: "What kind of project excites you more right now?",
            options: [
                { text: "Automating a repetitive task to save hours each week.", score: 0 },
                { text: "Building a complex AI agent from scratch for my portfolio.", score: 1 }
            ],
        },
        {
            question: "How much time can you commit?",
            options: [
                { text: "A single focused session to get a quick win.", score: 0 },
                { text: "A couple of weekends for a deep-dive experience.", score: 1 }
            ],
        },
        {
            question: "What's your main career goal with this course?",
            options: [
                { text: "Prove my value and efficiency in my current role.", score: 0 },
                { text: "Transition to a more senior or specialized AI-focused role.", score: 1 }
            ],
        }
    ];

    const handleAnswer = (answerScore) => {
        const newScore = score + answerScore;
        if (step < questions.length - 1) {
            setScore(newScore);
            setStep(step + 1);
        } else {
            calculateResult(newScore);
        }
    };

    const calculateResult = (finalScore) => {
        if (finalScore >= 2) {
            setResult('accelerator');
        } else {
            setResult('sprint');
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setScore(0);
        setResult(null);
    };

    return (
        <section className="pt-8 md:pt-10 pb-16 md:pb-20 bg-gray-950">
            <div className="container mx-auto px-6">
                <motion.div
                    className="w-full bg-gradient-to-br from-purple-900/40 via-gray-900 to-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl shadow-purple-900/20 border border-purple-800/60 relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-24 text-purple-400">
                                        {result === 'sprint' ? mascots.champion : mascots.accelerator}
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Based on your goals, we recommend the...</h3>
                                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                                    {result === 'sprint' ? courseData.sprint.title : courseData.accelerator.title}
                                </h2>
                                <p className="text-gray-300 max-w-xl mx-auto mb-6">
                                    {result === 'sprint' ? "This course is perfect for getting a quick, impactful win and mastering the fundamentals of automation." : "This course will give you the deep, portfolio-ready skills to build end-to-end AI systems and accelerate your career."}
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                    <motion.button onClick={() => scrollToSection('courses')} className="w-full sm:w-auto py-3 px-8 text-base font-semibold rounded-full bg-purple-600 text-white shadow-xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        Learn More
                                    </motion.button>
                                    <button onClick={resetQuiz} className="text-gray-400 hover:text-white transition-colors">
                                        Retake Quiz
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex flex-col items-center mb-4">
                                    <div className="font-mono text-sm text-purple-400 bg-gray-950/50 px-2 py-1 rounded-full mb-3">
                                        {step + 1} / {questions.length}
                                    </div>
                                    <div className="flex justify-center items-center gap-3 mb-2">
                                        <Icon name="compass" size={32} className="text-purple-400"/>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white text-center">Not sure where to start?</h3>
                                    </div>
                                    <p className="text-gray-400 text-center mb-8">Answer these {questions.length} quick questions to find your perfect path.</p>
                                </div>
                                
                                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-8">
                                    <motion.div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" initial={{width:0}} animate={{ width: `${((step + 1) / questions.length) * 100}%` }} />
                                </div>
                                
                                <div className="max-w-xl mx-auto">
                                    <p className="font-semibold text-white text-lg mb-4 text-center">{questions[step].question}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {questions[step].options.map(option => (
                                            <motion.button
                                                key={option.text}
                                                onClick={() => handleAnswer(option.score)}
                                                className="w-full text-left p-4 rounded-xl border border-gray-700 bg-gray-900 hover:bg-purple-900/50 hover:border-purple-700 transition-all"
                                                whileHover={{ y: -3 }}
                                            >
                                                <p className="font-semibold text-white">{option.text}</p>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default CourseFinderQuiz;
