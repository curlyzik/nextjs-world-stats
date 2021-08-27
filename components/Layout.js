import React from "react";
import Head from "next/head";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>World Statistics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-center items-center mb-8">Layout</header>
      <main className="">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
