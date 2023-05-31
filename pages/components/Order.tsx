import { Checkbox, Dropdown, Input, Progress } from "@nextui-org/react";
import React from "react";

function Order() {
  return (
    <div className="relative group w-full xl:max-w-[32%] mt-4">
      <div className="absolute inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900  filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
      <div className="relative leading-none rounded-3xl bg-zinc-950 flex items-center ">
        <div className="z-10 w-full items-center px-4 py-2 font-mono text-sm flex flex-col border-neutral-800/50 from-inherit hover:border-neutral-900 lg:static rounded-3xl border bg-zinc-800/30 h-96 justify-center space-y-4">
          {" "}
          <div className="w-full flex items-center gap-2 justify-between">
            <div className="border-lime-800 dark:from-inherit lg:static rounded-xl border px-2 py-1.5 bg-zinc-800/30 w-full">
              <button className="font-mono flex items-center justify-center space-x-4 font-bold w-full">
                <span>Buy ATX</span>
              </button>
            </div>
            <div className="border-sky-800 dark:from-inherit lg:static w-full rounded-xl border px-2 py-1.5 bg-zinc-800/30">
              <button className="font-mono flex items-center justify-center space-x-4 font-bold w-full">
                <span>Sell ATX</span>
              </button>
            </div>
          </div>
          {/* Order type */}
          <div className="flex flex-col w-full space-y-2">
            <span>Order type</span>
            <Dropdown isBordered>
              <Dropdown.Button size={"sm"} className="font-mono">
                <span className="text-slate-400/70">Market/Limit Order</span>
              </Dropdown.Button>

              <Dropdown.Menu className="font-mono" color="secondary">
                <Dropdown.Item key="new">-- -- --</Dropdown.Item>
                <Dropdown.Item key="copy">-- -- --</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* Quality ATX */}
          <div className="w-full flex justify-between gap-2">
            <div className="flex flex-col space-y-2 w-full">
              <span>Quality: ATX</span>
              <div className="bg-[#16181a] w-full h-8 px-4 flex items-center rounded-lg text-slate-400/70">
                150
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <span>Price: USDC</span>

              <div className="bg-[#16181a] w-full h-8 px-4 flex items-center rounded-lg text-slate-400/70">
                42.00
              </div>
            </div>
          </div>
          {/* Amount */}
          <div className="flex flex-col w-full space-y-2">
            <span>Amount:</span>
            <div className="flex gap-2 items-center">
              <div className="border-violet-900 dark:from-inherit lg:static w-24 rounded-xl border px-2 py-1 bg-zinc-800/30">
                <button className="font-mono flex items-center justify-center space-x-4 font-bold w-full">
                  <span>Max</span>
                </button>
              </div>
              <div className="w-full flex flex-col justify-center">
                <Progress color="secondary" size="sm" value={72} />
                <div className="flex items-center justify-between px-2 ">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </div>
          {/* Chek */}
          <div className="flex flex-col space-y-2 items-start w-full justify-start">
            {" "}
            <Checkbox color="secondary" defaultSelected size="xs">
              Post order
            </Checkbox>
            <div className="border-sky-800 dark:from-inherit lg:static w-full rounded-xl border px-2 py-1.5 bg-zinc-800/30">
              <button className="font-mono flex items-center justify-center space-x-4 font-bold w-full">
                <span>Execute Trade</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
