import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The AI Way</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="The AI Way — Gen AI for Business Analyts."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
