import { Square3Stack3DIcon } from "@heroicons/react/24/solid"
import React, { useEffect, useState } from 'react'
import bus from "@/emitter"

function shorten_pubkey(pubkey) {
    return pubkey.substring(0, 4) + ' ' + pubkey.substring(pubkey.length - 4, pubkey.length)
}

function Trades() {
    const [marketSummary, setMarketSummary] = useState({
        'mktTokenSymbol': '',
        'prcTokenSymbol': '',
    })
    const [tradeData, setTradeData] = useState([])
    bus.on('setMarketSummary', (mktSummary) => {
        if (mktSummary) {
            setMarketSummary(mktSummary)
        }
    })
    bus.on('setTradeList', (trades) => {
        if (trades) {
            var tradeList = []
            for (var i = 0; i < trades.length; i++) {
                const item = trades[i]
                tradeList.push({
                    order: item.taker_side === 0 ? 'Bid' : 'Ask',
                    taker: shorten_pubkey(item.taker),
                    maker: shorten_pubkey(item.maker),
                    timestamp: item.ts,
                    quantity: (new Number(item.amount / marketSummary.mktTokenScale)).toFixed(2),
                    price: (new Number(item.price / marketSummary.prcTokenScale)).toFixed(4),
                })
            }
            setTradeData(tradeList)
        }
    })

    // data
    /*const tradeData = [
        {
            order: "Bid",
            taker: "ALy..FE6",
            maker: "4RD..tbU",
            timestamp: "2.05.23",
            quantity: "5.00",
            price: "0.7000",
        },
    ]*/
    return (
        <div className="relative group w-full mt-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900 filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
            <div className="relative leading-none rounded-3xl flex items-center custom-border-1">
                <div className="flex items-start justify-center md:space-y-0 flex-col w-full hover:border-neutral-900 border-neutral-800/50 from-inherit lg:static rounded-3xl border bg-zinc-800/30 h-fit font-mono text-xs">
                    <Square3Stack3DIcon className="w-8 h-8 aboslute -rotate-12 left-2 -mt-3 -mb-2 text-[#750168]"/>
                    <table className="table-auto border-separate border-spacing-y-1.5 w-full p-5">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Taker</th>
                                <th>Maker</th>
                                <th>Timestamp</th>
                                <th>Quantity</th>
                                <th className="text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tradeData.map(
                                ({ order, taker, maker, timestamp, quantity, price }, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{order}</td>
                                        <td className="text-center">{taker}</td>
                                        <td className="text-center">{maker}</td>
                                        <td className="text-center">{timestamp}</td>
                                        <td className="text-center">{quantity}</td>
                                        <td className="text-right">{price}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Trades
