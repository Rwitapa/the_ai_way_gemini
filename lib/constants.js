// lib/constants.js
import React from 'react';
import Icon from '../components/common/Icon.jsx';
import Image from 'next/image';

// --- SHARED CONSTANTS ---
export const SUPERSTAR_ACCELERATOR_URL = 'https://rzp.io/rzp/ubyT3MWl';
export const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/D8xghzQNPWe1jaHH4T6hM5";

// --- COURSE DATA ---
export const courseData = {
  sprint: {
    mascot: 'champion',
    title: '3-Hour Champion Sprint',
    tagline: 'For a quick, tangible win.',
    description: "This focused sprint helps you solve a real analyst problem with AI. You'll identify a high-value task, build your first live automation, and get a tangible win in just three hours.",
    detailedDescription: "In three hours, you’ll go from “this report again?” to a working AI workflow. You’ll learn the right prompt patterns, connect them to your database, and ship a working output that runs on autopilot. You’ll walk away with a concrete demo, extra hours in your week, and the confidence to explore more.",
    price: '₹349',
    originalPrice: '₹1,249',
    bonus: '+ Free resources worth ₹699',
    level: 'Beginner Friendly',
    duration: '3 Hours',
    guarantee: 'Your First AI Workflow, Guaranteed.',
    whoIsItFor: 'Early-career analysts stuck on repetitive reporting and pressured to “use AI” without guidance, and leaders who want their teams delivering sharper insights. If buzzwords and non-scalable tool demos leave you confused about its practical use, this gives you a no-fluff way to see AI working on your data.',
    keyOutcomes: [
        { icon: 'bolt', text: 'Eliminate one repetitive report by replacing it with an automated AI workflow.' },
        { icon: 'code-2', text: 'Learn analyst-ready prompting patterns (Natural Language → SQL, summaries, structured outputs).' },
        { icon: 'git-fork', text: 'Build a working n8n workflow connected to your database that produces clear, trusted insights.' },
        { icon: 'award', text: 'Leave with a proof-of-concept you can show your manager and build on for advanced use cases.' },
    ],
    tools: ['n8n', 'OpenAI LLM', 'Postgres/BigQuery'],
    modules: [
      {
        title: 'Module 1: Why Reporting is Broken',
        summary: "(~30 minutes) \n See why repetitive, manual reporting slows decisions and drains your time. Identify one recurring report from your own workflow that’s the perfect candidate for automation and immediate impact.",
      },
      {
        title: 'Module 2: Prompting for Reporting',
        summary: "(~30 minutes) \n Learn practical prompt structures that actually work for analysts—turn natural language into reliable SQL, structured summaries, and validated outputs. Leave with a starter prompt library you can reuse right away.",
      },
      {
        title: 'Module 3: Build Your First AI Workflow',
        summary: "(~2 hours) \n Get hands-on and automate your chosen report end-to-end. Connect to a data source, run the query with AI, and generate an analyst-ready summary you can show your manager—your first real AI workflow.",
      },
    ],
  },
  accelerator: {
    mascot: 'accelerator',
    title: '16-Hour Superstar Accelerator',
    tagline: 'For a complete career transformation.',
    description: "This deep, hands-on playbook teaches you to solve real-world business problems with AI. You'll learn to design and deploy end-to-end agentic systems, leaving with a powerful portfolio project.",
    detailedDescription: "Across one intensive weekend, you’ll go beyond dashboards to build workflows that think, act, and deliver insights. You’ll start by spotting where traditional analytics breaks down, then learn how to apply AI techniques that actually scale - without the buzzwords. Together, we’ll build four production-ready projects, each designed around real business pain points, with human-in-the-loop checks so your work is trusted. By the end, you’ll not only ship working systems in n8n but also leave with a portfolio that shows you can drive AI adoption in the business, not just keep up with it.",
    price: '₹4,999',
    originalPrice: '₹10,999',
    bonus: '+ Free Resources worth ₹5,999',
    level: 'Intermediate',
    duration: '16 Hours',
    guarantee: 'Your Portfolio Project, Guaranteed.',
    whoIsItFor: 'For analysts and data leads tired of shallow dashboards, scattered data, and quick fixes that don’t last. If you’re juggling too many tools, struggling to trust AI outputs, or worried about staying relevant, this course is for you. It helps you shift from running reports to leading AI-driven problem solving on your team.',
    keyOutcomes: [
        { icon: 'compass', text: "Master analyst-focused prompts for SQL, summaries and structured outputs." },
        { icon: 'book', text: 'Learn 4 core AI techniques - Automation, RAG, AI Agents, and Anomaly Detection - and when to apply each.' },
        { icon: 'tool', text: "Build 4 projects: Dashboard Narratives, Customer Retention insights, Inventory/Stockout alerts, Marketing Campaign Anomaly tracking." },
        { icon: 'briefcase', text: 'Add human-in-the-loop checks so outputs are trusted, and package your work into a portfolio that proves impact.' },
    ],
    tools: ['n8n', 'OpenAI LLM', 'Qdrant/Pinecone', 'Python', 'Looker/Tableau Connectors'],
    modules: [
        {
            title: 'Module 1: Foundations - Analytics is Broken',
            summary: 'Move past surface-level metrics. Learn to identify and frame the deep operational problems that AI is uniquely positioned to solve.',
          },
          {
            title: 'Module 2: Foundations - AI Hype vs. Reality',
            summary: 'Cut through the buzzwords. Learn what LLMs can and cannot do for analytics, and get a practical checklist for identifying high-value AI use cases.',
          },
          {
            title: 'Module 3: Foundations - Prompt Engineering for Analysts',
            summary: 'Stop getting generic results. Master prompt structures for complex analytical tasks including SQL generation, anomaly detection, and structured summaries to build your personal analytics prompt library.',
          },
          {
            title: 'Module 4: Project 1 - Automated Dashboard Narratives',
            summary: 'Problem: Dashboards show numbers, but leaders ask, “So what?” You will build a system that automatically generates executive-ready commentary.',
          },
          {
            title: 'Module 5: Project 2 - Customer Insights with RAG',
            summary: 'Problem: Churn drivers are buried in messy text data. You will use Retrieval-Augmented Generation to find answers in unstructured support tickets and surveys.',
          },
          {
            title: 'Module 6: Project 3 - Agentic Workflows for Alerts',
            summary: 'Problem: Stockouts hurt profits. You will build an agentic workflow that monitors inventory data in real-time and decides when to trigger intelligent alerts.',
          },
          {
            title: 'Module 7: Project 4 - Anomaly Detection for Campaigns',
            summary: 'Problem: Marketing data is scattered. You will build a tracker that aggregates multi-source data to automatically flag unusual performance and explain why.',
          },
          {
            title: 'Module 8: Advanced Skills - Human-in-the-Loop',
            summary: 'Build trust and prevent errors by designing AI workflows with checkpoints for analyst approvals and validation loops, and leave with a reusable template.',
          },
          {
            title: 'Module 9: Career Skills - Portfolio & Branding',
            summary: 'Learn to showcase yourself as the one driving AI adoption. You\'ll translate your capstone project into a portfolio-ready case study and a LinkedIn post draft.',
          },
    ],
  },
};

// ... (faqs, testimonials, and other constants remain the same) ...

// ... (faqs, testimonials, personas, LOGOS, mascots, TestimonialCard, getWeekNumber remain unchanged)
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
      text: 'Early-career Analyst ready to move from reporting to problem-solving.'
    },
    {
      icon: 'book',
      text: 'BI/Product/Data Analyst drowning in tools but missing clear answers.'
    },
    {
      icon: 'briefcase',
      text: 'Manager who wants the team delivering insights leaders act on.'
    },
    {
      icon: 'user-check',
      text: 'Professional aiming for promotions, visibility, and influence.'
    }
];

export const LOGOS = [
    { name: "Swiggy",    src: "/brand/swiggy.png"    },
    { name: "Zoho",      src: "/brand/zoho.png"      },
    { name: "Zomato",    src: "/brand/zomato.png"    },
    { name: "Paytm",     src: "/brand/paytm.png"     },
    { name: "Ola",       src: "/brand/ola.png"       },
    { name: "Flipkart",  src: "/brand/flipkart_logo_256x96.png"  },
    { name: "Razorpay",  src: "/brand/razorpay.png"  },
    { name: "PharmEasy", src: "/brand/PharmEasy_logo (1).png" },
];

export const mascots = {
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

export const TestimonialCard = ({ testimonial, ...rest }) => (
    <div {...rest} className="w-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-purple-800/20 p-6 shadow-2xl shadow-purple-900/20 mb-6">
        <p className="italic text-gray-300 mb-4 text-base">"{testimonial.quote}"</p>
        <div className="flex items-center gap-x-4">
            <Image
              src={testimonial.avatar}
              alt={`Avatar of ${testimonial.name}`}
              width={48}
              height={48}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div>
                <p className="font-semibold text-white whitespace-nowrap">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
            </div>
        </div>
    </div>
);

export const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
};

export const getNextSprintDates = (startDate, monthsIntoFuture = 3) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + monthsIntoFuture);

    const dayMap = {
        'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
        'Thursday': 4, 'Friday': 5, 'Saturday': 6
    };

    while (currentDate <= endDate) {
        const dayName = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            timeZone: 'Asia/Kolkata'
        }).format(currentDate);

        const dayOfWeek = dayMap[dayName];

        if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
            dates.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};


export const getNextAcceleratorDates = (startDate, yearsIntoFuture = 5) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + yearsIntoFuture);

    let daysUntilSaturday = (6 - currentDate.getDay() + 7) % 7;
    currentDate.setDate(currentDate.getDate() + daysUntilSaturday);

    if (getWeekNumber(currentDate) % 2 === 0) {
        currentDate.setDate(currentDate.getDate() + 7);
    }

    while (currentDate <= endDate) {
        const saturday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0);
        const sunday = new Date(saturday);
        sunday.setDate(saturday.getDate() + 1);
        sunday.setHours(19, 0, 0, 0);

        if (saturday <= endDate) {
           dates.push({ start: saturday, end: sunday });
        }
        currentDate.setDate(currentDate.getDate() + 14);
    }
    return dates;
};

export const formatSprintDate = (date) => date ? `${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, 7 PM - 10 PM IST` : 'Choose a date...';

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
