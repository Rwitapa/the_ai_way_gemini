# The AI Way

<p align="center">
  <img src="https://github.com/rwitapa/the_ai_way_gemini/blob/main/public/brand/aiway-mark.png?raw=true" alt="The AI Way Logo" width="120">
</p>

<h1 align="center">The AI Way: GenAI for Business Analysts</h1>

<p align="center">
  <strong>The AI Way is a next-gen learning platform helping professionals master AI for Business Analytics through live, practical, real-world projects.</strong>
  <br />
  This repository contains the full source code for the official website, built with Next.js and Firebase.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.x-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Firebase-12.x-orange?style=for-the-badge&logo=firebase" alt="Firebase">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-blueviolet?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel" alt="Vercel Ready">
</p>

## ✨ Core Features

The platform is designed to provide a seamless experience for students, from course discovery to enrollment and community engagement.

* **Dynamic Course Offerings**: Features two main courses—the **3-Hour Champion Sprint** and the **16-Hour Superstar Accelerator**—with detailed descriptions and module breakdowns.
* **Live Cohort Calendar**: Fetches and displays available cohort dates in real-time from a Firestore database, allowing users to select a schedule that works for them.
* **Secure Payment Gateway**: Integrates with **Razorpay** for a secure and reliable payment process, including server-side order creation and webhook verification for successful enrollments.
* **Admin Dashboard**: A secure, login-protected panel allows administrators to manage and update cohort dates directly in the database.
* **Automated Date Syncing**: A Vercel Cron Job runs daily to automatically populate new cohort dates, ensuring the schedule is always up-to-date without manual intervention.
* **Responsive & Animated UI**: Built with Tailwind CSS and Framer Motion for a modern, fluid, and fully responsive user experience across all devices.

## 🛠️ Tech Stack

This project leverages a modern, serverless technology stack for high performance and scalability.

* **Framework**: [Next.js](https://nextjs.org/) (React Framework)
* **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore)
* **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth) (Email/Password for Admin, Anonymous for users)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Payments**: [Razorpay](https://razorpay.com/)
* **Deployment**: [Vercel](https://vercel.com/) (with Vercel Cron Jobs)

## 🚀 Getting Started

To run this project locally, you'll need to set up your own Firebase project and Razorpay account.

### Prerequisites

* Node.js (v22.x recommended)
* A Firebase project with Firestore and Authentication enabled.
* A Razorpay account for API keys.

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/the-ai-way-gemini.git](https://github.com/your-username/the-ai-way-gemini.git)
    cd the-ai-way-gemini
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add your Firebase and Razorpay credentials.

    ```env
    # Firebase Client Keys
    NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=1:..:web:...

    # Firebase Admin Keys (for server-side operations)
    FIREBASE_PROJECT_ID=your-project-id
    FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project.iam.gserviceaccount.com
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
    FIRE"Hello! I am Gemini, a large language model trained by Google. I can generate text, translate languages, write different kinds of creative content, and answer your questions in an informative way."BASE_APP_ID=1:..:web:... # Yes, this can be the same as the public one

    # Razorpay Keys
    NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
    RAZORPAY_KEY_ID=rzp_test_...
    RAZORPAY_KEY_SECRET=...
    RAZORPAY_WEBHOOK_SECRET=...

    # Cron Job Secret
    CRON_SECRET=a-very-strong-secret-key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## ⚙️ Key Architectural Decisions

* **Serverless-First**: All backend logic is handled through Next.js API Routes, which are deployed as serverless functions on Vercel. This approach is cost-effective and scales automatically.
* **Client-Side State**: React's `useState` and `useEffect` hooks are used for managing UI state, such as toggling modals and handling form inputs.
* **Dynamic Imports**: Non-critical components like modals are loaded dynamically to reduce the initial JavaScript bundle size and improve page load performance.
* **Image Optimization**: The `next/image` component is used to automatically optimize and lazy-load images, improving the Core Web Vitals score.
* **Security Headers**: `next.config.js` is configured to add HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`) to protect against common web vulnerabilities.
