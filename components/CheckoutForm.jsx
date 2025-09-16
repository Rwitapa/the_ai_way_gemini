// components/CheckoutForm.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Icon from './common/Icon.jsx';

const CheckoutForm = ({ isOpen, onClose, onCheckout, courseTitle, price }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setEmail] = useState('');
    const [customerPhone, setPhone] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onCheckout({ customerName, customerEmail, customerPhone });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-gray-800 border border-purple-800/50 rounded-2xl shadow-2xl w-full max-w-md p-6"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
                            <h3 className="text-xl font-bold text-white">Enroll in {courseTitle}</h3>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors"><Icon name="x" size={20} className="text-white" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full bg-gray-700 p-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={customerEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-700 p-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={customerPhone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-gray-700 p-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <div className="mt-6">
                                <motion.button
                                    type="submit"
                                    className="w-full py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Pay {price}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CheckoutForm;
