import React from 'react';
import Icon from '../components/common/Icon.jsx';

// --- SHARED CONSTANTS ---
export const RAZORPAY_PAYMENT_URL = 'https://pages.razorpay.com/pl_REQlevt3yir34I/view';
export const SUPERSTAR_ACCELERATOR_URL = 'https://rzp.io/rzp/ubyT3MWl';
export const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/D8xghzQNPWe1jaHH4T6hM5";

// --- COURSE DATA ---
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

// --- RE-ADD THE MISSING COMPONENTS HERE ---

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
        <div className="flex items-center">
             {/* --- START OF THE CHANGE --- */}
             {/* Kept original image size, only increased the margin */}
             <img src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} className="rounded-full mr-5 h-12 w-12 object-cover" />
             {/* --- END OF THE CHANGE --- */}
            <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
            </div>
        </div>
    </div>
);

// --- DATE UTILITIES (No change needed here) ---
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

    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
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
