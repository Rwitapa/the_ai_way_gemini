// components/CourseFinderQuiz.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Icon from './common/Icon.jsx';
import { courseData, mascots } from '../lib/constants';

const CourseFinderQuiz = ({ scrollToSection }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);

    const questions = [
        {
            id: 'painPoint',
            question: "What's your biggest pain point right now?",
            options: [
                { text: "I spend too much time on repetitive, manual reporting.", score: 0, value: 'reporting' },
                { text: "My dashboards are good, but they don't drive action.", score: 1, value: 'action' }
            ],
        },
        {
            id: 'goal',
            question: "What's your primary goal with AI?",
            options: [
                { text: "To automate a specific task and get a quick, tangible win.", score: 0, value: 'quickWin' },
                { text: "To build a portfolio of AI projects and become an AI-powered analyst.", score: 1, value: 'portfolio' }
            ],
        },
        {
            id: 'comfortLevel',
            question: "How comfortable are you with advanced analytics concepts?",
            options: [
                { text: "I'm just starting out and want a practical introduction.", score: 0, value: 'beginner' },
                { text: "I'm ready to dive into topics like RAG and agentic workflows.", score: 1, value: 'advanced' }
            ],
        },
        {
            id: 'biggerWin',
            question: "What would be a bigger win for you right now?",
            options: [
                { text: "Saving hours each week and proving AI's value to my manager.", score: 0, value: 'timeSaving' },
                { text: "Building systems that deliver business answers instantly, not just data.", score: 1, value: 'strategy' }
            ],
        }
    ];

    const handleAnswer = (answer) => {
        const newAnswers = [...answers.slice(0, step - 1), answer];
        setAnswers(newAnswers);

        const currentScore = newAnswers.reduce((total, ans) => total + ans.score, 0);

        if (step < questions.length) {
            setStep(step + 1);
        } else {
            calculateResult(currentScore);
        }
    };

    const calculateResult = (finalScore) => {
        if (finalScore >= 2) {
            setResult('accelerator');
        } else {
            setResult('sprint');
        }
    };
    
    const getInsight = () => {
        const painPointAnswer = answers.find(a => a.id === 'painPoint')?.value;
        const goalAnswer = answers.find(a => a.id === 'goal')?.value;

        if (result === 'sprint') {
            if (painPointAnswer === 'reporting') {
                return "Fun Fact: Analysts spend up to 8 hours a week on repetitive reporting. You're on the right track to reclaim that time!";
            }
            if (goalAnswer === 'quickWin') {
                return "A single, successful automation project is often the fastest way to get management's attention and buy-in for more AI initiatives.";
            }
        } else { // accelerator
            if (painPointAnswer === 'action') {
                return "You've noticed that dashboards often show 'what' but not 'why.' Building AI agents is the key to bridging that gap and providing actionable answers.";
            }
            if (goalAnswer === 'portfolio') {
                return "Fun Fact: 85% of AI hiring managers say a strong portfolio of real-world projects is more influential than a traditional CV. You're thinking like a top candidate!";
            }
        }
        return "Fun Fact: Automating just one daily 30-minute task can save you over 120 hours a year!";
    };


    const resetQuiz = () => {
        setStep(0);
        setAnswers([]);
        setResult(null);
    };

    const startQuiz = () => {
        setStep(1);
    };

    const goBack = () => {
        setAnswers(prev => prev.slice(0, -1));
        if (step > 1) {
            setStep(step - 1);
        } else {
            setStep(0);
        }
    };

    return (
        <section className="pt-8 md:pt-10 pb-16 md:pb-20 bg-gray-950">
            <div className="container mx-auto px-6">
                <motion.div
                    className="w-full bg-gradient-to-br from-purple-900/40 via-gray-900 to-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl shadow-purple-900/20 border border-purple-800/60 relative min-h-[420px] flex flex-col justify-center"
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
                                <div className="flex justify-center items-center gap-4 mb-4">
                                    <Icon name="compass" size={40} className="text-purple-400" />
                                    <h3 className="text-3xl md:text-4xl font-bold text-white">Find Your Perfect Path!</h3>
                                    <Icon name="award" size={40} className="text-purple-400" />
                                </div>
                                <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
                                    Answer a few quick questions to find which course is best for you right now. Get personalized insight to match your interests and goals!
                                </p>
                                <div className="flex justify-center items-center gap-12">
                                    <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full text-purple-400">
                                        <Icon name="cpu" size={32} />
                                    </div>
                                    <motion.button
                                        onClick={startQuiz}
                                        className="py-3 px-10 text-lg font-semibold rounded-full bg-purple-600 text-white shadow-xl flex items-center justify-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Start Quiz
                                    </motion.button>
                                    <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full text-purple-400">
                                        <Icon name="book" size={32} />
                                    </div>
                                </div>
                            </motion.div>
                        ) : result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center flex-grow flex flex-col justify-center"
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
                                <div className="bg-gray-800/50 p-3 rounded-lg max-w-xl mx-auto mb-6 text-sm italic text-cyan-300 border border-gray-700">
                                    {getInsight()}
                                </div>
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
                                className="flex-grow flex flex-col"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <button onClick={goBack} className="text-gray-400 hover:text-white transition-colors">
                                        <Icon name="arrow-left" size={24} />
                                    </button>
                                    <div className="font-mono text-sm text-purple-400 bg-gray-950/50 px-2 py-1 rounded-full">
                                        {step} / {questions.length}
                                    </div>
                                </div>
                                
                                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-8">
                                    <motion.div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" initial={{width:0}} animate={{ width: `${((step) / questions.length) * 100}%` }} />
                                </div>
                                
                                <div className="max-w-xl mx-auto flex-grow flex flex-col justify-center">
                                    <p className="font-semibold text-white text-lg mb-4 text-center">{questions[step - 1].question}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {questions[step - 1].options.map(option => (
                                            <motion.button
                                                key={option.text}
                                                onClick={() => handleAnswer({ id: questions[step - 1].id, ...option })}
                                                className="w-full text-left p-4 rounded-xl border border-gray-700 bg-gray-900 hover:bg-purple-900/50 hover:border-purple-700 transition-all flex items-center"
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
