import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en-us">
      <Head>
        <meta
          name="description"
          content="RCCG Seed of Excellence Attendance Counter"
        />
        <link rel="icon" href="/logo.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"true"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;600&display=swap"
          rel="stylesheet"
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
