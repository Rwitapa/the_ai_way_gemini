// components/CourseComparator.jsx
import React from 'react';
import { motion } from "framer-motion";
import Icon from './common/Icon.jsx';

const comparisonData = {
    headers: ['Feature', '3-Hour Champion Sprint', '16-Hour Superstar Accelerator'],
    rows: [
        {
            feature: 'Theme',
            sprint: 'Get a quick, tangible win. Automate one task you hate.',
            accelerator: 'Master AI for analytics. Go deep on multiple use cases to build a career edge.',
        },
        {
            feature: 'Main Outcome',
            sprint: 'One working AI workflow that saves you hours every single week.',
            accelerator: 'A portfolio of 4 advanced workflows & a new professional brand.',
        },
        {
            feature: 'What You Learn',
            sprint: 'Practical Prompting & Automating one report.',
            accelerator: '4 AI Solutioning Techniques, Human-in-Loop Design & Career Positioning.',
        },
        {
            feature: 'Career Trajectory',
            sprint: 'Prove efficiency in your current role.',
            accelerator: 'Become the AI leader on your team and transform your career.',
        }
    ]
};

const CourseComparator = () => (
    <section className="py-16 md:py-20 bg-gray-950">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Which Path is Right For You?</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                    Find the perfect fit for your goals, time, and ambition.
                </p>
            </div>
            <motion.div 
                className="overflow-x-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <div className="w-full max-w-4xl mx-auto bg-gray-900/50 border border-gray-800 rounded-2xl shadow-lg">
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="p-4 md:p-6 text-sm font-semibold uppercase text-purple-400">{comparisonData.headers[0]}</th>
                                <th className="p-4 md:p-6 text-sm font-semibold uppercase text-white">{comparisonData.headers[1]}</th>
                                <th className="p-4 md:p-6 text-sm font-semibold uppercase text-purple-300">{comparisonData.headers[2]}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {comparisonData.rows.map((row, index) => (
                                <tr key={index}>
                                    <td className="p-4 md:p-6 font-semibold text-white text-base">{row.feature}</td>
                                    <td className="p-4 md:p-6 text-gray-300 text-sm">{row.sprint}</td>
                                    <td className="p-4 md:p-6 text-gray-200 text-sm font-medium">{row.accelerator}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    </section>
);

export default CourseComparator;
