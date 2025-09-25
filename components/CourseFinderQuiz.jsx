// components/CourseFinderQuiz.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Icon from './common/Icon.jsx';
import { courseData, mascots } from '../lib/constants';

const CourseFinderQuiz = ({ scrollToSection }) => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(null);

    const questions = [
        {
            question: "What's your biggest pain point right now?",
            options: [
                { text: "I spend too much time on repetitive, manual reporting.", score: 0 },
                { text: "My dashboards are good, but they don't drive action.", score: 1 }
            ],
        },
        {
            question: "What's your primary goal with AI?",
            options: [
                { text: "To automate a specific task and get a quick, tangible win.", score: 0 },
                { text: "To build a portfolio of AI projects and become an AI-powered analyst.", score: 1 }
            ],
        },
        {
            question: "How comfortable are you with advanced analytics concepts?",
            options: [
                { text: "I'm just starting out and want a practical introduction.", score: 0 },
                { text: "I'm ready to dive into topics like RAG and agentic workflows.", score: 1 }
            ],
        },
        {
            question: "What would be a bigger win for you right now?",
            options: [
                { text: "Saving hours each week and proving AI's value to my manager.", score: 0 },
                { text: "Building systems that deliver business answers instantly, not just data.", score: 1 }
            ],
        }
    ];

    const handleAnswer = (answerScore) => {
        const newScore = score + answerScore;
        if (step < questions.length) {
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

    const startQuiz = () => {
        setStep(1);
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
                        {step === 0 ? (
                            <motion.div
                                key="start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center"
                            >
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <Icon name="compass" size={32} className="text-purple-400"/>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white">Find Your Perfect Path</h3>
                                </div>
                                <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
                                    Answer a few quick questions to see if the 3-Hour Champion Sprint or the 16-Hour Superstar Accelerator is right for you.
                                </p>
                                <motion.button
                                    onClick={startQuiz}
                                    className="py-3 px-10 text-lg font-semibold rounded-full bg-purple-600 text-white shadow-xl"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Quiz
                                </motion.button>
                            </motion.div>
                        ) : result ? (
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
                                        {step} / {questions.length}
                                    </div>
                                </div>
                                
                                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-8">
                                    <motion.div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" initial={{width:0}} animate={{ width: `${((step) / questions.length) * 100}%` }} />
                                </div>
                                
                                <div className="max-w-xl mx-auto">
                                    <p className="font-semibold text-white text-lg mb-4 text-center">{questions[step - 1].question}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {questions[step - 1].options.map(option => (
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
