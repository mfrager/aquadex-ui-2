import React from "react";
import { SSRProvider } from "@react-aria/ssr";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Chart from "./components/Chart";
import Order from "./components/Order";
import Accounts from "./components/Accounts";
import Mached from "./components/Mached";
import Trades from "./components/Trades";
import Footer from "./components/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        {" "}
        <link rel="icon" href="/a.png" />
        <title>AquaDEX</title>
        <meta name="title" content="AquaDEX" />
        <meta name="description" content="The best decentralized exchange" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aquadex.com/market" />
        <meta property="og:title" content="AquaDEX" />
        <meta
          property="og:description"
          content="The best decentralized exchange"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/72444242/242270497-e1f8ac0a-6947-40e9-a591-b5cd30a6c034.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aquadex.com/market" />
        <meta property="twitter:title" content="AquaDEX" />
        <meta
          property="twitter:description"
          content="The best decentralized exchange"
        />
        <meta
          property="twitter:image"
          content="https://user-images.githubusercontent.com/72444242/242270497-e1f8ac0a-6947-40e9-a591-b5cd30a6c034.jpg"
        />
      </Head>
      <main className="bg-black">
        <div className="flex min-h-screen gap-4 flex-col max-w-[1600px] mx-auto  items-center px-2 md:px-4">
          <Header />
          <div className="flex flex-wrap-reverse w-full gap-6 justify-center">
            <Order />
            <Chart />
          </div>
          <div className="flex flex-wrap w-full gap-6 justify-center">
            <Accounts />
            <Mached />
          </div>
          <Trades />
          <Footer />
        </div>
      </main>
    </>
  );
}
