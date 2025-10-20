import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>SYLinks</title>
        
        <link rel="icon" href="/favicon.ico" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A simple link shortener" />
        <meta name="author" content="MrOrdenador" />
        <meta name="theme-color" content="#F4F4F5" />

        <meta property="og:title" content="Shorten Your Links" />
        <meta property="og:description" content="A simple link shortener" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sylinks.vercel.app/" />
        <meta property="og:image" content="/icon.png" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@mr0rdenador" />
        <meta name="twitter:creator" content="@mr0rdenador" />
        <meta name="twitter:title" content="Shorten Your Links" />
        <meta name="twitter:description" content="A simple link shortener" />
        <meta name="twitter:image" content="https://sylinks.vercel.app/icon.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
