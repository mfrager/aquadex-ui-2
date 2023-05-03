import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import { User, Radio, Input } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col space-y-4  items-center  p-4 ${inter.className}`}
    >
      <div className="flex  items-center justify- md:space-y-0 flex-wrap gap-2 w-full max-w-7xl">
        <div className="border-neutral-800 dark:from-inherit lg:static rounded-xl border px-4 py-1.5 space-x-2 bg-zinc-800/30 flex w-28 hover:border-fuchsia-950 ">
          <img
            src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
            className="w-6 h-6 rounded-xl"
          />
          <button className="font-mono font-bold text-white/50">$21.32</button>
        </div>{" "}
        <div className="border-neutral-800 dark:from-inherit lg:static w-28 rounded-xl border px-4 py-1.5 space-x-2 bg-zinc-800/30 flex hover:border-fuchsia-950 ">
          <img
            src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
            className="w-6 h-6 rounded-xl"
          />
          <button className="font-mono font-bold text-white/50">$1.00</button>
        </div>
      </div>
      <div className="flex space-y-4 items-center justify-between md:space-y-0 flex-wrap w-full max-w-7xl">
        {" "}
        <div className="z-10 w-full md:max-w-[69%] items-center px-4 py-2 justify-between font-mono text-sm flex flex-col border-neutral-800 from-inherit hover:border-fuchsia-950 lg:static rounded-xl border bg-zinc-800/30 space-y-2">
          <div className="w-full flex justify-between items-start ">
            {" "}
            <text className="text-xl font-bold">ATX / USDC</text>{" "}
            <div className="border-neutral-800 dark:from-inherit lg:static w-fit rounded-xl border px-4 py-1.5 bg-zinc-800/30">
              <button className="font-mono font-bold">BWWz..EE4S</button>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <span>AquaDEX protocol Solana blockchain </span>
              <span className="text-white/50">
                Fee: 0.0 bps - Rebate: 0.0 bps
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center w-full gap-2">
            <div className="flex justify-center items-center space-x-2">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-fuchsia-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
              <div className="flex flex-col">
                <span>Last Price</span>
                <span className="text-white/50">0.70000</span>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-fuchsia-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <div className="flex flex-col">
                <span>Last Trade</span>
                <span className="text-white/50">02.05.2023/07:21:43</span>
              </div>
            </div>
          </div>
        </div>
        <div className="z-10 w-full md:max-w-[30%] items-center px-4 py-2 justify-between font-mono text-sm flex flex-col border-neutral-800 from-inherit lg:static rounded-xl border bg-zinc-800/30 space-y-5 hover:border-fuchsia-950">
          <div className="w-full  flex justify-between items-start ">
            {" "}
            <text className="text-xl ">Balances</text>{" "}
          </div>

          <div className="flex flex-wrap items-center w-full gap-2">
            <User
              bordered
              src="https://media.atellix.net/token/atx.png"
              name="Atellix / ATX"
            >
              <button className="text-fuchsia-800 text-xs">
                CREATTE TOKEN ACCOUNT
              </button>
            </User>
            <User
              bordered
              src="https://s2.coinmarketcap.com/static/img/coins/128x128/3408.png"
              name="USD Coin / USDC"
            >
              <button className="text-fuchsia-800 text-xs">
                CREATTE TOKEN ACCOUNT
              </button>
            </User>
          </div>
        </div>
      </div>{" "}
      <div className="flex my-4 items-center justify-center md:space-y-0 flex-wrap w-full max-w-7xl border-neutral-800 from-inherit hover:border-fuchsia-950 lg:static rounded-xl border bg-zinc-800/30 h-96">
        {" "}
      </div>
      <div className="flex items-start justify-center flex-col w-full max-w-7xl hover:border-fuchsia-950 border-neutral-800 from-inherit lg:static rounded-xl border bg-zinc-800/30 h-fit font-mono px-4 py-2 space-y-4">
        {" "}
        <span className="text-xl">BID</span>
        <Radio.Group orientation="horizontal" defaultValue="sm">
          <Radio value="sm" size="sm" color="primary">
            Limit Bid
          </Radio>
          <Radio value="secondary" size="sm" color="primary">
            Market Bid
          </Radio>
        </Radio.Group>
        <div className="w-full flex flex-wrap items-center gap-2">
          {" "}
          <Input placeholder="Bid Quantity" />
          <Input placeholder="Bid Quantity" />
          <div className="border-neutral-800 dark:from-inherit lg:static w-fit rounded-xl border px-4 py-1.5 bg-zinc-800/30">
            <button className="font-mono font-bold hover:text-fuchsia-800">
              Place BID
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center md:space-y-0 flex-col w-full hover:border-fuchsia-950 max-w-7xl border-neutral-800 from-inherit lg:static rounded-xl border bg-zinc-800/30 h-fit font-mono text-xs">
        <div className="w-full flex justify-around px-4 py-2 text-fuchsia-800">
          {" "}
          <span className="">Order</span>
          <span>Taker</span>
          <span>Maker</span>
          <span>Timestamp</span>
          <span>Quantity</span>
          <span>Price</span>
        </div>
        <div className="border-t-[0.5px] border-neutral-800 w-full flex  justify-around px-4 py-2 hover:bg-neutral-800/70">
          {" "}
          <span className="">Bid</span>
          <span className="">ALy..FE6</span>
          <span className="">4RD..tbU</span>
          <span className="">2.05.2023 </span>
          <span className="">5.00</span>
          <span className="">0.7000</span>
        </div>{" "}
        <div className="border-t-[0.5px] border-neutral-800 w-full flex  justify-around px-4 py-2 hover:bg-neutral-800/70">
          {" "}
          <span className="">Bid</span>
          <span className="">ALy..FE6</span>
          <span className="">4RD..tbU</span>
          <span className="">2.05.2023 </span>
          <span className="">5.00</span>
          <span className="">0.7000</span>
        </div>{" "}
        <div className="border-t-[0.5px] border-neutral-800 w-full flex  justify-around px-4 py-2 hover:bg-neutral-800/70">
          {" "}
          <span className="">Bid</span>
          <span className="">ALy..FE6</span>
          <span className="">4RD..tbU</span>
          <span className="">2.05.2023 </span>
          <span className="">5.00</span>
          <span className="">0.7000</span>
        </div>{" "}
        <div className="border-t-[0.5px] border-neutral-800 w-full flex  justify-around px-4 py-2 hover:bg-neutral-800/70">
          {" "}
          <span className="">Bid</span>
          <span className="">ALy..FE6</span>
          <span className="">4RD..tbU</span>
          <span className="">2.05.2023 </span>
          <span className="">5.00</span>
          <span className="">0.7000</span>
        </div>{" "}
        <div className="border-t-[0.5px] border-neutral-800 w-full flex  justify-around px-4 py-2 hover:bg-neutral-800/70">
          {" "}
          <span className="">Bid</span>
          <span className="">ALy..FE6</span>
          <span className="">4RD..tbU</span>
          <span className="">2.05.2023 </span>
          <span className="">5.00</span>
          <span className="">0.7000</span>
        </div>{" "}
        <div className="border-t-[0.5px] border-neutral-800 w-full flex  justify-around px-4 py-2 hover:bg-neutral-800/70">
          {" "}
          <span className="">Bid</span>
          <span className="">ALy..FE6</span>
          <span className="">4RD..tbU</span>
          <span className="">2.05.2023 </span>
          <span className="">5.00</span>
          <span className="">0.7000</span>
        </div>{" "}
        <div className="border-t-[0.5px] border-neutral-800 w-full flex  justify-around px-4 py-2 hover:bg-neutral-800/70">
          {" "}
          <span className="">Bid</span>
          <span className="">ALy..FE6</span>
          <span className="">4RD..tbU</span>
          <span className="">2.05.2023 </span>
          <span className="">5.00</span>
          <span className="">0.7000</span>
        </div>{" "}
      </div>
      <div className="font-mono text-sm flex justify-between w-full max-w-7xl px-1">
        <span>© 2023 Atellix, Inc.</span>
        <div className="flex space-x-4">
          {" "}
          <button className="hover:text-fuchsia-800">Terms</button>
          <button className="hover:text-fuchsia-800">MIT Licence</button>
        </div>
      </div>
    </main>
  );
}
