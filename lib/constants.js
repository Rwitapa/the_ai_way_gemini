import React from 'react';

// --- SHARED CONSTANTS ---
export const RAZORPAY_PAYMENT_URL = 'https://pages.razorpay.com/pl_REQlevt3yir34I/view';
export const SUPERSTAR_ACCELERATOR_URL = 'https://rzp.io/rzp/ubyT3MWl';
export const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/D8xghzQNPWe1jaHH4T6hM5";

// --- DATE UTILITIES ---

/**
 * Calculates the ISO week number of a given date.
 * This is a helper function used to ensure the accelerator program runs on alternate weeks.
 * @param {Date} d The date to get the week number for.
 * @returns {number} The ISO week number.
 */
export const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
};

/**
 * Generates Champion Sprint dates (Mon, Wed, Fri) for a specified period.
 * @param {Date} startDate - The date to start generating from.
 * @param {number} yearsIntoFuture - How many years of dates to generate.
 * @returns {Date[]} An array of Date objects.
 */
export const getNextSprintDates = (startDate, yearsIntoFuture = 5) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + yearsIntoFuture);

    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, etc.
        // If the day is Monday (1), Wednesday (3), or Friday (5)
        if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
            // Add a new date set to 7:00 PM
            dates.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

/**
 * Generates Superstar Accelerator dates (alternate Sat/Sun) for a specified period.
 * @param {Date} startDate - The date to start generating from.
 * @param {number} yearsIntoFuture - How many years of dates to generate.
 * @returns {object[]} An array of objects, each with a 'start' and 'end' Date.
 */
export const getNextAcceleratorDates = (startDate, yearsIntoFuture = 5) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + yearsIntoFuture);

    // Find the first upcoming Saturday
    let daysUntilSaturday = (6 - currentDate.getDay() + 7) % 7;
    currentDate.setDate(currentDate.getDate() + daysUntilSaturday);

    // The accelerator runs on weekends of ODD calendar weeks.
    // If the first Saturday is in an even week, skip to the following Saturday.
    if (getWeekNumber(currentDate) % 2 === 0) {
        currentDate.setDate(currentDate.getDate() + 7);
    }

    while (currentDate <= endDate) {
        const saturday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0); // 10 AM
        const sunday = new Date(saturday);
        sunday.setDate(saturday.getDate() + 1);
        sunday.setHours(19, 0, 0, 0); // 7 PM

        if (saturday <= endDate) {
           dates.push({ start: saturday, end: sunday });
        }
        // Jump ahead 14 days to the next alternate Saturday
        currentDate.setDate(currentDate.getDate() + 14);
    }
    return dates;
};

/**
 * Formats a sprint date for display.
 * @param {Date} date The date to format.
 * @returns {string} The formatted date string (e.g., "15 Sep, 7 PM - 10 PM IST").
 */
export const formatSprintDate = (date) => date ? `${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, 7 PM - 10 PM IST` : 'Choose a date...';

/**
 * Formats an accelerator cohort date range for display.
 * @param {object} cohort An object with 'start' and 'end' Date objects.
 * @returns {string} The formatted date string (e.g., "14 - 15 Sep, 10 AM - 7 PM IST").
 */
export const formatAcceleratorDate = (cohort) => {
    if (!cohort || !cohort.start || !cohort.end) return 'Choose a date...';
    const startDay = cohort.start.toLocaleDateString('en-IN', { day: 'numeric' });
    const startMonth = cohort.start.toLocaleDateString('en-IN', { month: 'short' });
    const endDay = cohort.end.toLocaleDateString('en-IN', { day: 'numeric' });
    const endMonth = cohort.end.toLocaleDateString('en-IN', { month: 'short' });

    if (startMonth === endMonth) {
        return `${startDay} - ${endDay} ${endMonth}, 10 AM - 7 PM IST`;
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}, 10 AM - 7 PM IST`;
};
