import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en-us">
      <Head>
        <meta
          name="description"
          content="RCCG Seed of joy attendance counter"
        />
        <link rel="icon" href="/logo.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
