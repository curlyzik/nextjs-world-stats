import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "./Footer";
import Image from "next/image";

const Layout = ({ children, title = "World Statistic" }) => {
  return (
    <div className="p-8 min-h-screen grid grid-rows-3-auto max-w-7xl mx-auto">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex gap-2 justify-center items-center mb-12">
        <Link href="/">
          <a href="">
            <Image src="/logo.png" width="40" height="40" />
          </a>
        </Link>
        <Link href="/">
          <a className="text-2xl font-bold text-green-600">
            World Statistics
            <span className="text-gray-200 block text-xs">built with <span className=" grayscale-0 brightness-0 contrast-0 opacity-20">❤️</span> by || curlyzik</span>
          </a>
        </Link>
      </header>
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
