import { Checkbox, Dropdown, Input, Progress } from "@nextui-org/react"
import React, { useEffect, useState } from 'react'
import bus from "@/emitter"
//import $solana from "@/atellix/solana-client"

function Order() {
    const [orderType, setOrderType] = useState('bid')
    const [orderMode, setOrderMode] = useState('market_price')
    const [marketSummary, setMarketSummary] = useState({
        'mktTokenSymbol': '',
        'prcTokenSymbol': '',
    })
    bus.on('setMarketSummary', (mktSummary) => {
        if (mktSummary) {
            setMarketSummary(mktSummary)
        }
    })
    return (
        <div className="relative group w-full mt-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900 filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
            <div className="relative leading-none rounded-3xl flex items-center">
                <div className="z-10 w-full items-center px-4 py-2 font-mono text-sm flex flex-col border-neutral-800/50 from-inherit lg:static rounded-3xl border justify-center space-y-4 custom-border-1">
                    {" "}
                    {orderType === 'bid' ? (
                        <div className="w-full flex items-center gap-2 justify-between mt-2">
                            <div className="border-emerald-800 dark:from-inherit lg:static rounded-xl border px-2 py-1.5 bg-emerald-900/70 w-full">
                                <button className="font-mono flex items-center justify-center space-x-4 font-bold w-full">
                                    <span>Buy {marketSummary.mktTokenSymbol}</span>
                                </button>
                            </div>
                            <div className="border-sky-800 dark:from-inherit lg:static w-full rounded-xl border px-2 py-1.5 bg-sky-900/20">
                                <button className="font-mono flex items-center justify-center space-x-4 font-bold w-full" onClick={() => setOrderType('ask')}>
                                    <span>Sell {marketSummary.mktTokenSymbol}</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex items-center gap-2 justify-between mt-2">
                            <div className="border-emerald-800 dark:from-inherit lg:static rounded-xl border px-2 py-1.5 bg-emerald-900/20 w-full">
                                <button className="font-mono flex items-center justify-center space-x-4 font-bold w-full" onClick={() => setOrderType('bid')}>
                                    <span>Buy {marketSummary.mktTokenSymbol}</span>
                                </button>
                            </div>
                            <div className="border-sky-800 dark:from-inherit lg:static w-full rounded-xl border px-2 py-1.5 bg-sky-900/70">
                                <button className="font-mono flex items-center justify-center space-x-4 font-bold w-full">
                                    <span>Sell {marketSummary.mktTokenSymbol}</span>
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Order type */}
                    <div className="flex flex-col w-full space-y-2">
                        <span>Order type</span>
                        <Dropdown isBordered>
                            <Dropdown.Button size={"lg"} className="font-mono">
                                {orderMode === 'market_price' ? (<span className="text-slate-400/70">Total Price</span>) : null}
                                {orderMode === 'market_quantity' ? (<span className="text-slate-400/70">Total Quantity</span>) : null}
                                {orderMode === 'limit' ? (<span className="text-slate-400/70">Quantity At Price</span>) : null}
                            </Dropdown.Button>
                            <Dropdown.Menu className="font-mono" color="secondary" onAction={(key) => setOrderMode(key)}>
                                <Dropdown.Item key="market_price">Total Price</Dropdown.Item>
                                <Dropdown.Item key="market_quantity">Total Quantity</Dropdown.Item>
                                <Dropdown.Item key="limit">Quantity At Price</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {/* Quantity */}
                    {orderMode === 'market_price' ? (
                        <div className="w-full flex justify-between gap-2">
                            <div className="flex flex-col space-y-2 w-full">
                                <div>Quantity<span className="float-right mr-5">{marketSummary.mktTokenSymbol}</span></div>
                                <input disabled className="bg-[#16181a] w-full h-10 px-4 flex items-center rounded-lg text-slate-400/70"></input>
                            </div>
                            <div className="flex flex-col space-y-2 w-full">
                                <div>Price<span className="float-right mr-5">{marketSummary.prcTokenSymbol}</span></div>
                                <input className="bg-[#16181a] w-full h-10 px-4 flex items-center rounded-lg text-slate-400/70 border-solid border-2 border-slate-500"></input>
                            </div>
                        </div>
                    ) : null}
                    {orderMode === 'market_quantity' ? (
                        <div className="w-full flex justify-between gap-2">
                            <div className="flex flex-col space-y-2 w-full">
                                <div>Quantity<span className="float-right mr-5">{marketSummary.mktTokenSymbol}</span></div>
                                <input className="bg-[#16181a] w-full h-10 px-4 flex items-center rounded-lg text-slate-400/70 border-solid border-2 border-slate-500"></input>
                            </div>
                            <div className="flex flex-col space-y-2 w-full">
                                <div>Price<span className="float-right mr-5">{marketSummary.prcTokenSymbol}</span></div>
                                <input disabled className="bg-[#16181a] w-full h-10 px-4 flex items-center rounded-lg text-slate-400/70"></input>
                            </div>
                        </div>
                    ) : null}
                    {orderMode === 'limit' ? (
                        <div className="w-full flex justify-between gap-2">
                            <div className="flex flex-col space-y-2 w-full">
                                <div>Quantity<span className="float-right mr-5">{marketSummary.mktTokenSymbol}</span></div>
                                <input className="bg-[#16181a] w-full h-10 px-4 flex items-center rounded-lg text-slate-400/70 border-solid border-2 border-slate-500"></input>
                            </div>
                            <div className="flex flex-col space-y-2 w-full">
                                <div>Price<span className="float-right mr-5">{marketSummary.prcTokenSymbol}</span></div>
                                <input className="bg-[#16181a] w-full h-10 px-4 flex items-center rounded-lg text-slate-400/70 border-solid border-2 border-slate-500"></input>
                            </div>
                        </div>
                    ) : null}
                    {/* Chek */}
                    <div className="flex flex-col space-y-2 items-start w-full justify-start">
                        {" "}
                        <div className="border-sky-800 dark:from-inherit lg:static w-full rounded-xl border px-2 py-1.5 bg-zinc-800/30 mb-2">
                            <button className="font-mono flex items-center justify-center space-x-4 font-bold w-full">
                                <span>Execute Trade</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
