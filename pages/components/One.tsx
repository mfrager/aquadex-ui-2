import React from "react";
import { Dropdown } from "@nextui-org/react";

function One() {
  return (
    <div className=" w-full md:max-w-7xl mt-4 space-y-2">
      <div className="w-full  flex justify-between items-start">
        {" "}
        <Dropdown isBordered>
          <div className="border border-neutral-800 rounded-xl ">
            <Dropdown.Button
              size={"sm"}
              className="font-mono"
              color={"primary"}
            >
              <span className="pr-8">ATX-USDC</span>
            </Dropdown.Button>
          </div>

          <Dropdown.Menu className="font-mono" color="secondary">
            <Dropdown.Item key="new">SOL-USDC</Dropdown.Item>
            <Dropdown.Item key="copy">ATX-SOL</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="border-neutral-800 dark:from-inherit lg:static w-fit rounded-xl border px-2 py-1.5 bg-zinc-800/30">
          <button className="font-mono flex items-center justify-center space-x-4 font-bold w-32">
            <img className="w-4 h-4" src="/phantom.svg" />
            <span>BWWz..EE4S</span>
          </button>
        </div>
      </div>
      <div className="z-10 w-full items-center px-4 py-2 justify-between font-mono text-sm flex flex-col  from-inherit  lg:static  space-y-2">
        {/* <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <span>AquaDEX protocol Solana blockchain </span>
            <span className="text-white/50">
              Fee: 0.0 bps - Rebate: 0.0 bps
            </span>
          </div>
        </div> */}
        <div className="flex flex-wrap items-center w-full gap-2 md:gap-6">
          <div className="flex justify-center items-center space-x-2">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 md:w-6 md:h-6 text-violet-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
            <div className="flex flex-col md:flex-row md:space-x-2">
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
              className="w-8 h-8 md:w-6 md:h-6 text-violet-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div className="flex flex-col md:flex-row md:space-x-2">
              <span>Last Trade</span>
              <span className="text-white/50">02.05.2023/07:21:43</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default One;
