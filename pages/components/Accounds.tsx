import React from "react";

function Accounds() {
  return (
    <div className="relative group w-full md:max-w-[50%] mt-4">
      <div className="absolute inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900  filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>

      <div className="relative leading-none rounded-3xl bg-zinc-950 flex">
        <div className="z-10 w-full items-start  font-mono text-sm flex flex-col border-neutral-800/50 from-inherit hover:border-neutral-900 lg:static rounded-3xl border bg-zinc-800/30 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 aboslute -rotate-12 -mt-3 -mb-2 text-[#750168]"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>

          <div className="w-full flex flex-col">
            {" "}
            <div className="flex px-4 h-8 w-full border-b items-center text-slate-400/70 border-neutral-800/50 text-center">
              <div className="w-[33%] border-r my-2 text-start  border-neutral-800/50">
                Token
              </div>
              <span className="w-[33%] border-r border-neutral-800/50">
                Symbol
              </span>
              <span className="w-[33%]">Balance</span>
            </div>
            <div className="flex px-4 h-12  w-full border-b items-center pr-4 border-neutral-800/50 text-center">
              <div className="w-[33%]  border-r justify-start items-center flex space-x-4 border-neutral-800/50">
                <img className="w-6 h-6 " src="/a.png" />
                <span>Atellix</span>
              </div>
              <span className="w-[33%] border-r my-2 border-neutral-800/50">
                ATX
              </span>
              <span className="w-[33%] flex space-x-2 justify-center">
                <span>123.45 </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-lime-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </span>
              </span>
            </div>
            <div className="flex px-4 h-12 w-full border-b items-center pr-4 border-neutral-800/50 text-center">
              <div className="w-[33%] border-r items-center justify-start flex space-x-4 border-neutral-800/50">
                <img
                  className="w-6 h-6 "
                  src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                />
                <span>USD Coin</span>
              </div>
              <span className="w-[33%] border-r my-2 border-neutral-800/50">
                USD
              </span>
              <span className="w-[33%] flex space-x-2 justify-center">
                <span>456.78 </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-lime-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </span>
              </span>
            </div>
            <div className="flex px-4 w-full h-12 items-center pr-4 border-neutral-800/50 text-center">
              <div className="w-[33%] border-r items-center justify-start flex space-x-4 border-neutral-800/50">
                <img
                  className="w-6 h-6  rounded-3xl"
                  src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
                />
                <span>Solana</span>
              </div>
              <span className="w-[33%] border-r my-2 border-neutral-800/50">
                SOL
              </span>
              <span className="w-[33%] flex space-x-2 justify-center">
                <span>200.22 </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-rose-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                    />
                  </svg>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounds;
