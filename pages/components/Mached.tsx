import React from "react";

function Mached() {
  return (
    <div className="relative group w-full md:max-w-[47%] mt-4">
      <div className="absolute inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900  filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
      <div className="relative leading-none rounded-3xl bg-zinc-950 flex justify-center items-center">
        <div className="z-10 w-full items-start  font-mono text-sm flex flex-col border-neutral-800/50 from-inherit hover:border-neutral-900 lg:static rounded-3xl border bg-zinc-800/30 justify-center h-48">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 aboslute -rotate-12 -mt-10 text-[#750168]"
          >
            <path
              fillRule="evenodd"
              d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z"
              clipRule="evenodd"
            />
          </svg>
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

export default Mached;
