import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";

// Drive file id
const DRIVE_ID = "1bWLkSMfXZ4AAtvuWk1sf_dmSVtQvA1aJ";
const DRIVE_PRIMARY = `https://lh3.googleusercontent.com/d/${DRIVE_ID}=w1200`;
const DRIVE_BACKUP  = `https://drive.google.com/uc?export=view&id=${DRIVE_ID}`;


// This is the main App component that contains the entire website.
const Icon = ({ name, size = 24, strokeWidth = 2, className = '' }) => {
  const icons = {
    bolt: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="m14 22-7-4-2.5 1.5" />
        <path d="m20.5 4.5-7 4-2.5-1.5" />
        <path d="M8.5 10.5 14 13" />
      </svg>
    ),
    rocket: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4.5 16.5c-1.5 2.5-1.5 5 0 7.5L8 16.5" />
        <path d="m18 2-1 3-3-1" />
        <path d="m11 16-1-3 3-1-3-1-3-1" />
        <path d="M12 21.5-1.5-1.5" />
      </svg>
    ),
    book: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 19.5V10c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v9.5L12 22 4 19.5z" />
        <path d="M12 10V8" />
        <path d="M16 10V8" />
        <path d="M8 10V8" />
      </svg>
    ),
    'user': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    'bar-chart': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    'check-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-8.68" />
        <path d="m22 4-7 7-4-4" />
      </svg>
    ),
    'arrow-right': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
    'arrow-left': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
    ),
    'play-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    'code-2': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
    'git-fork': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M18 9v2c0 .2-.1.4-.2.5l-5.6 5.6" />
        <path d="M6 9v4c0 1.1.9 2 2 2h4" />
      </svg>
    ),
    'file-text': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    ),
    'tool': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-5.61 5.61a1 1 0 0 0-.25 1.7L2 22l1.5-1.5a1 1 0 0 0 1.7-.25l5.61-5.61a6 6 0 0 1 7.94-7.94l-3.77 3.77Z" />
        <path d="m18 10-1.5-1.5" />
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
    'linkedin': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    'twitter': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 4.02a10.03 10.03 0 0 1-2.88.8 4.97 4.97 0 0 0 2.18-2.73 10.03 10.03 0 0 1-3.17 1.2 4.97 4.97 0 0 0-8.5 4.54A14.04 14.04 0 0 1 3 3a4.97 4.97 0 0 0 1.54 6.64A4.97 4.97 0 0 1 3 10.37V11a4.97 4.97 0 0 0 4.01 4.87 4.97 4.97 0 0 1-2.24.08A4.97 4.97 0 0 0 9.22 17a9.98 9.98 0 0 1-6.17 2.13 14.04 14.04 0 0 0 20-13.63V4.02z" />
      </svg>
    ),
    'instagram': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
        <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
      </svg>
    ),
    'square-check': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    'user-check': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 10V6l-2 3" />
        <path d="m17 14 2 2 4-4" />
      </svg>
    ),
    'graduation-cap': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v-2" /><path d="M18 12v-2" /><path d="M12 12v-2" /><path d="M4 18v-2" /><path d="M20 18v-2" /><path d="M12 18v-2" /><path d="M6 20v-2" /><path d="M18 20v-2" /><path d="M12 20v-2" /><path d="M4 22v-2" /><path d="M20 22v-2" /><path d="M12 22v-2" /><path d="M22 14v-2" /><path d="M2 14v-2" /><path d="M10 22v-2" /><path d="M14 22v-2" /><path d="M10 18v-2" /><path d="M14 18v-2" /><path d="M22 20v-2" /><path d="M2 20v-2" /></svg>
    )
  };
  return icons[name] || null;
};

const RAZORPAY_PAYMENT_URL = 'https://pages.razorpay.com/pl_REQlevt3yir34I/view';
const SUPERSTAR_ACCELERATOR_URL = 'https://rzp.io/rzp/ubyT3MWl';

// Utility function to get the next upcoming day of the week (0 for Sunday, 1 for Monday, etc.)
const getNextDayOfWeek = (dayIndices) => {
  const now = new Date();
  const currentDay = now.getDay();
  
  let closestDay = null;
  let minDaysToAdd = Infinity;

  for (const dayIndex of dayIndices) {
    let daysToAdd = dayIndex - currentDay;
    if (daysToAdd <= 0) {
      daysToAdd += 7;
    }
    if (daysToAdd < minDaysToAdd) {
      minDaysToAdd = daysToAdd;
      closestDay = new Date(now);
      closestDay.setDate(now.getDate() + daysToAdd);
    }
  }
  
  return closestDay ? `${closestDay.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}` : '';
};

// Utility function to get the date of the next alternate weekend
const getNextAlternateWeekend = () => {
  const now = new Date();
  const today = now.getDay(); // Sunday is 0
  const daysUntilSaturday = (6 - today + 7) % 7;
  const nextSaturday = new Date(now);
  nextSaturday.setDate(now.getDate() + daysUntilSaturday);

  // A simplified check to get the next alternate weekend. 
  const isCurrentWeekEven = Math.floor((nextSaturday.getTime() - new Date(nextSaturday.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24 * 7)) % 2 === 0;

  if (!isCurrentWeekEven) {
    nextSaturday.setDate(nextSaturday.getDate() + 7);
  }
  
  const nextSunday = new Date(nextSaturday);
  nextSunday.setDate(nextSaturday.getDate() + 1);

  const start = nextSaturday.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  const end = nextSunday.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

  return ` ${start} - ${end}`;
};


// Course data for both sprint and accelerator
const courseData = {
  sprint: {
    title: '3-Hour Champion Sprint',
    subtitle: 'Ship Your First KPI Automation in Just 3 Hours',
    description: 'Stop spending hours on manual reports. This focused, hands-on sprint will teach you how to identify a high-value KPI and build your first live automation in just three hours. You’ll walk away with a working workflow and a proof memo you can show to your manager or in an interview.',
    price: '₹349',
    tools: ['Google Sheets', 'BigQuery', 'n8n', 'Zapier', 'Slack'],
    modules: [
      {
        title: 'Module 1: Why Reporting is Broken',
        summary: 'Learn to spot repetitive reporting tasks that can be automated and make a shortlist of candidate KPIs from your own work.',
      },
      {
        title: 'Module 2: The One KPI That Matters',
        summary: 'Understand the criteria for picking one high-value KPI and map it to your source data to avoid getting stuck.',
      },
      {
        title: 'Module 3: Connecting to Your Data',
        summary: 'Get quick wins by connecting to your data (Sheets or SQL) without overcomplication. Leave with a working dataset ready for automation.',
      },
      {
        title: 'Module 4: Automate the Report',
        summary: 'Build a repeatable workflow using SQL or no-code tools like n8n/Zapier to automate your report refreshing.',
      },
      {
        title: 'Module 5: Deliver Where People Read',
        summary: 'Push your KPI and AI summary directly into Slack or email, ensuring your work gets seen and acted upon.',
      },
      {
        title: 'Module 6 (Bonus): RAG for FAQs',
        summary: 'Use GPT and embeddings to build a simple FAQ bot that can answer questions from your internal documents.',
      },
      {
        title: 'Module 7: Portfolio Packaging',
        summary: 'Learn how to write a crisp "Impact Memo" with screenshots and a compelling story to showcase your win at work or in interviews.',
      },
    ],
  },
  accelerator: {
    title: '16-Hour Superstar Accelerator',
    subtitle: 'Go Beyond Dashboards. Build AI Agents That Deliver Insights.',
    description: 'This is not another theory-heavy course. The Accelerator gives you the skills to design and deploy end-to-end agentic AI systems—pipelines that pull data, analyze it, and deliver answers where people work. You will learn to build, test, and package real-world solutions that showcase your expertise.',
    price: '₹4,999',
    tools: ['SQL (BigQuery/Postgres)', 'n8n', 'OpenAI GPT-4', 'LangChain/LlamaIndex', 'Qdrant/Supabase', 'Slack/Email/WhatsApp APIs'],
    modules: [
      {
        title: 'Module 1: Analytics is Broken',
        summary: 'Learn to frame business problems worth solving with AI and create a clear project brief for your chosen use case.',
      },
      {
        title: 'Module 2: AI Hype vs Reality',
        summary: 'Get a practical checklist for when to use AI vs traditional BI, and understand what LLMs can actually do in analytics.',
      },
      {
        title: 'Module 3: Prompt Engineering Basics',
        summary: 'Master the fundamentals of crafting structured prompts to reduce hallucinations and get accurate results for reporting, insights, and validation.',
      },
      {
        title: 'Module 4: Agents > Dashboards',
        summary: 'Go beyond static dashboards by learning the principles of agent design: goal setting, memory, tools, and actions.',
      },
      {
        title: 'Module 5: Reporting Agent (Hands-On)',
        summary: 'Build and deploy a working agent that queries SQL, gets an AI-generated summary, and delivers it to Slack.',
      },
      {
        title: 'Module 6: Funnel Drop-Off Analyzer (Hands-On)',
        summary: 'Build an agent that analyzes funnels, compares history, and flags anomalies to help teams uncover insights automatically.',
      },
      {
        title: 'Module 7: RAG Knowledge Assistant',
        summary: 'Build a RAG-based chatbot that can answer questions from your internal documents with citations, eliminating generic or hallucinated answers.',
      },
      {
        title: 'Module 8: End-to-End Agent Pipeline',
        summary: 'Chain together SQL, prompts, and actions using n8n to create a complete agentic pipeline orchestrated in a no-code environment.',
      },
      {
        title: 'Module 9: Pangs of Agentic AI',
        summary: 'Learn where agents break (costs, latency, mistrust) and how to mitigate those issues with fallbacks and human oversight.',
      },
      {
        title: 'Module 10: Proof of Work',
        summary: 'Create a professional Impact Memo, slides, and GitHub repo for your artifacts, turning your project into a compelling portfolio case study.',
      },
    ],
  },
};

const CoursesPage = ({ onBack }) => {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (moduleTitle) => {
    setOpenModule(openModule === moduleTitle ? null : moduleTitle);
  };

  const renderModules = (modules) => {
    return modules.map((module, index) => (
      <div key={index} className="border-b border-gray-700 py-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleModule(module.title)}
        >
          <h4 className="text-lg font-semibold text-white">{module.title}</h4>
          <Icon
            name="arrow-left"
            size={24}
            className={`text-purple-500 transform transition-transform duration-300 ${openModule === module.title ? '-rotate-90' : 'rotate-180'
              }`}
            strokeWidth={1.5}
          />
        </div>
        {openModule === module.title && (
          <p className="mt-2 text-gray-400">{module.summary}</p>
        )}
      </div>
    ));
  };

  const renderCourseCard = (course, isPopular = false) => (
    <div className={`bg-gray-900 rounded-3xl p-8 border border-gray-800 flex flex-col justify-between ${isPopular ? 'border-purple-700 bg-gradient-to-br from-purple-900 to-gray-900' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1 bg-yellow-500 text-black font-bold rounded-full text-sm">
          Popular
        </div>
      )}
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-lg text-gray-400 mb-4">{course.subtitle}</p>
        <p className="text-gray-300 mb-6">{course.description}</p>
        
        {/* Next Cohort Dates */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Next Cohort</h4>
          {course.title === '3-Hour Champion Sprint' ? (
            <p className="text-white text-base">{getNextDayOfWeek([1, 3, 5])}, 7-10 PM IST</p>
          ) : (
            <p className="text-white text-base">{getNextAlternateWeekend()}, 10 AM - 7 PM IST</p>
          )}
        </div>

        <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Tools Covered</h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {course.tools.map((tool, index) => (
            <span key={index} className="bg-gray-800 text-gray-400 text-xs font-medium px-2.5 py-1 rounded-full">{tool}</span>
          ))}
        </div>

        <div className="text-white font-bold text-2xl mb-8">
          {course.price}
        </div>

        <div className="space-y-4">
          {course.title === '3-Hour Champion Sprint' ? (
            <a href={RAZORPAY_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors">
              Enroll Now
            </a>
          ) : (
            <a href={SUPERSTAR_ACCELERATOR_URL} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors">
              Enroll Now
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 bg-gray-950">
      <div className="container mx-auto px-6 md:px-12">
        <button onClick={onBack} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8">
          <Icon name="arrow-left" size={20} className="mr-2" /> Back to Home
        </button>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Courses</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Discover a learning path that turns you into a high-impact, AI-driven business analyst.
          </p>
        </div>

        {/* Courses Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 mb-20">
          {renderCourseCard(courseData.sprint)}
          <div className="relative">
            {renderCourseCard(courseData.accelerator, true)}
          </div>
        </div>

        {/* Detailed Modules Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Sneak Peek: What You'll Learn</h2>
          
          <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 mb-12">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Icon name="play-circle" size={24} className="mr-2 text-purple-400" /> 3-Hour Champion Sprint
            </h3>
            {renderModules(courseData.sprint.modules)}
          </div>
          
          <div className="bg-gray-900 rounded-3xl p-8 border border-purple-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Icon name="play-circle" size={24} className="mr-2 text-purple-400" /> 16-Hour Superstar Accelerator
            </h3>
            {renderModules(courseData.accelerator.modules)}
          </div>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  // State for the mobile menu's visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCoursesPage, setShowCoursesPage] = useState(false);

  // Refs for each section to enable smooth scrolling
  const sectionRefs = {
    courses: useRef(null),
    whatYouGet: useRef(null),
    mentors: useRef(null),
    testimonials: useRef(null),
  };

  // Ref for the canvas
  const canvasRef = useRef(null);

  // UseEffect to handle the canvas animation
  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const ctx = canvas.getContext('2d');
      let animationFrameId;

      const particles = [];
      const numParticles = 250;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
          this.color = `hsl(270, 80%, ${Math.random() * 30 + 60}%)`;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.size > 0.2) this.size -= 0.01;
        }

        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const init = () => {
        particles.length = 0;
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
      };

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
          }
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      init();
      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas);
      };
    } catch (error) {
      console.error("An error occurred during canvas animation setup:", error);
    }
  }, []);

  const handleEnrollNow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleExploreCourses = () => {
    setShowCoursesPage(true);
  };
  
  // Smooth scroll function
  const scrollToSection = (sectionName) => {
    if (showCoursesPage) {
      setShowCoursesPage(false);
      setTimeout(() => {
        const sectionRef = sectionRefs[sectionName];
        if (sectionRef && sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      const sectionRef = sectionRefs[sectionName];
      if (sectionRef && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const whatsappLink = "https://chat.whatsapp.com/D8xghzQNPWe1jaHH4T6hM5";

  const sections = [
    { name: 'Courses', ref: 'courses' },
    { name: 'Mentors', ref: 'mentors' },
    { name: 'Testimonials', ref: 'testimonials' },
  ];

  const faqs = [
    {
      q: 'Will I get a certificate?',
      a: 'Yes, upon successful completion of the course, a certificate will be emailed to you.',
    },
    {
      q: 'Will I get recordings?',
      a: 'No, we do not provide recordings. Our live classes are constantly updated to reflect the latest trends and tools in the fast-moving AI landscape, ensuring you get the most relevant, hands-on learning experience possible.',
    },
    {
      q: 'Do I need coding skills?',
      a: 'Not at all. The AI Way is a tech-agnostic course. Every workflow is shown in both code (SQL/Python) and no-code (n8n/Make). We focus on the outcome and business impact, so you can choose the approach that works best for you.',
    },
    {
      q: 'How much time will it take?',
      a: 'The 3-Hour Champion Sprint is a single, focused live workshop to get you started quickly. The 16-Hour Superstar Accelerator is a comprehensive program delivered over four sessions, typically across two weekends, for a deep dive into building end-to-end AI systems.',
    },
    {
      q: 'How is this different from other courses?',
      a: 'Most other AI courses stop at concepts or tool demos. The AI Way is built on outcomes and deployment. We teach decisions and deployment, not just models and menus. You will graduate having built actual workflows and automated tasks, and you will have tangible artifacts to show to prove your ROI, such as impact memos and portfolio projects.',
    },
    {
      q: 'Do you offer mentorship?',
      a: 'Yes, our courses come with access to our WhatsApp-first community and mentorship, providing ongoing support and guidance as you apply your new skills.',
    },
    {
      q: 'What kind of portfolio will I build?',
      a: 'You will build a verifiable portfolio with real-world projects, including an automated KPI report, a working agentic AI system, SQL queries, no-code workflows, and impact memos that hiring managers respect.',
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const testimonials = [
    {
      quote: "Before this, I spent 6-8 hours every week on reports. After the Sprint, I automated them in a single evening. My manager noticed immediately, and I finally felt like my work mattered.",
      name: "Akshay Sharma",
      role: "Business Analyst",
      company: "Swiggy",
      avatar: "https://placehold.co/60x60/4A0E70/ffffff?text=AS"
    },
    {
      quote: "The hands-on projects gave me a portfolio I could immediately show in interviews. I landed my dream job because of these skills. It was a game-changer for my career.",
      name: "Priya Singh",
      role: "BI Analyst",
      company: "Razorpay",
      avatar: "https://placehold.co/60x60/0A472E/ffffff?text=PS"
    },
    {
      quote: "Finally, a course that focuses on real-world outcomes. The content is directly applicable and has made me a more strategic asset to my company, saving us countless hours.",
      name: "Rahul Kumar",
      role: "Product Manager",
      company: "Zomato",
      avatar: "https://placehold.co/60x60/4A0E70/ffffff?text=RK"
    },
    {
      quote: "I was overwhelmed by all the new AI tools. The AI Way gave me a clear, step-by-step methodology to start shipping real results. It's the most practical training I've ever had.",
      name: "Sneha Patel",
      role: "Data Analyst",
      company: "Fintech Co.",
      avatar: "https://placehold.co/60x60/0A472E/ffffff?text=SP"
    },
    {
      quote: "I've been able to tie my work directly to our team's ROI. The lessons on building impact memos were invaluable. This course is a must for any analyst looking to get noticed.",
      name: "Aman Gupta",
      role: "Analytics Manager",
      company: "Retail Inc.",
      avatar: "https://placehold.co/60x60/4A0E70/ffffff?text=AG"
    },
  ];

  const currentPageComponent = showCoursesPage ? (
    <CoursesPage onBack={() => setShowCoursesPage(false)} />
  ) : (
    <>
      {/* I. Hero Section */}
      <section className="relative overflow-hidden min-h-screen py-16 md:py-24 flex items-center bg-gray-950">
        {/* Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0"></canvas>
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 z-10 bg-gray-950/70"></div>

        <div className="relative z-20 container mx-auto px-6 md:px-12 text-center max-w-5xl animate-fade-in">
          <div className="mb-8 md:mb-12">
            <span className="inline-block py-1 px-4 rounded-full text-sm font-semibold text-purple-200 bg-purple-900/60 backdrop-blur-sm">Gen AI for Business Analysts</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 md:mb-8">
            Still stuck fixing reports? <span className="text-purple-400">Let AI make you your team's hero.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 md:mb-12 max-w-3xl mx-auto">
            Most analysts waste hours on manual dashboards and tool-hopping, only to stay invisible. The AI Way shows you how to use AI-code or no-code-to automate your work, prove ROI, and become the analyst your team can't live without.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <button onClick={handleExploreCourses} className="py-3 px-8 text-lg font-semibold rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all transform hover:scale-105 shadow-xl">
              Explore All Courses
            </button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="py-3 px-8 text-lg font-semibold rounded-full bg-[#0A472E] text-white hover:bg-[#0D573A] transition-all transform hover:scale-105">
              Join Community
            </a>
          </div>
        </div>
      </section>

      {/* II. Who This Is For (Who is it for?) */}
      <section className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">This Is For You If...</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
            You're ambitious, practical, and tired of being seen as a "report generator." You want clarity, speed, and visibility not another theory-heavy course that doesn't move the needle.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-left animate-fade-in">
              <Icon name="user" size={28} className="text-purple-500 mb-4" />
              <p className="text-gray-300 font-medium">Analysts (0-5 yrs) stuck in repetitive reporting with little recognition.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-left animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Icon name="book" size={28} className="text-purple-500 mb-4" />
              <p className="text-gray-300 font-medium">BI/Product/Data Analysts drowning in tools but unable to show ROI.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-left animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Icon name="rocket" size={28} className="text-purple-500 mb-4" />
              <p className="text-gray-300 font-medium">Managers who want their teams to deliver decisions, not just decks.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-left animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Icon name="user-check" size={28} className="text-purple-500 mb-4" />
              <p className="text-gray-300 font-medium">Professionals chasing promotions, cross-functional influence, or job mobility.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* III. Courses / Pricing */}
      <section ref={sectionRefs.courses} className="py-16 md:py-24 bg-gray-900 rounded-t-[50px] md:rounded-t-[100px] shadow-inner-xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Choose Your Path to Impact</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Stop being the report generator. Start being the ROI generator.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Champion Sprint Card */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 flex flex-col justify-between animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">3-Hour Champion Sprint</h3>
                <p className="text-lg text-gray-400 mb-4">Ship Your First Automation in Just 3 Hours</p>
                <p className="text-gray-300 mb-6">You spend hours every week refreshing the same reports. This sprint helps you break free by shipping your first live automation that does the grunt work for you.</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Next Cohort</h4>
                  <p className="text-white text-base">{getNextDayOfWeek([1, 3, 5])}, 7-10 PM IST</p>
                </div>

                <ul className="text-gray-400 space-y-2 mb-6">
                  <li className="flex items-start">
                    <Icon name="check-circle" size={16} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Learn to spot repetitive reports that eat your time.</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check-circle" size={16} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Automate a high-value report using SQL or no-code.</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check-circle" size={16} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Package your win into an Impact Memo.</span>
                  </li>
                </ul>
                <p className="text-white font-bold text-2xl mb-6">₹349</p>
              </div>
              <a href={RAZORPAY_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="mt-auto py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors">
                Enroll Now
              </a>
            </div>

            {/* Superstar Accelerator Card */}
            <div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-3xl p-8 border border-purple-700 flex flex-col justify-between relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1 bg-yellow-500 text-black font-bold rounded-full text-sm">
                Popular
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">16-Hour Superstar Accelerator</h3>
                <p className="text-lg text-gray-300 mb-4">Go Beyond Dashboards. Build AI Agents That Deliver Insights.</p>
                <p className="text-gray-200 mb-6">Most "AI for Business" courses give fluff without real outcomes. This accelerator is different. It gives you the skills and confidence to design and deploy agentic AI systems.</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Next Cohort</h4>
                  <p className="text-white text-base">{getNextAlternateWeekend()}, 10 AM - 7 PM IST</p>
                </div>

                <ul className="text-gray-200 space-y-2 mb-6">
                  <li className="flex items-start">
                    <Icon name="check-circle" size={16} className="text-purple-300 mr-2 mt-1 flex-shrink-0" />
                    <span>Master fundamentals without the fluff.</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check-circle" size={16} className="text-purple-300 mr-2 mt-1 flex-shrink-0" />
                    <span>Design and deploy AI agents for reporting, funnels, and alerts.</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check-circle" size={16} className="text-purple-300 mr-2 mt-1 flex-shrink-0" />
                    <span>Build a portfolio case study that proves ROI.</span>
                  </li>
                </ul>
                <p className="text-white font-bold text-2xl mb-6">₹4,999</p>
              </div>
              <a href={SUPERSTAR_ACCELERATOR_URL} target="_blank" rel="noopener noreferrer" className="mt-auto py-3 px-6 text-center rounded-full bg-white text-gray-950 font-semibold hover:bg-gray-200 transition-all">
                Enroll Now
              </a>
            </div>
          </div>
          <div className="text-center mt-12">
            <button onClick={handleExploreCourses} className="py-3 px-8 text-lg font-semibold rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all transform hover:scale-105 shadow-xl">
              Explore All Courses
            </button>
          </div>
        </div>
      </section>

      {/* IV. What You'll Learn (What you will get?) */}
      <section ref={sectionRefs.whatYouGet} className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-purple-400 mb-2">What You’ll Learn</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">From Repetition to ROI</h3>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
            Learn how to free yourself from manual tasks and build credibility fast.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-float">
              <Icon name="square-check" size={32} className="text-purple-500 mb-4 mx-auto p-2 bg-gray-800 rounded-full w-fit" />
              <h4 className="text-xl font-semibold text-white mb-2">Automate the boring stuff</h4>
              <p className="text-gray-400">Free yourself from endless Excel updates and manual dashboards.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-float" style={{ animationDelay: '0.2s' }}>
              <Icon name="bolt" size={32} className="text-purple-500 mb-4 mx-auto p-2 bg-gray-800 rounded-full w-fit" />
              <h4 className="text-xl font-semibold text-white mb-2">AI fundamentals made practical</h4>
              <p className="text-gray-400">Learn prompt engineering and agentic workflows through real business use cases.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-float" style={{ animationDelay: '0.4s' }}>
              <Icon name="check-circle" size={32} className="text-purple-500 mb-4 mx-auto p-2 bg-gray-800 rounded-full w-fit" />
              <h4 className="text-xl font-semibold text-white mb-2">Outcomes, not just concepts</h4>
              <p className="text-gray-400">Graduate with SQL queries, no-code flows, and prompt libraries that actually work.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-float" style={{ animationDelay: '0.6s' }}>
              <Icon name="bar-chart" size={32} className="text-purple-500 mb-4 mx-auto p-2 bg-gray-800 rounded-full w-fit" />
              <h4 className="text-xl font-semibold text-white mb-2">Build credibility fast</h4>
              <p className="text-gray-400">Use impact memos and automations as portfolio proof that hiring managers respect.</p>
            </div>
          </div>
        </div>
      </section>
    
    
{/* V. Meet The Mentor */}
<motion.section
  ref={sectionRefs?.mentors}
  className="py-12 md:py-20 bg-gray-950"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.24 }}
>
  <style>{`
    @keyframes gradient-x{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
    .animated-underline{position:relative;display:inline-block;padding-bottom:18px}
    .animated-underline::after{
      content:"";position:absolute;left:0;right:0;bottom:0;height:4px;
      background:linear-gradient(90deg,#7c3aed,#22d3ee,#7c3aed);
      background-size:200% 100%;animation:gradient-x 6s ease-in-out infinite;border-radius:9999px;opacity:.9
    }
    @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    .floaty{animation:floaty 7s ease-in-out infinite}
    @media (prefers-reduced-motion: reduce){
      .animated-underline::after{animation:none}
      .floaty{animation:none}
    }
  `}</style>

  <div className="container mx-auto px-6 md:px-12">
    {/* Heading */}
    <motion.div
      variants={{ hidden:{opacity:0,y:18}, show:{opacity:1,y:0,transition:{duration:.6}} }}
      className="text-left"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight animated-underline mb-8 md:mb-12">
        Meet The Mentor
      </h2>
      <p className="text-base md:text-lg text-gray-400 -mt-2 mb-8">
        Learn from someone who has shipped analytics in the real world.
      </p>
    </motion.div>

    {/* Two columns */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start"
      variants={{ hidden:{opacity:0}, show:{opacity:1,transition:{staggerChildren:.08}} }}
    >
      {/* LEFT: photo (circle) + name + intro + CTA */}
      <motion.div
        variants={{ hidden:{opacity:0,y:16}, show:{opacity:1,y:0,transition:{duration:.55}} }}
        className="text-left"
      >
        {/* Circular photo above the name */}
        <div className="mb-5 md:mb-6 floaty">
          <div className="relative inline-block">
            {/* soft glow */}
            <span className="absolute inset-0 rounded-full blur-xl opacity-30 bg-gradient-to-tr from-purple-500 to-cyan-400" />
            {/* gradient ring */}
            <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-400 to-cyan-400">
              <img
                src={DRIVE_PRIMARY}
                alt="Rwitapa Mitra"
                referrerPolicy="no-referrer"
                className="h-28 w-28 md:h-36 md:w-36 rounded-full object-cover ring-1 ring-white/10 bg-gray-900"
                onError={(e) => {
                  if (e.currentTarget.src !== DRIVE_BACKUP) e.currentTarget.src = DRIVE_BACKUP;
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-white">Rwitapa Mitra</h3>
        <p className="text-gray-300 text-base md:text-lg mt-3 max-w-xl">
          Former Director of Analytics at Pilgrim with prior roles at PharmEasy, Flipkart, and Mu Sigma.
          Builds analytics systems that move KPIs across growth, retention, supply chain, experimentation,
          and practical GenAI automation.
        </p>

        <motion.button
          onClick={handleExploreCourses}
          className="mt-7 inline-flex items-center justify-center px-6 md:px-8 py-3 text-base md:text-lg font-semibold rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-transform duration-200 shadow-xl shadow-purple-600/20 ring-1 ring-white/10"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Learn The AI Way
        </motion.button>
      </motion.div>

      {/* RIGHT: credentials */}
      <motion.div
        variants={{ hidden:{opacity:0,y:16}, show:{opacity:1,y:0,transition:{duration:.55}} }}
        className="text-left md:pl-6 relative"
      >
        {/* animated divider on the left for desktop */}
        <span
          aria-hidden
          className="hidden md:block absolute left-0 top-0 h-full w-px animated-divider rounded-full"
        />
        <motion.ul
          className="text-gray-300 text-base md:text-lg space-y-3"
          variants={{ hidden:{opacity:1}, show:{opacity:1,transition:{staggerChildren:.06}} }}
        >
          {[
            "9+ years solving core business problems across growth, retention, supply chain, and P&L ownership.",
            "Scaled high-growth startups by turning analytics into action with measurable outcomes.",
            "Winner of PharmEasy’s ₹5 lakh hackathon for building trust in Generics.",
            "Youngest and only female panelist at Bharat Gen AI & Analytics Summit.",
            "Mentor at Google’s Agentic AI Hackathon and Open Source Connect India 2025.",
            "Founder of The AI Way, a learning community for practical GenAI in analytics."
          ].map((t, i) => (
            <motion.li
              key={i}
              className="flex"
              variants={{ hidden:{opacity:0,y:10}, show:{opacity:1,y:0,transition:{duration:.45}} }}
            >
              <span className="text-purple-400 font-semibold mr-2">•</span>
              <span>{t}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  </div>
</motion.section>

      {/* VII. Testimonials */}
      <section ref={sectionRefs.testimonials} className="py-16 md:py-24 bg-gray-900 rounded-t-[50px] md:rounded-t-[100px] shadow-inner-xl">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">What Our Students Are Saying</h2>
          
          <div className="flex flex-col md:flex-row gap-8 overflow-x-auto carousel-snap pb-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-left transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <p className="italic text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} className="rounded-full mr-4" />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIII. FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Got Questions?</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
            Quick answers to your AI automation questions.
          </p>
          <div className="text-left space-y-4 overflow-y-auto max-h-96 pr-4 custom-scrollbar">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFaq(index)}>
                  <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                  <Icon name="arrow-right" size={24} className={`text-purple-500 transform transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`} />
                </div>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${openFaq === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-400 pt-2">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-900 to-gray-900 text-center">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Stop Being the Report Generator. Start Being the ROI Generator.</h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-8">
            AI isn't the future. It's already here. Analysts who adapt will lead. Join The AI Way to automate your work, prove impact, and become the analyst your team looks up to.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <button onClick={() => scrollToSection('courses')} className="py-3 px-8 text-lg font-semibold rounded-full bg-white text-gray-950 hover:bg-gray-200 transition-colors transform hover:scale-105">
              View all our courses
            </button>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="bg-gray-950 text-gray-200 font-sans leading-relaxed tracking-wide antialiased overflow-x-hidden">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }

        .animate-pulse-slow-reverse {
          animation: pulse-slow 10s ease-in-out infinite reverse;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        /* Custom scrollbar for testimonial carousel */
        .carousel-snap::-webkit-scrollbar {
          height: 8px;
        }

        .carousel-snap::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .carousel-snap::-webkit-scrollbar-thumb {
          background: #4A0E70; /* A darker purple */
          border-radius: 10px;
        }

        .carousel-snap {
          scroll-snap-type: x mandatory;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .carousel-snap > * {
          scroll-snap-align: center;
          flex-shrink: 0;
          width: 85%; /* Adjust width for mobile */
        }

        @media (min-width: 768px) {
          .carousel-snap > * {
            width: 30%; /* Adjust width for desktop */
          }
        }
        
        /* Custom scrollbar for FAQ section */
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #111;
            border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4A0E70;
            border-radius: 10px;
        }
        `}
      </style>

      {/* Navigation Header */}
      <header className="fixed top-0 z-40 w-full backdrop-blur-md bg-gray-950/70 py-4 px-6 md:px-12 rounded-b-xl shadow-lg">
        <nav className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#" onClick={() => setShowCoursesPage(false)} className="text-xl font-bold text-white rounded-lg hover:text-purple-400 transition-colors">The AI Way</a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map(section => (
              <button key={section.ref} onClick={() => {
                if (showCoursesPage) {
                  setShowCoursesPage(false);
                  setTimeout(() => scrollToSection(section.ref), 0);
                } else {
                  scrollToSection(section.ref);
                }
              }} className="text-sm font-semibold hover:text-purple-400 transition-colors rounded-lg px-2 py-1">
                {section.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <Icon name={isMenuOpen ? 'x' : 'menu'} size={28} className="text-white" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-gray-950/90 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 pt-16 rounded-b-lg">
            {sections.map(section => (
              <button key={section.ref} onClick={() => {
                if (showCoursesPage) {
                  setShowCoursesPage(false);
                  setTimeout(() => scrollToSection(section.ref), 0);
                } else {
                  scrollToSection(section.ref);
                }
              }} className="text-2xl font-semibold text-white hover:text-purple-400 transition-colors">
                {section.name}
              </button>
            ))}
            <button onClick={handleExploreCourses} className="mt-8 w-64 py-3 px-6 text-lg font-semibold rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors">
              Explore All Courses
            </button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-64 text-center py-3 px-6 text-lg font-semibold rounded-full bg-[#0A472E] text-white hover:bg-[#0D573A] transition-colors">
                Join Community
              </a>
          </div>
        )}
      </header>
      
      {/* Main Content Area */}
      <main className="pt-24 md:pt-32">
        {currentPageComponent}
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-bold text-white">The AI Way</h4>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/company/the-ai-way/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2">
                <Icon name="linkedin" size={24} />
              </a>
              <a href="https://www.instagram.com/theaiway.official/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2">
                <Icon name="instagram" size={24} />
              </a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            &copy; 2025 The AI Way. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
