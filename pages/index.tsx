import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Header from "./components/Header";
//import Chart from "./components/Chart";
import Book from "./components/Book";
import Order from "./components/Order";
import Accounts from "./components/Accounts";
import Matched from "./components/Matched";
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
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                <meta name="title" content="AquaDEX" />
                <meta name="description" content="The best decentralized exchange" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://aquadex.com/" />
                <meta property="og:title" content="AquaDEX" />
                <meta property="og:description" content="Decentralized Limit Orderbook Exchange on Solana, created by the Atellix Network." />
                <meta property="og:image" content="https://media.atellix.net/aquadex-screen-1.jpg" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:site" content="@atellix" />
                <meta property="twitter:creator" content="@atellix" />
                <meta property="twitter:title" content="AquaDEX" />
                <meta property="twitter:description" content="Decentralized Limit Orderbook Exchange on Solana, created by the Atellix Network." />
                <meta property="twitter:image" content="https://media.atellix.net/aquadex-screen-1.jpg" />
            </Head>
            <main className="bg-black">
                <div className="flex min-h-screen gap-4 flex-col max-w-[1600px] mx-auto items-center px-2 md:px-4 justify-between">
                    <Header/>
                    <div className="flex flex-wrap flex-row-reverse w-full gap-6 justify-center">
                        <div className="flex flex-col w-full xl:max-w-[32%]">
                            <Accounts />
                            <Order />
                            <Matched />
                        </div>
                        <div className="flex flex-col w-full xl:max-w-[66%]">
                            <Book />
                            <Trades />
                        </div>
                    </div>
                    <Footer />
                </div>
            </main>
        </>
    );
}
