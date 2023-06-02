import React from "react";
import { RectangleGroupIcon } from "@heroicons/react/24/solid";
function Matched() {
  return (
    <div className="relative group w-full lg:max-w-[49%] mt-4 h-fit">
      <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900  filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
      <div className="relative leading-none rounded-3xl bg-zinc-950 flex justify-center items-center custom-border-1">
        <div className="z-10 w-full items-start  font-mono text-sm flex flex-col border-neutral-800/50 from-inherit hover:border-neutral-900 lg:static rounded-3xl border bg-zinc-800/30 justify-center h-48">
          <RectangleGroupIcon className="w-8 h-8 aboslute -rotate-12 -mt-10 text-[#750168]" />
          <div className="flex w-[90%] rounded-2xl self-center h-24 border my-4 border-neutral-800/50 items-center justify-around">
            <div className="flex flex-col items-center">
              <span>ATX</span>
              <div className="w-12 h-12 border border-neutral-800/50 rounded-xl"></div>
            </div>

            <div className=" flex flex-col w-[70%] gap-2">
              <div className="border flex border-neutral-800/50 rounded-xl h-10 text-center items-center justify-center text-sky-800">
                {"-- -- --"}
              </div>
              <div className=" dark:from-inherit lg:static w-full  flex items-end justify-end ">
                <button className="font-mono flex items-center justify-center space-x-4 font-bold border-violet-900 py-1.5 border rounded-xl  px-2 w-32">
                  <span>Withdraw</span>
                </button>
              </div>
            </div>
          </div>
          <span className="mx-auto text-slate-400/70">Matched Orders</span>
        </div>
      </div>
    </div>
  );
}

export default Matched;
