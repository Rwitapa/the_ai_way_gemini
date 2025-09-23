// pages/_app.js
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';
import { Inter, Poppins } from 'next/font/google';
import "../styles/globals.css";

// Configure the fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function MyApp({ Component, pageProps }) {
  return (
    // Add font variables to the main app container
    <div className={`${inter.variable} ${poppins.variable}`}>
      <Head>
        <title>The AI Way</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo_transparent.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="GenAI for Business Analysts | Make AI work for you"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
