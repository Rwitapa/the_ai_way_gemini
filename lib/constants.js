import React from 'react';
import Icon from '../components/common/Icon.jsx';

// --- SHARED CONSTANTS ---
export const RAZORPAY_PAYMENT_URL = 'https://pages.razorpay.com/pl_REQlevt3yir34I/view';
export const SUPERSTAR_ACCELERATOR_URL = 'https://rzp.io/rzp/ubyT3MWl';
export const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/D8xghzQNPWe1jaHH4T6hM5";

// --- COURSE DATA ---
export const courseData = {
  sprint: {
    title: "3-Hour Champion Sprint",
    subtitle: "Automate a report, create an impact memo.",
    description: "Stop spending hours on manual reports. This focused, hands-on sprint will teach you how to identify a high-value KPI and build your first live automation in just three hours. You'll walk away with a working workflow and a proof memo you can show to your manager or in an interview.",
    price: "₹499",
    originalPrice: "₹999",
    bonus: "+ Free Resources worth ₹5,999",
    mascot: 'champion',
    level: 'Beginner',
    duration: '3 Hours',
    guarantee: '100% Money-Back Guarantee',
    keyOutcomes: [
        { icon: 'bolt', text: 'An automated pipeline for a key business report.' },
        { icon: 'file-text', text: 'A professional Impact Memo to showcase your work.' },
        { icon: 'tool', text: 'Hands-on experience with SQL or no-code automation tools.' },
    ],
    detailedDescription: "The Champion Sprint is designed for immediate impact. In one session, you will learn the framework for identifying automation opportunities, select a key metric, and build a real pipeline that fetches, processes, and delivers data. You'll leave not just with a new skill, but with a tangible result and the documentation to prove it.",
    modules: [
        { title: "Module 1: The ROI Mindset", summary: "Learn to identify which manual reports are costing the most time and offer the highest value for automation. Define your project's scope and expected impact." },
        { title: "Module 2: Building Your First Automation", summary: "Choose your track (SQL or No-Code) and follow a step-by-step guide to build a live data pipeline that refreshes and delivers a key report automatically." },
        { title: "Module 3: Packaging Your Win", summary: "Master the art of communicating your success. We'll guide you through creating a compelling Impact Memo that quantifies the time saved and value created." },
    ]
  },
  accelerator: {
    title: "16-Hour Superstar Accelerator",
    subtitle: "Build an end-to-end AI agent.",
    description: "This is not another theory-heavy course. The Accelerator gives you the skills to design and deploy end-to-end agentic AI systems—pipelines that pull data, analyze it, and deliver answers where people work. You will learn to build, test, and package real-world solutions that showcase your expertise.",
    price: "₹4,999",
    originalPrice: "₹10,000",
    bonus: "+ Free Resources worth ₹5,999",
    mascot: 'accelerator',
    level: 'Intermediate',
    duration: '16 Hours',
    guarantee: '100% Money-Back Guarantee',
    keyOutcomes: [
        { icon: 'rocket', text: 'A portfolio-ready AI agent that automates complex analytics.' },
        { icon: 'git-fork', text: 'Proficiency in designing, building, and testing agentic workflows.' },
        { icon: 'user', text: 'A case study that demonstrates your ability to deliver measurable ROI.' },
    ],
    detailedDescription: "The Superstar Accelerator is your launchpad into advanced analytics and AI. Over two weekends, you'll go beyond simple automation to build a sophisticated AI agent that can reason, analyze data, and deliver insights proactively. We cover everything from system design and prompt engineering to testing and deployment, ensuring you leave with a powerful case study for your portfolio.",
    modules: [
        { title: "Module 1: System Design & Agentic Thinking", summary: "Learn to think in terms of agents and design robust, scalable AI workflows for analytics." },
        { title: "Module 2: Core Engine Development", summary: "Build the brain of your agent. Master prompt engineering, connect to data sources, and implement analytical logic." },
        { title: "Module 3: Output & Delivery", summary: "Integrate your agent with tools like Slack and email to deliver insights where they are most valuable." },
        { title: "Module 4: Testing & Deployment", summary: "Learn to rigorously test your agent's outputs and deploy it in a reliable, production-ready environment." },
    ]
  }
};

// --- PERSONAS ---
export const personas = [
    { icon: 'user', text: "You're a Business Analyst tired of the report-fixing loop." },
    { icon: 'book', text: "You're a Data Analyst who wants to deliver proactive, not reactive, insights." },
    { icon: 'user-check', text: "You're a Product Analyst looking to automate KPI monitoring and alerting." },
    { icon: 'square-check', text: "You're a manager who wants to upskill your team for an AI-driven world." }
];

// --- TESTIMONIALS ---
export const testimonials = [
  { name: 'Rahul Verma', title: 'Data Analyst, Swiggy', image: '/people/rahul.png', text: "The Champion Sprint was a game-changer. I automated a report in 3 hours that used to take me 4 hours every week. My manager was thrilled!" },
  { name: 'Priya Patel', title: 'Business Analyst, Zomato', image: '/people/priya.png', text: "I went from theory to a working AI agent in two weekends. The hands-on approach of the Accelerator is exactly what I needed to build my confidence and my portfolio." },
  { name: 'Aman Gupta', title: 'Product Analyst, Paytm', image: '/people/aman.png', text: "The focus on creating an 'Impact Memo' was brilliant. It's not just about building something; it's about proving its value. That's a skill I'll use for the rest of my career." },
  { name: 'Sneha Sharma', title: 'Analytics Manager, Razorpay', image: '/people/sneha.png', text: "I enrolled my entire team in the Sprint. The ROI was immediate. The team is more motivated, and we've freed up dozens of hours of manual work." },
  { name: 'Akshay Kumar', title: 'BI Developer, Zoho', image: '/people/akshay.png', text: "The Superstar Accelerator is the most practical AI course out there. You build real things that solve real problems. Highly recommended." }
];

// --- FAQs ---
export const faqs = [
    { q: "Who are these courses for?", a: "Our courses are for any professional who works with data—Business Analysts, Data Analysts, Product Analysts, and even managers who want to lead AI-driven teams. If you're tired of manual reporting and want to make a bigger impact, you're in the right place." },
    { q: "Do I need to know how to code?", a: "For the Champion Sprint, no! We have a no-code track that lets you build powerful automations without writing a single line of code. For the Superstar Accelerator, some familiarity with Python is helpful but not mandatory." },
    { q: "What tools will I be using?", a: "You'll be using a mix of industry-standard tools like SQL, Python, and popular no-code platforms. The focus is on the concepts, so you can apply what you learn to any tool you use at your company." },
    { q: "Is this another pre-recorded, theoretical course?", a: "Absolutely not. All our sessions are live, hands-on, and focused on building real-world projects. You'll leave with working automations and tangible case studies for your portfolio, not just notes." },
    { q: "What if I'm not satisfied with the course?", a: "We offer a 100% money-back guarantee. If you attend all sessions and complete the projects but feel you haven't received value, we'll refund your entire fee. Your success is our top priority." }
];

// --- MASCOTS (SVG Components) ---
export const mascots = {
    champion: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,15 L70,35 L60,35 L60,65 L40,65 L40,35 L30,35 Z" fill="currentColor" />
        <path d="M50,70 L60,85 L40,85 Z" fill="currentColor" />
      </svg>
    ),
    accelerator: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,15 L75,40 L65,40 L65,85 L35,85 L35,40 L25,40 Z" fill="currentColor" />
        <path d="M50,15 L55,5 L45,5 Z" fill="currentColor" />
      </svg>
    ),
};
  
// --- LOGOS ---
export const LOGOS = [
    { name: "Flipkart", src: "/brand/flipkart.png" },
    { name: "PharmEasy", src: "/brand/pharmeasy.png" },
    { name: "Swiggy", src: "/brand/swiggy.png" },
    { name: "Zomato", src: "/brand/zomato.png" },
    { name: "Paytm", src: "/brand/paytm.png" },
    { name: "Razorpay", src: "/brand/razorpay.png" },
    { name: "Ola", src: "/brand/ola.png" },
    { name: "Zoho", src: "/brand/zoho.png" }
];

// --- Reusable Testimonial Card Component ---
export const TestimonialCard = ({ testimonial }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
        <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
        <div className="flex items-center">
            <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
            </div>
        </div>
    </div>
);


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
// Let's see
