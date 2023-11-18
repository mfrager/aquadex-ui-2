import React, { useEffect, useState } from 'react'
import { Square3Stack3DIcon } from "@heroicons/react/24/solid"
import bus from "@/emitter"
function Book() {
    // data
    const [bidData, setBidData] = useState([])
    const [askData, setAskData] = useState([])
    const [marketSummary, setMarketSummary] = useState({})
    /*const bidData = [
        {
            maker: "4RD..tbU",
            quantity: "5.00",
            price: "0.7000",
        },
        {
            maker: "4RD..tbU",
            quantity: "5.00",
            price: "0.7000",
        },
    ]
    const askData = [
        {
            maker: "4RD..tbU",
            quantity: "5.00",
            price: "0.7000",
        },
        {
            maker: "4RD..tbU",
            quantity: "5.00",
            price: "0.7000",
        },
        {
            maker: "4RD..tbU",
            quantity: "5.00",
            price: "0.7000",
        },
    ]*/
    bus.on('setMarketSummary', (mktSummary) => {
        if (mktSummary) {
            setMarketSummary(mktSummary)
        }
    })
    bus.on('setOrderbookData', (orderbookData) => {
        if (orderbookData && 'bids' in orderbookData && 'asks' in orderbookData) {
            var bids = []
            orderbookData.bids.forEach((item) => {
                const maker = item.owner.substring(0, 4) + '...' + item.owner.substring(item.owner.length - 4, item.owner.length)
                const qty = (new Number(item.amount / marketSummary.mktTokenScale)).toFixed(2)
                const price = (new Number(item.price / marketSummary.prcTokenScale)).toFixed(4)
                bids.push({
                    'maker': maker,
                    'quantity': qty,
                    'price': price,
                })
            })
            setBidData(bids)
            var asks = []
            orderbookData.asks.forEach((item) => {
                const maker = item.owner.substring(0, 4) + '...' + item.owner.substring(item.owner.length - 4, item.owner.length)
                const qty = (new Number(item.amount / marketSummary.mktTokenScale)).toFixed(2)
                const price = (new Number(item.price / marketSummary.prcTokenScale)).toFixed(4)
                asks.push({
                    'maker': maker,
                    'quantity': qty,
                    'price': price,
                })
            })
            setAskData(asks)
        }
    })
    
    return (
        <div className="relative group w-full mt-3 mb-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900 filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
            <div className="relative leading-none rounded-3xl flex items-center custom-border-1">
                <div className="flex flex-wrap w-full font-mono text-sm">
                    <div className="flex flex-col w-full xl:max-w-[50%]">
                        <div className="text-center mt-2 text-lg">Bids</div>
                        <div className="flex justify-around px-4 py-2 text-slate-400/70">
                            <span>Maker</span>
                            <span>Quantity</span>
                            <span>Price</span>
                        </div>
                        {bidData.map(
                            ({ maker, quantity, price }, index) => (
                                <div
                                    className="border-t-[0.5px] hover:border-neutral-900 border-neutral-800/50 w-full flex justify-around px-4 py-2 hover:bg-neutral-800/20"
                                    key={index}
                                >
                                    <span>{maker}</span>
                                    <span>{quantity}</span>
                                    <span>{price}</span>
                                </div>
                            )
                        )}
                    </div>
                    <div className="flex flex-col w-full xl:max-w-[50%]">
                        <div className="text-center mt-2 text-lg">Asks</div>
                        <div className="flex justify-around px-4 py-2 text-slate-400/70">
                            <span>Price</span>
                            <span>Quantity</span>
                            <span>Maker</span>
                        </div>
                        {askData.map(
                            ({ maker, quantity, price }, index) => (
                                <div
                                    className="border-t-[0.5px] hover:border-neutral-900 border-neutral-800/50 w-full flex justify-around px-4 py-2 hover:bg-neutral-800/20"
                                    key={index}
                                >
                                    <span>{price}</span>
                                    <span>{quantity}</span>
                                    <span>{maker}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book
