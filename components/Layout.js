import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "./Footer";

const Layout = ({ children, title = "World Statistic" }) => {
  return (
    <div className="p-8 min-h-screen grid grid-rows-3-auto max-w-7xl mx-auto">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-center items-center mb-8">
        <Link href="/">Logo</Link>
      </header>
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
