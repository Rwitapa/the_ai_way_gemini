import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Image from "next/image";

// --- CONSTANTS & UTILS ---

const RAZORPAY_PAYMENT_URL = 'https://pages.razorpay.com/pl_REQlevt3yir34I/view';
const SUPERSTAR_ACCELERATOR_URL = 'https://rzp.io/rzp/ubyT3MWl';
const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/D8xghzQNPWe1jaHH4T6hM5";

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
    ),
    'award': (
       <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
    ),
    'clock': (
       <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
     'bar-chart-2': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    ),
    'shield-check': (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
    ),
    'clipboard-check': (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></svg>
    ),
    'compass': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    'plus': (
       <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    )
  };
  return icons[name] || null;
};

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
    mascot: 'champion',
    title: '3-Hour Champion Sprint',
    subtitle: 'Ship Your First KPI Automation in Just 3 Hours',
    description: 'Stop spending hours on manual reports. This focused, hands-on sprint will teach you how to identify a high-value KPI and build your first live automation in just three hours. You’ll walk away with a working workflow and a proof memo you can show to your manager or in an interview.',
    price: '₹349',
    originalPrice: '₹1,049',
    bonus: '+ Free resources worth ₹699',
    level: 'Beginner Friendly',
    duration: '3 Hours',
    guarantee: 'Project Completion Guarantee',
    keyOutcomes: [
        { icon: 'bolt', text: 'Automate one high-value report' },
        { icon: 'file-text', text: 'Create a professional Impact Memo' },
        { icon: 'tool', text: 'Master no-code automation tools' },
    ],
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
    mascot: 'accelerator',
    title: '16-Hour Superstar Accelerator',
    subtitle: 'Go Beyond Dashboards. Build AI Agents That Deliver Insights.',
    description: 'This is not another theory-heavy course. The Accelerator gives you the skills to design and deploy end-to-end agentic AI systems—pipelines that pull data, analyze it, and deliver answers where people work. You will learn to build, test, and package real-world solutions that showcase your expertise.',
    price: '₹4,999',
    originalPrice: '₹10,999',
    bonus: '+ Free Resources worth ₹5,999',
    level: 'Intermediate',
    duration: '16 Hours (2 Weekends)',
    guarantee: 'Portfolio Project Guarantee',
    keyOutcomes: [
        { icon: 'rocket', text: 'Deploy an end-to-end AI agent' },
        { icon: 'git-fork', text: 'Build a RAG knowledge assistant' },
        { icon: 'bar-chart', text: 'Create a portfolio-grade case study' },
    ],
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
      q: "How is this different from other AI courses?",
      a: "We focus on deployment, not just demos. Unlike theory-heavy courses, you will ship real-world automations and build tangible portfolio assets (like impact memos and deployed agents) that hiring managers respect. We teach the 'how,' not just the 'what.'"
    },
    {
      q: "I don't know how to code. Can I still take these courses?",
      a: "Absolutely. Both courses are tech-agnostic. Every single concept is taught using both code (SQL/Python) and no-code tools (n8n/Make). You can choose the path that best fits your skills and goals. The focus is on the outcome, not the tool."
    },
    {
      q: "Will I get a job after this? What's the career support?",
      a: "While we don't offer a direct placement guarantee, the entire curriculum is designed to make you highly employable. You'll graduate with a portfolio of real work, impact memos proving your ROI, and the confidence to nail interviews. You also get lifetime access to our community for networking and support."
    },
    {
      q: "What's the difference between the Sprint and the Accelerator?",
      a: "The Sprint is a 3-hour focused workshop to give you a quick, tangible win by automating one report. The Accelerator is a 16-hour deep dive where you'll build and deploy complex, end-to-end AI agentic systems. If you want a quick start, choose the Sprint. If you want to transform your career, choose the Accelerator."
    },
    {
      q: "Why are there no recordings?",
      a: "The AI landscape changes weekly. Pre-recorded content goes stale fast. Our live, hands-on sessions ensure you are always learning the most current, relevant tools and techniques that are working in the industry right now."
    },
    {
      q: "I'm a manager, not an analyst. Is this for me?",
      a: "Yes. Many managers take our courses to understand what's possible with AI and automation so they can lead their teams more effectively. You'll learn how to scope AI projects, measure their ROI, and guide your team to deliver high-impact results instead of just dashboards."
    },
    {
      q: "How can I contact support?",
      a: "You can reach out to our support team anytime by emailing theaiway.official@gmail.com. We're happy to help with any questions you might have!"
    }
];
const testimonials = [
    {
      quote: "Before this, I spent 6-8 hours every week on reports. After the Sprint, I automated them in a single evening. My manager noticed immediately, and I finally felt like my work mattered.",
      name: "Akshay Sharma",
      role: "Business Analyst",
      company: "Swiggy",
      avatar: "/people/akshay.png"
    },
    {
      quote: "The hands-on projects gave me a portfolio I could immediately show in interviews. I landed my dream job because of these skills. It was a game-changer for my career.",
      name: "Priya Singh",
      role: "BI Analyst",
      company: "Razorpay",
      avatar: "/people/priya.png"
    },
    {
      quote: "Finally, a course that focuses on real-world outcomes. The content is directly applicable and has made me a more strategic asset to my company, saving us countless hours.",
      name: "Rahul Kumar",
      role: "Product Manager",
      company: "Zomato",
      avatar: "/people/rahul.png"
    },
    {
      quote: "I was overwhelmed by all the new AI tools. The AI Way gave me a clear, step-by-step methodology to start shipping real results. It's the most practical training I've ever had.",
      name: "Sneha Patel",
      role: "Data Analyst",
      company: "Fintech Co.",
      avatar: "/people/sneha.png"
    },
    {
      quote: "I've been able to tie my work directly to our team's ROI. The lessons on building impact memos were invaluable. This course is a must for any analyst looking to get noticed.",
      name: "Aman Gupta",
      role: "Analytics Manager",
      company: "Retail Inc.",
      avatar: "/people/aman.png"
    },
];
const personas = [
    {
      icon: 'user',
      text: 'Early career Analysts stuck in repetitive reporting.'
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

// --- COMPONENTS ---

const Header = ({ scrollToSection, setShowCoursesPage, setIsMenuOpen }) => {
  const menuButtonRef = useRef(null);

  return (
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-gray-950/70 py-3 md:py-4 px-6 md:px-12 rounded-b-xl shadow-lg">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Brand */}
          <a
            href="#"
            aria-label="The AI Way — Home"
            onClick={(e) => { e.preventDefault(); setShowCoursesPage(false); window.scrollTo(0, 0); }}
            className="group flex items-center gap-3 md:gap-4"
          >
            <span className="relative block h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16">
              <img
                src="/brand/aiway-mark.png"
                alt="The AI Way logo"
                className="object-contain w-full h-full"
              />
            </span>

            {/* The AI Way — slightly larger now */}
            <span className="inline-block font-poppins-medium text-white leading-none tracking-tight text-[18px] md:text-[21px] lg:text-[22px]">
              The AI Way
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.ref}
                onClick={() => scrollToSection(section.ref)}
                className="text-[16px] md:text-[17px] font-semibold hover:text-purple-300 transition-colors rounded-lg px-3 py-2"
              >
                {section.name}
              </button>
            ))}
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[16px] md:text-[17px] font-semibold bg-[#0A472E] text-white hover:bg-[#0D573A] transition-colors px-5 py-2.5 rounded-full"
            >
              Join Community
            </a>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Open menu"
            >
              <Icon name="menu" size={30} className="text-white" />
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
            <button key={section.ref} onClick={() => { setIsMenuOpen(false); scrollToSection(section.ref); }} className="text-3xl font-semibold text-white hover:text-purple-400 transition-colors">
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


export const HeroSection = ({ handleExploreCourses }) => {
  return (
    <section className="relative overflow-hidden flex items-center bg-gray-950">
      {/* Background video: stronger + more vivid */}
      <video
        poster="/poster.png"
        className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-110 saturate-125"
        src="/animation_1.mp4"
        playsInline
        muted
        autoPlay
        loop
        preload="auto"
        aria-hidden="true"
      />
      {/* Softer overlay so video shows through more */}
      <div className="absolute inset-0 bg-gray-950/25" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 w-full">
        {/* keep hero tall so belt begins in next fold */}
        <div className="min-h-[86svh] md:min-h-[88vh] pt-24 md:pt-28 pb-10 md:pb-10 flex flex-col items-center justify-center text-center">
          <span className="inline-block py-1.5 px-5 rounded-full text-sm font-semibold text-purple-100 bg-purple-900/60 backdrop-blur-sm">
            Gen AI for Business Analysts
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white max-w-5xl">
            Still stuck fixing reports?
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100">
              Be your team’s hero with AI.
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-base md:text-xl text-gray-200">
            Launch an AI KPI agent that keeps data fresh, flags anomalies, and pushes insights to Slack or email.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={handleExploreCourses}
              className="w-full sm:w-auto py-3 px-8 text-base font-semibold rounded-full bg-purple-600 text-white shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now
            </motion.button>

            <motion.a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-8 text-base font-semibold rounded-full bg-[#0A472E] text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPANIES BELT (smaller logos, very light grey tiles) ---

function CompaniesBelt() {
  const LOGOS = [
    { name: 'Swiggy',    src: '/brand/swiggy.png'    },
    { name: 'Zoho',      src: '/brand/zoho.png'      },
    { name: 'Zomato',    src: '/brand/zomato.png'    },
    { name: 'Paytm',     src: '/brand/paytm.png'     },
    { name: 'Ola',       src: '/brand/ola.png'       },
    { name: 'Flipkart',  src: '/brand/flipkart_logo_256x96.png'  },
    { name: 'Razorpay',  src: '/brand/razorpay.png'  },
    { name: 'PharmEasy', src: '/brand/PharmEasy_logo (1).png' },
  ];

  const ITEMS = [...LOGOS, ...LOGOS];        // single seamless track
  const DURATION = "52s";                    // adjust speed here

  return (
    <section id="companies" className="relative w-full pt-8 md:pt-10 pb-6 md:pb-8">
      <h3 className="text-center text-white/90 font-semibold text-lg md:text-xl mb-5 md:mb-6">
        Our graduates work at leading tech companies
      </h3>

      <div className="relative overflow-hidden">
        {/* viewport with edge fade; no section-wide overlay */}
        <div className="marquee">
          <ul className="marquee__track" style={{ ["--dur"]: DURATION }}>
            {ITEMS.map((logo, i) => (
              <li key={`${logo.name}-${i}`} className="shrink-0">
                {/* Tile with per-tile grey overlay BEHIND the logo */}
                <div className="relative flex items-center justify-center rounded-xl ring-1 ring-black/6 shadow-sm bg-[#F3F4F6] w-[156px] md:w-[168px] h-[58px] md:h-[64px]">
                  <div className="absolute inset-0 rounded-xl bg-black/12 z-0 pointer-events-none" aria-hidden="true" />
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className={`relative z-10 w-auto object-contain ${
                      logo.name === "PharmEasy" ? "max-h-8 md:max-h-9" : "max-h-9 md:max-h-10"
                    }`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const PersonasSection = () => (
    <section className="pt-10 md:pt-16 pb-16 bg-gray-950 animate-on-scroll">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">This Is For You If...</h2>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
                You're ambitious, practical, and tired of being seen as a "report generator." You want clarity, speed, and visibility.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {personas.map((persona, index) => (
                    <motion.div key={index} className="group bg-gray-900 border border-gray-800 rounded-xl p-6 text-left flex items-center space-x-4 transition-all duration-300 animate-on-scroll" whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)', boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                        <Icon name={persona.icon} size={28} className="text-purple-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-gray-300 font-medium text-base">{persona.text}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

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
    }

    return (
        <section className="py-16 md:py-20 bg-gray-950">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="bg-gradient-to-br from-purple-900/40 via-gray-900 to-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl shadow-purple-900/20 max-w-4xl mx-auto border border-purple-800/60 relative"
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
                                <div className="flex justify-center items-center gap-3 mb-2">
                                  <Icon name="compass" size={32} className="text-purple-400" />
                                  <h3 className="text-2xl md:text-3xl font-bold text-white text-center">Not sure where to start?</h3>
                                </div>
                                <p className="text-gray-400 text-center mb-8">Answer these {questions.length} quick questions to find your perfect path.</p>
                                
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
                                <div className="absolute top-4 right-4 font-mono text-lg text-purple-400 bg-gray-950/50 px-3 py-1 rounded-full">
                                    {step + 1} / {questions.length}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

const CoursesSection = ({ sectionRef, handleExploreCourses }) => (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gray-900 animate-on-scroll">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                 <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <p className="text-green-400 font-semibold">Registrations are now open!</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Choose Your Path to Impact</h2>
                 <div className="mt-6 flex justify-center items-center gap-6 text-sm text-gray-300">
                    <span className="flex items-center gap-2"><Icon name="play-circle" size={18}/> ONLINE</span>
                    <span className="flex items-center gap-2"><Icon name="tool" size={18}/> HANDS-ON</span>
                    <span className="flex items-center gap-2"><Icon name="award" size={18}/> CERTIFICATE</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 flex flex-col justify-between" whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }}>
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
                        <div className="mb-6">
                            <p className="text-white font-bold text-2xl inline-block mr-3">{courseData.sprint.price}</p>
                            <p className="text-gray-400 line-through inline-block">{courseData.sprint.originalPrice}</p>
                            <p className="text-green-400 font-semibold text-sm mt-1">{courseData.sprint.bonus}</p>
                        </div>
                    </div>
                    <motion.a href={RAZORPAY_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Enroll Now
                    </motion.a>
                </motion.div>
                <motion.div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl p-6 md:p-8 border border-purple-700 flex flex-col justify-between relative" whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }} transition={{ type: 'spring', stiffness: 300 }}>
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
                         <div className="mb-6">
                            <p className="text-white font-bold text-2xl inline-block mr-3">{courseData.accelerator.price}</p>
                            <p className="text-gray-300 line-through inline-block">{courseData.accelerator.originalPrice}</p>
                            <p className="text-green-400 font-semibold text-sm mt-1">{courseData.accelerator.bonus}</p>
                        </div>
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
  <motion.section
    ref={sectionRef}
    className="py-16 md:py-20 bg-gray-950"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
  >
    <div className="container mx-auto px-6">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
          Learn from a Proven Industry Leader
        </h2>
      </motion.div>

      {/* Full-width card like other sections */}
      <motion.div
        className="w-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-purple-800/40 p-8 md:p-12 shadow-2xl shadow-purple-900/20"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
        }}
        whileHover={{ y: -5, scale: 1.01, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Avatar column */}
          <div className="md:col-span-1 flex justify-center">
            <div className="relative">
              {/* Gradient ring */}
              <div className="p-[6px] rounded-full bg-[conic-gradient(at_70%_30%,#8b5cf6,#22d3ee,#22c55e,#8b5cf6)]">
                {/* Solid inner circle; keep square to maintain perfect circle */}
                <div className="rounded-full overflow-hidden bg-[#0b1220] w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 aspect-square">
                  <img
                    src="/Rwitapa.png"
                    alt="Rwitapa Mitra"
                    className="block w-full h-full object-cover object-center scale-[1.04]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Rwitapa Mitra</h3>
            <p className="text-purple-300 font-medium mt-2">
              <span className="block">Director - Analytics</span>
              <span className="block text-sm">9+ years at Flipkart, PharmEasy, Mu Sigma &amp; Pilgrim</span>
            </p>

            {/* Badges (wrap on mobile, align left on desktop) */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider bg-purple-900/80 text-purple-200 px-3 py-1 rounded-full">
                Director-Level Experience
              </span>
              <span className="text-xs font-bold uppercase tracking-wider bg-purple-900/80 text-purple-200 px-3 py-1 rounded-full">
                Billion-Dollar Impact
              </span>
            </div>

            <p className="text-gray-400 text-base">
              Your instructor has walked the path you're on. Rwitapa transformed from a curious analyst to
              Director of Analytics at India's top companies. She has scaled high-growth startups by turning
              analytics into action with measurable outcomes, won PharmEasy’s hackathon, and is a mentor at
              Google’s Agentic AI Hackathon.
            </p>
            <p className="text-gray-400 text-base mt-3">
              <strong>Real Results:</strong> She has revolutionized supply chains (25% efficiency gains),
              transformed underperforming teams into profit centers (85% YoY improvement), and built
              industry-leading data platforms. Now she's teaching the exact playbooks that accelerated her
              career and will accelerate yours.
            </p>

            <motion.a
              href="https://www.linkedin.com/in/rwitapa-mitra-3b43a999/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold rounded-full bg-gray-800 text-white shadow-lg ring-1 ring-white/10 hover:bg-gray-700"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon name="linkedin" size={18} className="mr-2" /> LinkedIn
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

const TestimonialCard = ({ testimonial }) => (
    <div className="w-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-purple-800/20 p-6 shadow-2xl shadow-purple-900/20 mb-6">
        <p className="italic text-gray-300 mb-4 text-base">"{testimonial.quote}"</p>
        <div className="flex items-center">
             <img src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} className="rounded-full mr-4 h-12 w-12 object-cover" />
            <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
            </div>
        </div>
    </div>
);

const TestimonialsSection = ({ sectionRef }) => {
    const middleIndex = Math.ceil(testimonials.length / 2);
    const column1Testimonials = testimonials.slice(0, middleIndex);
    const column2Testimonials = testimonials.slice(middleIndex);

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-gray-900 overflow-hidden animate-on-scroll">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">What Our Students Are Saying</h2>
                <div className="relative h-[450px] overflow-hidden">
                    <div className="absolute inset-0 flex justify-center gap-6">
                        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-6 scrolling-column-up">
                            {[...column1Testimonials, ...column1Testimonials].map((testimonial, index) => (
                                <TestimonialCard key={`col1-${index}`} testimonial={testimonial} />
                            ))}
                        </div>
                        <div className="hidden md:flex w-full md:w-1/2 lg:w-1/3 flex-col space-y-6 scrolling-column-down">
                            {[...column2Testimonials, ...column2Testimonials].map((testimonial, index) => (
                                <TestimonialCard key={`col2-${index}`} testimonial={testimonial} />
                            ))}
                        </div>
                    </div>
                     <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-900 to-transparent"></div>
                     <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-gray-900 to-transparent"></div>
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
                    <motion.div key={index} className="group relative flex-shrink-0 w-64 bg-gray-900 border border-gray-800 rounded-xl p-6 text-left overflow-hidden transition-all duration-300 animate-on-scroll" whileHover={{ y: -5, boxShadow: '0 0 25px rgba(168, 85, 247, 0.25)' }} transition={{ type: 'spring', stiffness: 300 }}>
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
        <section className="relative py-16 md:py-20 animate-on-scroll overflow-hidden">
            <video
                className="absolute inset-0 h-full w-full object-cover brightness-50"
                src="/faq.mp4"
                playsInline
                muted
                autoPlay
                loop
                preload="auto"
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gray-950/50" aria-hidden="true" />
            <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">Your most common questions, answered.</p>
                <div className="text-left space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                    {faqs.map((faq, index) => (
                        <div key={index} className="rounded-lg border border-purple-800/30 bg-gray-950/50 backdrop-blur-sm overflow-hidden">
                            <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                                <motion.div animate={{ rotate: openFaq === index ? 45 : 0 }} transition={{duration:0.3}}><Icon name="plus" size={24} className="text-purple-500" /></motion.div>
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

const FinalCTASection = ({ handleExploreCourses }) => {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-purple-900 to-gray-900 text-center animate-on-scroll">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Report generator → ROI generator.</h2>
                <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto mb-8">AI isn't the future. It's already here. Analysts who adapt will lead. Join The AI Way to automate your work, prove impact, and become the analyst your team looks up to.</p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <motion.button onClick={handleExploreCourses} className="w-full sm:w-auto py-3 px-8 text-lg font-semibold rounded-full bg-white text-gray-950" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Enroll Now
                    </motion.button>
                </div>
            </div>
        </section>
    );
}

const Footer = () => (
  <footer className="bg-gray-950 py-10 border-t border-gray-800">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Brand (logo + name) */}
        <div className="mb-6 md:mb-0 flex items-center gap-3 md:gap-4">
          <span className="relative block h-10 w-10 md:h-12 md:w-12">
            <img
              src="/brand/aiway-mark.png"
              alt="The AI Way logo"
              className="object-contain w-full h-full"
            />
          </span>
          <span className="font-poppins-medium text-white text-xl md:text-2xl leading-none">
            The AI Way
          </span>
        </div>

        {/* Socials */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/company/the-ai-way/?viewAsMember=true"
            aria-label="LinkedIn Profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2"
          >
            <Icon name="linkedin" size={24} />
          </a>
          <a
            href="https://www.instagram.com/theaiway.official/"
            aria-label="Instagram Profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-500 transition-colors rounded-full p-2"
          >
            <Icon name="instagram" size={24} />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm space-y-1">
        <p>&copy; 2025 The AI Way. All Rights Reserved.</p>
        <p>For support, please email: <a href="mailto:theaiway.official@gmail.com" className="text-purple-400 hover:underline">theaiway.official@gmail.com</a></p>
      </div>
    </div>
  </footer>
);


const CoursesPage = ({ onBack }) => {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (courseTitle, moduleTitle) => {
    const identifier = `${courseTitle}-${moduleTitle}`;
    setOpenModule(openModule === identifier ? null : identifier);
  };
  
  const CourseDetailCard = ({ course, isPopular = false, paymentUrl }) => {
    const mascots = {
        champion: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                    <linearGradient id="grad1_page" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(168, 85, 247)', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: 'rgb(236, 72, 153)', stopOpacity: 1}} />
                    </linearGradient>
                </defs>
                <path d="M15 30 L50 10 L85 30 L80 70 L50 90 L20 70 Z" stroke="url(#grad1_page)" strokeWidth="4" />
                <path d="M50 35 V 65 M 35 50 H 65" stroke="white" strokeWidth="4" />
                <path d="M15 30 C 5 50, 5 70, 20 70" fill="none" stroke="url(#grad1_page)" strokeWidth="3" strokeDasharray="5,5" />
                <path d="M85 30 C 95 50, 95 70, 80 70" fill="none" stroke="url(#grad1_page)" strokeWidth="3" strokeDasharray="5,5" />
            </svg>
        ),
        accelerator: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                    <linearGradient id="grad2_page" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(139, 92, 246)', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: 'rgb(34, 211, 238)', stopOpacity: 1}} />
                    </linearGradient>
                </defs>
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="url(#grad2_page)" />
                <circle cx="50" cy="50" r="10" fill="white" />
                <path d="M20 80 L30 70 M70 70 L80 80 M50 20 L50 30" stroke="white" strokeWidth="3" />
            </svg>
        )
    };
    
    return (
    <motion.div 
      className="bg-gray-900/50 rounded-2xl p-1.5 md:p-2 border border-gray-800 mb-12 shadow-lg shadow-purple-900/10 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
       <div className="relative bg-gray-900 rounded-xl grid grid-cols-1 lg:grid-cols-5 gap-8 p-6 md:p-8">
        <div className="lg:col-span-2 bg-gray-950/70 rounded-xl p-6 border border-gray-800 flex flex-col">
           <div className="flex items-start gap-4 mb-4">
               <div className="w-10 h-10 flex-shrink-0 mt-1">{mascots[course.mascot]}</div>
               <div>
                   <h2 className="text-3xl font-bold text-white leading-tight">{course.title}</h2>
               </div>
           </div>
           <p className="text-lg text-purple-300 mb-4">{course.subtitle}</p>
          
           <div className="grid grid-cols-2 gap-4 text-sm mb-6">
               <div className="flex items-center gap-2"><Icon name="bar-chart-2" size={18} className="text-purple-400"/> <div><p className="text-gray-400 text-xs">Level</p><p className="font-semibold text-white">{course.level}</p></div></div>
               <div className="flex items-center gap-2"><Icon name="clock" size={18} className="text-purple-400"/> <div><p className="text-gray-400 text-xs">Duration</p><p className="font-semibold text-white">{course.duration}</p></div></div>
           </div>

           <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3 mb-6">
               <h4 className="font-bold text-white text-center mb-2">Key Outcomes</h4>
               {course.keyOutcomes.map((outcome, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm">
                       <Icon name={outcome.icon} size={20} className="text-purple-400 flex-shrink-0" />
                       <span className="text-gray-300">{outcome.text}</span>
                   </div>
               ))}
           </div>

           <div className="text-center mt-auto">
               <div className="mb-4">
                  <p className="text-white font-bold text-3xl inline-block mr-3">{course.price}</p>
                  <p className="text-gray-400 line-through inline-block">{course.originalPrice}</p>
                  <p className="text-green-400 font-semibold text-sm mt-1">{course.bonus}</p>
               </div>
               <motion.a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="w-full block py-3 px-6 text-center rounded-full bg-purple-600 text-white font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 Enroll for {course.price}
               </motion.a>
               <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1.5"><Icon name="shield-check" size={14}/> {course.guarantee}</p>
           </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-gray-300 mb-6">{course.description}</p>
          <h3 className="text-xl font-bold text-white mb-2">Course Modules</h3>
          <div className="border-t border-gray-700">
            {course.modules.map((module, index) => (
              <div key={index} className="border-b border-gray-700 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer group"
                  onClick={() => toggleModule(course.title, module.title)}
                >
                  <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">{module.title}</h4>
                  <Icon
                    name="plus"
                    size={24}
                    className={`text-purple-500 transform transition-transform duration-300 ${openModule === `${course.title}-${module.title}` ? 'rotate-45' : 'rotate-0'}`}
                    strokeWidth={2.5}
                  />
                </div>
                <AnimatePresence>
                  {openModule === `${course.title}-${module.title}` && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-gray-400 overflow-hidden pr-8"
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
  )};

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 bg-gray-950">
      <div className="container mx-auto px-6 md:px-12">
        <button onClick={onBack} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8">
          <Icon name="arrow-left" size={20} className="mr-2" /> Back to Home
        </button>
        <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-green-400 font-semibold">Registrations are now open!</p>
            </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">The AI Way Courses</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            From report generator to ROI generator. Choose your path to turn analytics into action.
          </p>
          <div className="mt-6 flex justify-center items-center gap-6 text-sm text-gray-300">
                <span className="flex items-center gap-2"><Icon name="play-circle" size={18}/> ONLINE</span>
                <span className="flex items-center gap-2"><Icon name="tool" size={18}/> HANDS-ON</span>
                <span className="flex items-center gap-2"><Icon name="award" size={18}/> CERTIFICATE</span>
          </div>
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
        <CompaniesBelt />
        <PersonasSection />
        <CoursesSection sectionRef={sectionRefs.courses} handleExploreCourses={handleExploreCourses} />
        <CourseFinderQuiz scrollToSection={scrollToSection} />
        <MentorSection sectionRef={sectionRefs.mentors} />
        <TestimonialsSection sectionRef={sectionRefs.testimonials} />
        <WhatYouLearnSection sectionRef={sectionRefs.whatYouGet} />
        <FAQSection />
        <FinalCTASection handleExploreCourses={handleExploreCourses} />
      </>
    );

    return (
        <div className="bg-gray-950 text-gray-200 font-sans leading-relaxed tracking-wide antialiased overflow-x-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
                html, body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
                body { font-family: 'Inter', sans-serif; }
                .font-poppins-medium { font-family: 'Poppins', sans-serif; font-weight: 500; }
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
                .marquee { --gap: 2.25rem; overflow: hidden; mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent); }
                @media (min-width: 768px) { .marquee { --gap: 2.75rem; } }
                .marquee__track { display: inline-flex; align-items: center; gap: var(--gap); width: max-content; white-space: nowrap; will-change: transform; animation: companies-belt var(--dur, 52s) linear infinite; transform: translate3d(0,0,0); }
                @keyframes companies-belt { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }
                .scrolling-column-up { animation: scroll-up 15s linear infinite; }
                .scrolling-column-down { animation: scroll-down 15s linear infinite; }
                @keyframes scroll-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
                @keyframes scroll-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
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

