// pages/_app.js
import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Title shown in browser tab */}
        <title>The AI Way</title>

        {/* Razorpay script added here */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

        {/* Standard favicon for browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Apple Touch Icon for iOS home screen */}
        <link rel="apple-touch-icon" href="/logo_transparent.png" />

        {/* Basic SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="GenAI for Business Analysts | Make AI work for you"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
