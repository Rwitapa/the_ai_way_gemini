// components/CourseCalendar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Icon from './common/Icon.jsx';

const CohortCalendarModal = ({ isOpen, onClose, courseTitle, cohortDates, onDateSelect, courseType, position }) => {
    const modalRef = useRef(null);
    const [style, setStyle] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    // This function now correctly initializes the calendar to the first day of the
    // month of the next available cohort, ensuring consistent state.
    const getInitialDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!cohortDates || cohortDates.length === 0) {
            return new Date(today.getFullYear(), today.getMonth(), 1);
        }

        const futureDates = cohortDates.filter(d => (courseType === 'sprint' ? d : d.start) >= today);

        if (futureDates.length === 0) {
            return new Date(today.getFullYear(), today.getMonth(), 1);
        }
        
        const firstCohortDate = courseType === 'sprint' ? futureDates[0] : futureDates[0]?.start;

        // Always return the first day of the month for consistency
        return new Date(firstCohortDate.getFullYear(), firstCohortDate.getMonth(), 1);
    };

    const [currentDate, setCurrentDate] = useState(getInitialDate());

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // This effect now correctly re-initializes the calendar view when it's opened
        if (isOpen) {
            setCurrentDate(getInitialDate());
        }
    }, [isOpen, cohortDates, courseType]);

    useEffect(() => {
        if (!isOpen) return;

        if (isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            const handleClickOutside = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    onClose();
                }
            };
            setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
            
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isMobile, onClose]);

    useEffect(() => {
        if (isOpen && !isMobile && position) {
            const modalWidth = 384;
            const windowWidth = window.innerWidth;

            let left = position.left;
            if (left + modalWidth > windowWidth - 16) {
                left = windowWidth - modalWidth - 16;
            }
            if (left < 16) {
                left = 16;
            }

            setStyle({
                top: `${position.top + window.scrollY}px`,
                left: `${left}px`,
            });
        }
    }, [isOpen, position, isMobile]);

    const changeMonth = (offset) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    const renderHeader = () => (
        <div className="flex justify-between items-center px-4 py-2">
            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Icon name="arrow-left" size={20} />
            </button>
            <span className="font-bold text-lg text-white">
                {currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Icon name="arrow-right" size={20} />
            </button>
        </div>
    );

    const renderDaysOfWeek = () => {
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        return (
            <div className="grid grid-cols-7 text-center text-xs text-gray-400 font-semibold mb-2">
                {days.map((day, index) => <div key={index}>{day}</div>)}
            </div>
        );
    };

    const renderCalendarGrid = () => {
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(startDate.getDate() - monthStart.getDay());
        const endDate = new Date(monthEnd);
        endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const displayableCohorts = (cohortDates || []).filter(d => {
            const cohortStartDate = courseType === 'sprint' ? d : d.start;
            return cohortStartDate >= today;
        });

        const cohortDateStrings = displayableCohorts.map(d => (courseType === 'sprint' ? d : d.start).toDateString());

        const rows = [];
        let day = new Date(startDate);

        while (day <= endDate) {
            const days = [];
            const weekStartDate = new Date(day);
            for (let i = 0; i < 7; i++) {
                const dayOfMonth = day.getDate();
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const dayString = day.toDateString();
                const isCohortStart = cohortDateStrings.includes(dayString);
                const dayKey = day.toISOString();

                let cohortData = null;
                if (isCohortStart) {
                    cohortData = displayableCohorts.find(d => (courseType === 'sprint' ? d : d.start).toDateString() === dayString);
                }

                // --- START OF THE FIX ---
                // This logic ensures that all non-selectable dates are styled correctly,
                // while all selectable dates (purple buttons) are always clearly visible.
                let dayClass = 'text-gray-200';
                if (!isCurrentMonth) {
                    dayClass = 'text-gray-600';
                }
                // --- END OF THE FIX ---

                days.push(
                    <div
                        key={dayKey}
                        className={`p-1 flex items-center justify-center h-10 w-10`}
                    >
                        {isCohortStart ? (
                             <button
                                onClick={() => onDateSelect(courseType, cohortData)}
                                className="w-full h-full rounded-full bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors flex items-center justify-center shadow-lg"
                            >
                                {dayOfMonth}
                            </button>
                        ) : (
                            <span className={dayClass}>{dayOfMonth}</span>
                        )}
                    </div>
                );
                day.setDate(day.getDate() + 1);
            }
            rows.push(<div className="grid grid-cols-7 justify-items-center" key={weekStartDate.toISOString()}>{days}</div>);
        }
        return <div className="p-2">{rows}</div>;
    };
    
    const modalContent = (
         <div className="flex justify-between items-center p-4 border-b border-gray-700">
             <h3 className="text-xl font-bold text-white">{courseTitle}</h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Icon name="x" size={20} />
            </button>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                isMobile ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="bg-gray-800 border border-purple-800/50 rounded-2xl shadow-2xl w-full max-w-sm"
                            onClick={e => e.stopPropagation()}
                        >
                            {modalContent}
                            {renderHeader()}
                            {renderDaysOfWeek()}
                            {renderCalendarGrid()}
                             <div className="p-4 border-t border-gray-700 text-center">
                                <p className="text-xs text-gray-400">Select an available date to book your spot.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="absolute z-[100] bg-gray-800 border border-purple-800/50 rounded-2xl shadow-2xl w-full max-w-sm"
                        style={style}
                    >
                        {modalContent}
                        {renderHeader()}
                        {renderDaysOfWeek()}
                        {renderCalendarGrid()}
                         <div className="p-4 border-t border-gray-700 text-center">
                            <p className="text-xs text-gray-400">Select an available date to book your spot.</p>
                        </div>
                    </motion.div>
                )
            )}
        </AnimatePresence>
    );
};

export default CohortCalendarModal;
