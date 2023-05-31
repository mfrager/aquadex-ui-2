import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid";
function Accounts() {
  // data
  const data = [
    {
      logo: "/a.png",
      name: "Atellix",
      symbol: "ATX",
      balance: 123.45,
      price: "up",
    },
    {
      logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      name: "Solana",
      symbol: "SOL",
      balance: 200.22,
      price: "down",
    },
    {
      logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
      name: "USDC",
      symbol: "USD",
      balance: 245.78,
      price: "up",
    },
  ];
  return (
    <div className="relative group w-full lg:max-w-[49%] mt-4">
      <div className="absolute inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900  filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>

      <div className="relative leading-none rounded-3xl bg-zinc-950 flex">
        <div className="z-10 w-full items-start  font-mono text-sm flex flex-col border-neutral-800/50 from-inherit hover:border-neutral-900 lg:static rounded-3xl border bg-zinc-800/30 ">
          <UserCircleIcon className="w-8 h-8 aboslute -rotate-12 -mt-3 -mb-2 text-[#750168]" />
          <div className="w-full flex flex-col">
            {" "}
            <div className="flex px-4 h-8 w-full items-center text-slate-400/70 text-center">
              <div className="w-[33%] border-r my-2 text-start border-neutral-800/50">
                Token
              </div>
              <span className="w-[33%] border-r border-neutral-800/50">
                Symbol
              </span>
              <span className="w-[33%]">Balance</span>
            </div>
            {data.map(({ name, logo, symbol, price, balance }, index) => (
              <div
                className="flex px-4 h-12 w-full border-t items-center pr-4 border-neutral-800/50 text-center"
                key={index}
              >
                <div className="w-[33%] border-r justify-start items-center flex space-x-2 border-neutral-800/50">
                  <img className="w-6 h-6 rounded-full" src={logo} />
                  <span>{name}</span>
                </div>
                <span className="w-[33%] border-r my-2 border-neutral-800/50">
                  {symbol}
                </span>
                <span className="w-[33%] flex space-x-2 justify-center">
                  <span>{balance}</span>
                  {price == "up" ? (
                    <ArrowTrendingUpIcon className="w-5 h-5 text-lime-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-5 h-5 text-rose-600" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
