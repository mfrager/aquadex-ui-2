import React from "react";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
function Trades() {
  // data
  const tradeData = [
    {
      order: "Bid",
      taker: "ALy..FE6",
      maker: "4RD..tbU",
      timestamp: "2.05.23",
      quantity: "5.00",
      price: "0.7000",
    },
    {
      order: "Bid",
      taker: "ALy..FE6",
      maker: "4RD..tbU",
      timestamp: "2.05.23",
      quantity: "5.00",
      price: "0.7000",
    },
    {
      order: "Bid",
      taker: "ALy..FE6",
      maker: "4RD..tbU",
      timestamp: "2.05.23",
      quantity: "5.00",
      price: "0.7000",
    },
    {
      order: "Bid",
      taker: "ALy..FE6",
      maker: "4RD..tbU",
      timestamp: "2.05.23",
      quantity: "5.00",
      price: "0.7000",
    },
    {
      order: "Bid",
      taker: "ALy..FE6",
      maker: "4RD..tbU",
      timestamp: "2.05.23",
      quantity: "5.00",
      price: "0.7000",
    },
  ];
  return (
    <div className="relative group w-full mt-4">
      <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900 filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
      <div className="relative leading-none rounded-3xl flex items-center custom-border-1">
        <div className="flex items-start justify-center md:space-y-0 flex-col w-full hover:border-neutral-900 border-neutral-800/50 from-inherit lg:static rounded-3xl border bg-zinc-800/30 h-fit font-mono text-xs">
          <Square3Stack3DIcon className="w-8 h-8 aboslute -rotate-12 left-2 -mt-3 -mb-2 text-[#750168]"/>
          <div className="w-full flex justify-around px-4 py-2 text-slate-400/70">
            <span>Order</span>
            <span>Taker</span>
            <span>Maker</span>
            <span>Timestamp</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>
          {tradeData.map(
            ({ order, taker, maker, timestamp, quantity, price }, index) => (
              <div
                className="border-t-[0.5px] hover:border-neutral-900 border-neutral-800/50 w-full flex  justify-around px-4 py-2 hover:bg-neutral-800/20"
                key={index}
              >
                <span>{order}</span>
                <span>{taker}</span>
                <span>{maker}</span>
                <span>{timestamp}</span>
                <span>{quantity}</span>
                <span>{price}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Trades;
