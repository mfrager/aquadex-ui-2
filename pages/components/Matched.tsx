import React, { useEffect, useState } from 'react'
import { RectangleGroupIcon } from "@heroicons/react/24/solid"
import bus from "@/emitter"
function Matched() {
    const [marketOrder, setMarketOrder] = useState([])
    const [marketSummary, setMarketSummary] = useState({})
    bus.on('setMarketSummary', (mktSummary) => {
        if (mktSummary) {
            setMarketSummary(mktSummary)
        }
    })
    bus.on('setOrderbookData', (orderbookData) => {
        console.log(marketSummary)
        if (marketSummary.userWallet && marketSummary.marketMeta && orderbookData && 'bids' in orderbookData && 'asks' in orderbookData) {
            var orderMap = {}
            var orderItems = []
            const userWallet = marketSummary.userWallet.toString()
            orderbookData.bids.forEach((order) => {
                if (order.owner === userWallet) {
                    orderMap[order.key] = order
                    orderItems.push(order.key)
                }
            })
            orderbookData.asks.forEach((order) => {
                if (order.owner === userWallet) {
                    orderMap[order.key] = order
                    orderItems.push(order.key)
                }
            })
            var itemList = []
            for (var i = 0; i < orderItems.length; i++) {
                var k = orderItems[i]
                var order = orderMap[k]
                var quantity = (new Number(order.amount / marketSummary.mktTokenScale)).toFixed(2)
                var price = (new Number(order.price / marketSummary.prcTokenScale)).toFixed(4)
                var item = {
                    'key': order.key,
                    'amount': quantity + ' @ ' + price,
                }
                if (order.type === 'bid') {
                    var total = new Number(order.amount / marketSummary.mktTokenScale)
                    total = total * new Number(order.price / marketSummary.prcTokenScale)
                    item['name'] = 'Bid'
                    item['total'] = total.toFixed(2)
                    item['symbol'] = marketSummary.prcTokenSymbol
                    if (marketSummary.marketMeta.metadata.pricingToken.image) {
                        item['image'] = marketSummary.marketMeta.metadata.pricingToken.image
                    }
                } else if (order.type === 'ask') {
                    var total = new Number(order.amount / marketSummary.mktTokenScale)
                    item['name'] = 'Ask'
                    item['total'] = total.toFixed(2)
                    item['symbol'] = marketSummary.mktTokenSymbol
                    if (marketSummary.marketMeta.metadata.marketToken.image) {
                        item['image'] = marketSummary.marketMeta.metadata.marketToken.image
                    }
                }
                itemList.push(item)
            }
            console.log(itemList)
            setMarketOrder(itemList)
        }
    })
    return (
        <div className="relative group w-full mt-4 h-fit">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900    filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
            <div className="relative leading-none rounded-3xl bg-zinc-950 flex justify-center items-center custom-border-1">
                <div className="z-10 w-full items-start font-mono text-sm flex flex-col border-neutral-800/50 from-inherit hover:border-neutral-900 lg:static rounded-3xl border bg-zinc-800/30 justify-center h-48">
                    <RectangleGroupIcon className="w-8 h-8 aboslute -rotate-12 -mt-10 text-[#750168]" />
                    <span className="mx-auto text-slate-400/70">Active Orders</span>
                    {marketOrder.map(
                        ({ image, symbol, total, amount, key }, index) => (
                            <div className="flex w-[90%] rounded-2xl self-center border justify-around m-2">
                                <div className="flex flex-col self-center">
                                    <img className="w-10 h-10 rounded-full" src={image} />
                                </div>
                                <div className="flex flex-col self-center">
                                    <div className="mt-2">
                                        <span>{amount}</span>
                                    </div>
                                    <div className="border flex border-neutral-800/50 rounded-xl text-center items-center justify-center text-sky-800 m-2">
                                        {total} {symbol}
                                    </div>
                                </div>
                                <div className="flex flex-col w-[50%] m-2">
                                    <div className=" dark:from-inherit lg:static w-full    flex items-end justify-end ">
                                        <button className="font-mono flex items-center justify-center space-x-4 font-bold border-violet-900 py-1.5 border rounded-xl    px-2 w-32">
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                    <span className="mx-auto text-slate-400/70 mt-5">Matched Orders</span>
                </div>
            </div>
        </div>
    )
}

export default Matched;
