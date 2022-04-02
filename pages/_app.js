import React from 'react';
import '../styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import Script from 'next/script';
import Head from 'next/head';

import ThemeContext from '../utils/themeContext';

export default function MyApp({ Component, pageProps }) {
  return (
      <React.Fragment>
        <Script src="https://kit.fontawesome.com/a4e6dfdc9b.js" crossorigin="anonymous" />

        <Head>
          <title>Drabbler</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="1920" />
          <meta name="description" content="A WYSIWYG word editor for prompts, drabbles, and writing exercises." />
        </Head>

        <ThemeContext>
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
        </ThemeContext>

      </React.Fragment>
    )
}

