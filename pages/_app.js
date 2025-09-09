// pages/_app.js
import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Title shown in browser tab */}
        <title>The AI Way</title>

        {/* Favicon for most browsers */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Apple Touch Icon for iOS homescreen */}
        <link rel="apple-touch-icon" href="/brand/aiway-mark.png" />

        {/* Basic SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="The AI Way — helping professionals master AI for Business Analytics through live, practical, real-world learning."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

