// pages/_app.js
import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Title shown in browser tab */}
        <title>The AI Way</title>

        {/* Favicon (put a favicon.ico file inside /public) */}
        {/* This line correctly links your favicon */}
        <link rel="icon" href="/brand/aiway-mark.png" />

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
