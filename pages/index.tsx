import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import One from "./components/One";
import Chart from "./components/Chart";
import Order from "./components/Order";
import Accounds from "./components/Accounds";
import Mached from "./components/Mached";
import Trades from "./components/Trades";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen gap-4 flex-col bg-black items-center  p-4 ${inter.className}`}
    >
      <One />
      <div className="flex flex-wrap-reverse w-full max-w-7xl gap-6 justify-center">
        <Order />
        <Chart />
      </div>
      <div className="flex flex-wrap w-full max-w-7xl gap-6 justify-center">
        <Accounds />
        <Mached />
      </div>
      {/* <div className="flex items-start justify-center flex-col w-full max-w-7xl hover:border-fuchsia-950 border-neutral-800 from-inherit lg:static rounded-xl border bg-zinc-800/30 h-fit font-mono px-4 py-2 space-y-4">
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
      </div> */}
      <Trades />

      <div className="font-mono text-sm flex justify-between w-full max-w-7xl  items-center border-t  border-neutral-800 pt-2 border-r border-l rounded-t-3xl -mb-4 h-14 px-4 ">
        <button className="hover:text-fuchsia-800 ">Terms</button>
        <span>© 2023 Atellix, Inc.</span>{" "}
        <button className="hover:text-fuchsia-800">MIT Licence</button>
      </div>
    </main>
  );
}
