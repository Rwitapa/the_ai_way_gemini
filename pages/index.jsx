import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// --- CONSTANTS & UTILS ---

// Icon component to render various SVG icons used throughout the page
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
const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/D8xghzQNPWe1jaHH4T6hM5";

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

const getNextAlternateWeekend = () => {
  const now = new Date();
  const today = now.getDay();
  const daysUntilSaturday = (6 - today + 7) % 7;
  const nextSaturday = new Date(now);
  nextSaturday.setDate(now.getDate() + daysUntilSaturday);
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
const personas = [
    {
      icon: 'user',
      text: 'Analysts (0-8 yrs) stuck in repetitive reporting.'
    },
    {
      icon: 'book',
      text: 'BI/Product/Data Analysts drowning in tools.'
    },
    {
      icon: 'rocket',
      text: 'Managers who want teams to deliver decisions.'
    },
    {
      icon: 'user-check',
      text: 'Professionals chasing promotions and influence.'
    }
];
const whatYouLearnItems = [
    {
      icon: 'square-check',
      title: 'Automate the boring stuff',
      description: 'Free yourself from endless Excel updates and manual dashboards.'
    },
    {
      icon: 'bolt',
      title: 'AI fundamentals made practical',
      description: 'Learn prompt engineering and agentic workflows through real business use cases.'
    },
    {
      icon: 'check-circle',
      title: 'Outcomes, not just concepts',
      description: 'Graduate with SQL queries, no-code flows, and prompt libraries that actually work.'
    },
    {
      icon: 'bar-chart',
      title: 'Build credibility fast',
      description: 'Use impact memos and automations as portfolio proof that hiring managers respect.'
    }
];
const sections = [
    { name: 'Courses', ref: 'courses' },
    { name: 'Mentors', ref: 'mentors' },
    { name: 'Testimonials', ref: 'testimonials' },
];

// --- REFACTORED COMPONENTS ---

const Header = ({ scrollToSection, setShowCoursesPage, setIsMenuOpen }) => {
  const menuButtonRef = useRef(null);

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-gray-950/70 py-3 px-6 md:px-12 rounded-b-xl shadow-lg">
      <nav className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCoursesPage(false); window.scrollTo(0, 0); }} className="text-xl font-bold text-white rounded-lg hover:text-purple-400 transition-colors">The AI Way</a>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {sections.map(section => (
            <button key={section.ref} onClick={() => scrollToSection(section.ref)} className="text-sm font-semibold hover:text-purple-400 transition-colors rounded-lg px-2 py-1">
              {section.name}
            </button>
          ))}
          <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold bg-[#0A472E] text-white hover:bg-[#0D573A] transition-colors px-4 py-2 rounded-full">
            Join Community
          </a>
        </div>
        <div className="md:hidden">
          <button ref={menuButtonRef} onClick={() => setIsMenuOpen(true)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" aria-label="Open menu">
            <Icon name={'menu'} size={28} className="text-white" />
          </button>
        </div>
      </nav>
    </header>
  );
};

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => (
  <AnimatePresence>
    {isMenuOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-lg flex flex-col items-center justify-center p-6"
      >
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" aria-label="Close menu">
          <Icon name="x" size={32} className="text-white" />
        </button>
        <div className="flex flex-col items-center space-y-8 text-center">
          {sections.map(section => (
            <button key={section.ref} onClick={() => scrollToSection(section.ref)} className="text-3xl font-semibold text-white hover:text-purple-400 transition-colors">
              {section.name}
            </button>
          ))}
          <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-white hover:text-purple-400 transition-colors">
            Join Community
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const HeroSection = ({ handleExploreCourses }) => {
    const heroAnimationRef = useRef(null);

    useEffect(() => {
        let animationFrameId;
        let renderer;
        let scene;
        let camera;
        let particles;
        let lines;
        let points = [];
        let isInitialized = false;

        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.async = true;
        
        script.onerror = () => {
            console.error("Failed to load the three.js script. Hero animation will not run.");
        };
        
        const init = () => {
            if (isInitialized) return;
            const container = heroAnimationRef.current;
            if (!container || typeof THREE === 'undefined') return;
            
            isInitialized = true;
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 4000);
            camera.position.z = 1000;
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);
            
            points = [];
            for (let i = 0; i < 150; i++) {
                const point = new THREE.Vector3(
                    (Math.random() - 0.5) * 2000,
                    (Math.random() - 0.5) * 2000,
                    (Math.random() - 0.5) * 2000
                );
                point.velocity = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.5
                );
                points.push(point);
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.PointsMaterial({ color: 0x8A2BE2, size: 4, transparent: true, opacity: 0.7 });
            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            const lineGeometry = new THREE.BufferGeometry();
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
            lines = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(lines);

            window.addEventListener('resize', onWindowResize);
            animate();
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            try {
                if (!particles || !lines || !renderer || !scene || !camera) return;
                const positions = particles.geometry.attributes.position.array;
                const linePositions = [];
                for (let i = 0; i < points.length; i++) {
                    const p = points[i];
                    p.add(p.velocity);
                    if (p.x < -1000 || p.x > 1000) p.velocity.x *= -1;
                    if (p.y < -1000 || p.y > 1000) p.velocity.y *= -1;
                    if (p.z < -1000 || p.z > 1000) p.velocity.z *= -1;
                    positions[i * 3] = p.x;
                    positions[i * 3 + 1] = p.y;
                    positions[i * 3 + 2] = p.z;
                }
                for (let i = 0; i < points.length; i++) {
                    for (let j = i + 1; j < points.length; j++) {
                        const p1 = points[i];
                        const p2 = points[j];
                        const dist = p1.distanceTo(p2);
                        if (dist < 150) {
                            linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
                        }
                    }
                }
                lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
                particles.geometry.attributes.position.needsUpdate = true;
                renderer.render(scene, camera);
            } catch (error) {
                console.error("Error in hero animation loop:", error);
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
        };

        const onWindowResize = () => {
            const container = heroAnimationRef.current;
            if (!camera || !renderer || !container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        
        script.onload = init;
        document.body.appendChild(script);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', onWindowResize);
            const container = heroAnimationRef.current;
            if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <section className="relative overflow-hidden min-h-screen py-20 flex items-center bg-gray-950">
            <div ref={heroAnimationRef} className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="absolute inset-0 z-10 bg-gray-950/70"></div>
            <div className="relative z-20 container mx-auto px-6 text-center max-w-5xl animate-fade-in">
                <div className="mb-6">
                    <span className="inline-block py-1 px-4 rounded-full text-sm font-semibold text-purple-200 bg-purple-900/60 backdrop-blur-sm">Gen AI for Business Analysts</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                    Still stuck fixing reports?
                    <span className="block text-purple-400 mt-2">Be your team’s hero with AI.</span>
                </h1>
                <p className="text-base md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                    If manual reporting eats your day, fix it. Launch an AI KPI agent that keeps data fresh, flags anomalies, and sends insights with next steps to Slack or email.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <motion.button onClick={handleExploreCourses} className="w-full sm:w-auto py-3 px-8 text-base font-semibold rounded-full bg-purple-600 text-white shadow-xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Explore All Courses
                    </motion.button>
                    <motion.a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto py-3 px-8 text-base font-semibold rounded-full bg-[#0A472E] text-white" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Join Community
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

const PersonasSection = () => (
    <section className="py-16 md:py-20 bg-gray-950 animate-on-scroll">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">This Is For You If...</h2>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
                You're ambitious, practical, and tired of being seen as a "report generator." You want clarity, speed, and visibility.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {personas.map((persona, index) => (
                    <motion.div key={index} className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left flex items-center space-x-4 transition-all duration-300 animate-on-scroll" whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)', boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                        <Icon name={persona.icon} size={28} className="text-purple-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-gray-300 font-medium text-base">{persona.text}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const CoursesSection = ({ sectionRef, handleExploreCourses }) => (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gray-900 rounded-t-[50px] md:rounded-t-[100px] shadow-inner-xl animate-on-scroll">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Choose Your Path to Impact</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                    Report generator → ROI generator.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div className="bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-800 flex flex-col justify-between" whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }}>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{courseData.sprint.title}</h3>
                        <p className="text-lg text-gray-400 mb-4">{courseData.sprint.subtitle}</p>
                        <p className="text-gray-300 mb-6 text-base">{courseData.sprint.description}</p>
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Next Cohort</h4>
                            <p className="text-white text-base">{getNextDayOfWeek([1, 3, 5])}, 7-10 PM IST</p>
                        </div>
                        <ul className="text-gray-400 space-y-2 mb-6 text-sm">
                            <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-500 mr-2 mt-1 flex-shrink-0" /><span>Learn to spot repetitive reports that eat your time.</span></li>
                            <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-500 mr-2 mt-1 flex-shrink-0" /><span>Automate a high-value report using SQL or no-code.</span></li>
                            <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-500 mr-2 mt-1 flex-shrink-0" /><span>Package your win into an Impact Memo.</span></li>
                        </ul>
                        <p className="text-white font-bold text-2xl mb-6">{courseData.sprint.price}</p>
                    </div>
                    <motion.a href={RAZORPAY_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Enroll Now
                    </motion.a>
                </motion.div>
                <motion.div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-3xl p-6 md:p-8 border border-purple-700 flex flex-col justify-between relative" whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }} transition={{ type: 'spring', stiffness: 300 }}>
                    <div className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1 bg-yellow-500 text-black font-bold rounded-full text-sm">Popular</div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{courseData.accelerator.title}</h3>
                        <p className="text-lg text-gray-300 mb-4">{courseData.accelerator.subtitle}</p>
                        <p className="text-gray-200 mb-6 text-base">{courseData.accelerator.description}</p>
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Next Cohort</h4>
                            <p className="text-white text-base">{getNextAlternateWeekend()}, 10 AM - 7 PM IST</p>
                        </div>
                        <ul className="text-gray-200 space-y-2 mb-6 text-sm">
                            <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-300 mr-2 mt-1 flex-shrink-0" /><span>Master fundamentals without the fluff.</span></li>
                            <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-300 mr-2 mt-1 flex-shrink-0" /><span>Design and deploy AI agents for reporting, funnels, and alerts.</span></li>
                            <li className="flex items-start"><Icon name="check-circle" size={16} className="text-purple-300 mr-2 mt-1 flex-shrink-0" /><span>Build a portfolio case study that proves ROI.</span></li>
                        </ul>
                        <p className="text-white font-bold text-2xl mb-6">{courseData.accelerator.price}</p>
                    </div>
                    <motion.a href={SUPERSTAR_ACCELERATOR_URL} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full py-3 px-6 text-center rounded-full bg-white text-gray-950 font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Enroll Now
                    </motion.a>
                </motion.div>
            </div>
            <div className="text-center mt-12">
                <motion.button onClick={handleExploreCourses} className="py-3 px-8 text-lg font-semibold rounded-full bg-purple-600 text-white shadow-xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Explore All Courses
                </motion.button>
            </div>
        </div>
    </section>
);

const MentorSection = ({ sectionRef }) => (
    <motion.section ref={sectionRef} className="py-16 md:py-20 bg-gray-950" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
        <div className="container mx-auto px-6">
            <motion.div className="text-center mb-12" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">Learn from a Proven Industry Leader</h2>
            </motion.div>
            <motion.div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-purple-800/40 p-8 md:p-12 shadow-2xl shadow-purple-900/20" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } }} whileHover={{ y: -5, scale: 1.01, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                    <div className="md:col-span-1 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-green-500 blur-xl opacity-50" />
                              <div className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-gray-900 bg-gray-800">
                                <img
                                  src="/Rwitapa.png"
                                  alt="Rwitapa Mitra"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Rwitapa Mitra</h3>
                        <p className="text-purple-300 font-medium mt-2">
                            <span className="block">Director - Analytics</span>
                            <span className="block text-sm">9+ years at Flipkart, PharmEasy, Mu Sigma & Pilgrim</span>
                        </p>
                        <div className="flex justify-center md:justify-start gap-3 mt-4 mb-5">
                            <span className="text-xs font-bold uppercase tracking-wider bg-purple-900/80 text-purple-200 px-3 py-1 rounded-full">Director-Level Experience</span>
                            <span className="text-xs font-bold uppercase tracking-wider bg-purple-900/80 text-purple-200 px-3 py-1 rounded-full">Billion-Dollar Impact</span>
                        </div>
                        <p className="text-gray-400 text-base">Your instructor has walked the path you're on. Rwitapa transformed from a curious analyst to Director of Analytics at India's top companies. She has scaled high-growth startups by turning analytics into action with measurable outcomes, won PharmEasy’s hackathon, and is a mentor at Google’s Agentic AI Hackathon.</p>
                        <p className="text-gray-400 text-base mt-3"><strong>Real Results:</strong> She has revolutionized supply chains (25% efficiency gains), transformed underperforming teams into profit centers (85% YoY improvement), and built industry-leading data platforms. Now she's teaching the exact playbooks that accelerated her career and will accelerate yours.</p>
                        <motion.a href="https://www.linkedin.com/in/rwitapa-mitra-3b43a999/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold rounded-full bg-gray-800 text-white shadow-lg ring-1 ring-white/10 hover:bg-gray-700" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Icon name="linkedin" size={18} className="mr-2" /> LinkedIn
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </div>
    </motion.section>
);

const TestimonialCarousel = ({ sectionRef }) => {
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    const handleNextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    const handlePrevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    useEffect(() => {
        const timer = setInterval(handleNextTestimonial, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <section ref={sectionRef} className="relative py-16 md:py-20 bg-gray-900 rounded-t-[50px] md:rounded-t-[100px] shadow-inner-xl overflow-hidden animate-on-scroll">
            <div className="animated-testimonials-bg" aria-hidden="true" />
            <div className="relative z-10 container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">What Our Students Are Saying</h2>
                <div className="relative flex flex-col items-center justify-center min-h-[400px]">
                    <AnimatePresence>
                        {testimonials.map((testimonial, index) => {
                            const position = index - testimonialIndex;
                            if (Math.abs(position) >= 3) return null;
                            return (
                                <motion.div key={index} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 absolute w-[90%] md:w-[60%] lg:w-[45%]" initial={{ scale: 1 - Math.abs(position) * 0.1, y: position * 20, zIndex: testimonials.length - Math.abs(position), opacity: 1 }} animate={{ scale: 1 - Math.abs(position) * 0.05, y: position * 15, zIndex: testimonials.length - Math.abs(position), opacity: 1 }} exit={{ x: 300, opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ transformOrigin: 'bottom center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                                    <p className="italic text-gray-300 mb-4 text-base">"{testimonial.quote}"</p>
                                    <div className="flex items-center">
                                        <img src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} className="rounded-full mr-4 h-12 w-12" />
                                        <div>
                                            <p className="font-semibold text-white">{testimonial.name}</p>
                                            <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                    <div className="absolute bottom-[-30px] flex items-center justify-center w-full z-40">
                        <button onClick={handlePrevTestimonial} aria-label="Previous testimonial" className="bg-purple-600/50 hover:bg-purple-600 text-white rounded-full p-3 transition-colors mx-2 backdrop-blur-sm"><Icon name="arrow-left" size={20} /></button>
                        <div className="text-gray-400 text-sm font-semibold px-4 py-2 bg-gray-900/50 rounded-full backdrop-blur-sm">{testimonialIndex + 1} / {testimonials.length}</div>
                        <button onClick={handleNextTestimonial} aria-label="Next testimonial" className="bg-purple-600/50 hover:bg-purple-600 text-white rounded-full p-3 transition-colors mx-2 backdrop-blur-sm"><Icon name="arrow-right" size={20} /></button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const WhatYouLearnSection = ({ sectionRef }) => (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gray-950 animate-on-scroll overflow-hidden">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-base md:text-lg font-bold uppercase tracking-wider text-purple-400 mb-2">What You’ll Learn</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">From Repetition to ROI</h3>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">Learn how to free yourself from manual tasks and build credibility fast.</p>
            <div className="flex flex-nowrap overflow-x-auto gap-6 pb-6 -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {whatYouLearnItems.map((item, index) => (
                    <motion.div key={index} className="group relative flex-shrink-0 w-64 bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left overflow-hidden transition-all duration-300 animate-on-scroll" whileHover={{ y: -5, boxShadow: '0 0 25px rgba(168, 85, 247, 0.25)' }} transition={{ type: 'spring', stiffness: 300 }}>
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon name={item.icon} size={28} className="text-purple-500 mb-4" />
                        <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const FAQSection = () => {
    const [openFaq, setOpenFaq] = useState(null);
    return (
        <section className="py-16 md:py-20 bg-gray-950 animate-on-scroll">
            <div className="container mx-auto px-6 text-center max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Got Questions?</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">Quick answers to your AI automation questions.</p>
                <div className="text-left space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                    {faqs.map((faq, index) => (
                        <div key={index} className="rounded-2xl border border-gray-800 bg-gray-950 overflow-hidden">
                            <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                                <motion.div animate={{ rotate: openFaq === index ? 90 : 0 }}><Icon name="arrow-right" size={24} className="text-purple-500" /></motion.div>
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                        <p className="text-gray-400 px-6 pb-6">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FinalCTASection = ({ scrollToSection }) => (
    <section className="py-16 md:py-20 bg-gradient-to-br from-purple-900 to-gray-900 text-center animate-on-scroll">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Report generator → ROI generator.</h2>
            <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto mb-8">AI isn't the future. It's already here. Analysts who adapt will lead. Join The AI Way to automate your work, prove impact, and become the analyst your team looks up to.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button onClick={() => scrollToSection('courses')} className="w-full sm:w-auto py-3 px-8 text-lg font-semibold rounded-full bg-white text-gray-950" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    View all our courses
                </motion.button>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-950 py-10 border-t border-gray-800">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <h4 className="text-xl font-bold text-white">The AI Way</h4>
                </div>
                <div className="flex space-x-6">
                    <a href="https://www.linkedin.com/company/the-ai-way/?viewAsMember=true" aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2"><Icon name="linkedin" size={24} /></a>
                    <a href="https://www.instagram.com/theaiway.official/" aria-label="Instagram Profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2"><Icon name="instagram" size={24} /></a>
                </div>
            </div>
            <div className="text-center text-gray-500 text-sm">&copy; 2025 The AI Way. All Rights Reserved.</div>
        </div>
    </footer>
);

const CoursesPage = ({ onBack }) => {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (courseTitle, moduleTitle) => {
    const identifier = `${courseTitle}-${moduleTitle}`;
    setOpenModule(openModule === identifier ? null : identifier);
  };
  
  const CourseDetailCard = ({ course, isPopular = false, paymentUrl }) => (
    <motion.div 
      className={`bg-gray-900 rounded-3xl p-6 md:p-8 border ${isPopular ? 'border-purple-700' : 'border-gray-800'} mb-12`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold text-white mb-2">{course.title}</h2>
          {isPopular && (
            <span className="inline-block bg-yellow-500 text-black font-bold text-xs px-3 py-1 rounded-full mb-4">
              Popular
            </span>
          )}
          <p className="text-lg text-gray-400 mb-4">{course.subtitle}</p>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-1">Price</h4>
              <p className="text-white text-2xl font-bold">{course.price}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-1">Next Cohort</h4>
              <p className="text-white text-base">
                {course.title === '3-Hour Champion Sprint' ? `${getNextDayOfWeek([1, 3, 5])}, 7-10 PM IST` : `${getNextAlternateWeekend()}, 10 AM - 7 PM IST`}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Tools Covered</h4>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((tool, index) => (
                  <span key={index} className="bg-gray-800 text-gray-400 text-xs font-medium px-2.5 py-1 rounded-full">{tool}</span>
                ))}
              </div>
            </div>
          </div>
          <motion.a 
            href={paymentUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-8 w-full block py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enroll Now
          </motion.a>
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-300 mb-6">{course.description}</p>
          <h3 className="text-xl font-bold text-white mb-2">Course Modules</h3>
          <div className="border-t border-gray-700">
            {course.modules.map((module, index) => (
              <div key={index} className="border-b border-gray-700 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleModule(course.title, module.title)}
                >
                  <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                  <Icon
                    name="arrow-left"
                    size={24}
                    className={`text-purple-500 transform transition-transform duration-300 ${openModule === `${course.title}-${module.title}` ? '-rotate-90' : 'rotate-180'}`}
                    strokeWidth={1.5}
                  />
                </div>
                <AnimatePresence>
                  {openModule === `${course.title}-${module.title}` && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-gray-400 overflow-hidden"
                    >
                      {module.summary}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 bg-gray-950">
      <div className="container mx-auto px-6 md:px-12">
        <button onClick={onBack} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8">
          <Icon name="arrow-left" size={20} className="mr-2" /> Back to Home
        </button>
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Courses</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Discover a learning path that turns you into a high-impact, AI-driven business analyst.
          </p>
        </div>
        <CourseDetailCard course={courseData.sprint} paymentUrl={RAZORPAY_PAYMENT_URL} />
        <CourseDetailCard course={courseData.accelerator} isPopular={true} paymentUrl={SUPERSTAR_ACCELERATOR_URL} />
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showCoursesPage, setShowCoursesPage] = useState(false);

    const sectionRefs = {
        courses: useRef(null),
        whatYouGet: useRef(null),
        mentors: useRef(null),
        testimonials: useRef(null),
    };

    useEffect(() => {
        document.title = "The AI Way";
    }, []);

    useEffect(() => {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        if (!scrollElements.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        scrollElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [showCoursesPage]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const handleExploreCourses = () => {
        setShowCoursesPage(true);
        window.scrollTo(0, 0);
    };

    const scrollToSection = (sectionName) => {
        if (showCoursesPage) {
            setShowCoursesPage(false);
            setTimeout(() => {
                sectionRefs[sectionName]?.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            sectionRefs[sectionName]?.current?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const mainPageComponent = (
        <>
            <HeroSection handleExploreCourses={handleExploreCourses} />
            <PersonasSection />
            <CoursesSection sectionRef={sectionRefs.courses} handleExploreCourses={handleExploreCourses} />
            <MentorSection sectionRef={sectionRefs.mentors} />
            <TestimonialCarousel sectionRef={sectionRefs.testimonials} />
            <WhatYouLearnSection sectionRef={sectionRefs.whatYouGet} />
            <FAQSection />
            <FinalCTASection scrollToSection={scrollToSection} />
        </>
    );

    return (
        <div className="bg-gray-950 text-gray-200 font-sans leading-relaxed tracking-wide antialiased overflow-x-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                html, body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
                body { font-family: 'Inter', sans-serif; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 1s ease-out; }
                .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
                .animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
                .animated-testimonials-bg { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 150%; padding-top: 150%; background-image: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 50%); animation: rotate-background 30s linear infinite; z-index: 0; }
                @keyframes rotate-background { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #4a0e70; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #5e118f; }
            `}</style>

            <Header scrollToSection={scrollToSection} setShowCoursesPage={setShowCoursesPage} setIsMenuOpen={setIsMenuOpen} />
            <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} />
            
            <main className="pt-16 md:pt-20">
                {showCoursesPage ? <CoursesPage onBack={() => setShowCoursesPage(false)} /> : mainPageComponent}
            </main>

            <Footer />
        </div>
    );
};

export default App;

