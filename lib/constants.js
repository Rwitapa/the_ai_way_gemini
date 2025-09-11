import React from 'react';
import { motion } from "framer-motion";

// --- CONSTANTS ---
export const RAZORPAY_PAYMENT_URL = 'https://pages.razorpay.com/pl_REQlevt3yir34I/view';
export const SUPERSTAR_ACCELERATOR_URL = 'https://rzp.io/rzp/ubyT3MWl';
export const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/D8xghzQNPWe1jaHH4T6hM5";

// --- DATE UTILS ---
export const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
};

export const getNextSprintDates = () => {
    const dates = [];
    let currentDate = new Date('2025-09-10T12:00:00Z');
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + 3);

    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
            dates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

export const getNextAcceleratorDates = () => {
    const dates = [];
    let currentDate = new Date('2025-09-10T12:00:00Z');
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + 3);

    let daysUntilSaturday = (6 - currentDate.getDay() + 7) % 7;
    currentDate.setDate(currentDate.getDate() + daysUntilSaturday);

    if (getWeekNumber(currentDate) % 2 !== 0) {
        currentDate.setDate(currentDate.getDate() + 7);
    }

    while (currentDate <= endDate) {
        const saturday = new Date(currentDate);
        const sunday = new Date(currentDate);
        sunday.setDate(saturday.getDate() + 1);
        if (saturday <= endDate) {
           dates.push({ start: saturday, end: sunday });
        }
        currentDate.setDate(currentDate.getDate() + 14);
    }
    return dates;
};

export const formatSprintDate = (date) => date ? `${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, 7 PM - 10 PM IST` : 'Choose a date...';
export const formatAcceleratorDate = (cohort) => {
    if (!cohort) return 'Choose a date...';
    const startDay = cohort.start.toLocaleDateString('en-IN', { day: 'numeric' });
    const startMonth = cohort.start.toLocaleDateString('en-IN', { month: 'short' });
    const endDay = cohort.end.toLocaleDateString('en-IN', { day: 'numeric' });
    const endMonth = cohort.end.toLocaleDateString('en-IN', { month: 'short' });

    if (startMonth === endMonth) {
        return `${startDay} - ${endDay} ${endMonth}, 10 AM - 7 PM IST`;
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}, 10 AM - 7 PM IST`;
};

// --- ICON COMPONENT ---
export const Icon = ({ name, size = 24, strokeWidth = 2, className = '' }) => {
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
        'calendar': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
        ),
        'plus': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        )
    };
    return icons[name] || null;
};

// --- DATA ---
export const courseData = {
    sprint: {
      mascot: 'champion',
      title: '3-Hour Champion Sprint',
      subtitle: 'Ship Your First KPI Automation in Just 3 Hours',
      description: 'Stop spending hours on manual reports. This focused, hands-on sprint will teach you how to identify a high-value KPI and build your first live automation in just three hours. You’ll walk away with a working workflow and a proof memo you can show to your manager or in an interview.',
      detailedDescription: "Tired of the endless reporting grind? This intensive sprint is designed to solve your biggest time-sink. In just 3 hours, you'll go from manual data pulls to a fully automated KPI bot that delivers insights directly to your team, giving you back valuable hours each week.",
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
      detailedDescription: "Ready to transition from a report builder to an AI-driven strategist? The Accelerator is your deep dive into building end-to-end agentic systems. You'll learn to create AI agents that don't just display data—they analyze funnels, answer complex questions from internal documents, and deliver actionable insights, transforming your role and impact.",
      price: '₹4,999',
      originalPrice: '₹10,999',
      bonus: '+ Free Resources worth ₹5,999',
      level: 'Intermediate',
      duration: '16 Hours (Sat & Sun)',
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
export const faqs = [
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
export const testimonials = [
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
export const personas = [
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
export const whatYouLearnItems = [
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
export const LOGOS = [
    { name: 'Swiggy',    src: '/brand/swiggy.png'    },
    { name: 'Zoho',      src: '/brand/zoho.png'      },
    { name: 'Zomato',    src: '/brand/zomato.png'    },
    { name: 'Paytm',     src: '/brand/paytm.png'     },
    { name: 'Ola',       src: '/brand/ola.png'       },
    { name: 'Flipkart',  src: '/brand/flipkart_logo_256x96.png'  },
    { name: 'Razorpay',  src: '/brand/razorpay.png'  },
    { name: 'PharmEasy', src: '/brand/PharmEasy_logo (1).png' },
];

export const mascots = {
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
                <linearGradient id="grad2_page" x1="0%" y1="0%" y2="100%">
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

export const TestimonialCard = ({ testimonial, ...rest }) => (
    <div {...rest} className="w-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-purple-800/20 p-6 shadow-2xl shadow-purple-900/20 mb-6">
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
