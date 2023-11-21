import { Square3Stack3DIcon } from "@heroicons/react/24/solid"
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useListener } from 'react-bus'
import { DateTime } from 'luxon'

function shorten_pubkey(pubkey) {
    return pubkey.substring(0, 4) + '...' + pubkey.substring(pubkey.length - 4, pubkey.length)
}

function Trades() {
    const [showPanel, setShowPanel] = useState('all')
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [loadedTrades, setLoadedTrades] = useState(false)
    const [lastTx, setLastTx] = useState('')
    const [userTrades, setUserTrades] = useState([])
    const [marketSummary, setMarketSummary] = useState({
        'mktTokenSymbol': '',
        'prcTokenSymbol': '',
    })
    const [tradeData, setTradeData] = useState([])
    useListener('setTradeList', (trades) => {
        if (trades) {
            var tradeList = []
            for (var i = 0; i < trades.length; i++) {
                const item = trades[i]
                const ts = item.ts
                tradeList.push({
                    order: item.taker_side === 0 ? 'Bid' : 'Ask',
                    taker: shorten_pubkey(item.taker),
                    maker: shorten_pubkey(item.maker),
                    timestamp: ts,
                    quantity: (new Number(item.amount / marketSummary.mktTokenScale)).toFixed(2),
                    price: (new Number(item.price / marketSummary.prcTokenScale)).toFixed(4),
                })
            }
            setTradeData(tradeList)
        }
    })

    async function loadLastTx(mktSummary) {
        const baseURL = 'https://aqua-dev1.atellix.net/v1/'
        const url = baseURL + 'last_tx'
        const data = await fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'market': mktSummary.marketAddr,
                'user': mktSummary.userWallet,
            }),
        })
        var res = await data.json()
        if (data.status === 200 && res.result === 'ok') {
            return res.lastTx
        }
        return ''
    }

    async function loadTradeHistory(mktSummary, page) {
        const baseURL = 'https://aqua-dev1.atellix.net/v1/'
        const production = false
        const url = baseURL + 'trades'
        const data = await fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'market': mktSummary.marketAddr,
                'user': mktSummary.userWallet,
                'page': page,
            }),
        })
        var res = await data.json()
        var result = []
        var limit = 10
        if (data.status === 200 && res.result === 'ok') {
            var total = Math.floor(res.count / limit)
            if (res.count % limit !== 0) {
                total = total + 1
            }
            setTotalPages(total)
            for (var i = 0; i < res.trades.length; i++) {
                var item = res.trades[i]
                //console.log(item)
                var lastDt = DateTime.fromISO(item.ts)
                item.ts = lastDt.toLocaleString(DateTime.DATETIME_SHORT)
                item.link = 'https://explorer.solana.com/tx/' + item.sig
                if (!production) {
                    item.link = item.link + '?cluster=devnet'
                }
                if (item.role === 'maker') {
                    if (item.data.takerSide === '0') {
                        item.side = 'Sell'
                    } else {
                        item.side = 'Buy'
                    }
                    item.fee = (new Number(0)).toFixed(4)
                    item.rebate = (new Number(item.data.makerRebate) / new Number(mktSummary.prcTokenScale)).toFixed(4)
                } else { // taker
                    if (item.data.takerSide === '0') {
                        item.side = 'Buy'
                    } else {
                        item.side = 'Sell'
                    }
                    item.fee = (new Number(item.data.takerFee) / new Number(mktSummary.prcTokenScale)).toFixed(4)
                    item.rebate = (new Number(0)).toFixed(4)
                }
                item.quantity = new Number(item.data.amount)
                item.quantity = item.quantity / new Number(mktSummary.mktTokenScale)
                item.quantity = item.quantity.toFixed(4)
                item.price = new Number(item.data.price)
                item.price = item.price / new Number(mktSummary.prcTokenScale)
                item.price = item.price.toFixed(4)
                item.net_price = new Number(item.data.amount) / new Number(mktSummary.mktTokenScale)
                item.net_price = item.net_price * (new Number(item.data.price) / new Number(mktSummary.prcTokenScale))
                item.net_price = item.net_price.toFixed(4)
                result.push(item)
            }
        }
        setUserTrades(result)
    }

    function handlePageClick(event) {
        if (marketSummary.marketAddr) {
            var page = event.selected + 1
            console.log('Set Page: ' + page)
            setCurrentPage(page)
            loadTradeHistory(marketSummary, page).then(() => {})
        }
    }

    useListener('setMarketSummary', (mktSummary) => {
        if (mktSummary) {
            setMarketSummary(mktSummary)
            if (!loadedTrades && mktSummary.marketAddr) {
                setLoadedTrades(true)
                loadTradeHistory(mktSummary, currentPage).then(() => {})
                loadLastTx(mktSummary).then((data) => {
                    setLastTx(data)
                })
            }
        }
    })

    useListener('refresh', (data) => {
        if (marketSummary.marketAddr) {
            loadLastTx(marketSummary).then((nextTx) => {
                if (lastTx !== nextTx) {
                    setLastTx(nextTx)
                    loadTradeHistory(marketSummary, currentPage).then(() => {})
                }
            })
        }
    })

    return (
        <div className="relative group w-full mt-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900 filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
            <div className="relative leading-none rounded-3xl flex items-center custom-border-1">
                <div className="flex items-start justify-center md:space-y-0 flex-col w-full hover:border-neutral-900 border-neutral-800/50 from-inherit lg:static rounded-3xl border bg-zinc-800/30 h-fit font-mono text-xs">
                    <Square3Stack3DIcon className="w-8 h-8 aboslute -rotate-12 left-3 -mt-3 -mb-3 text-[#750168]"/>
                    {showPanel === 'all' ? (
                        <div className="w-full flex items-center gap-3 justify-between pl-3 pr-3">
                            <div className="border-sky-800 dark:from-inherit lg:static rounded-xl border px-3 py-1.5 bg-sky-900/70 w-full">
                                <button className="font-mono flex items-center justify-center space-x-3 font-bold w-full">
                                    <span>All Trades</span>
                                </button>
                            </div>
                            <div className="border-sky-800 dark:from-inherit lg:static w-full rounded-xl border px-3 py-1.5 bg-sky-900/20">
                                <button className="font-mono flex items-center justify-center space-x-3 font-bold w-full" onClick={() => setShowPanel('user')}>
                                    <span>My Trades</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex items-center gap-3 justify-between pl-3 pr-3">
                            <div className="border-sky-800 dark:from-inherit lg:static rounded-xl border px-3 py-1.5 bg-skiy-900/20 w-full">
                                <button className="font-mono flex items-center justify-center space-x-3 font-bold w-full" onClick={() => setShowPanel('all')}>
                                    <span>All Trades</span>
                                </button>
                            </div>
                            <div className="border-sky-800 dark:from-inherit lg:static w-full rounded-xl border px-3 py-1.5 bg-sky-900/70">
                                <button className="font-mono flex items-center justify-center space-x-3 font-bold w-full">
                                    <span>My Trades</span>
                                </button>
                            </div>
                        </div>
                    )}
                    {showPanel === 'all' ? (
                        <div className="w-full overflow-x-auto">
                            <table className="table-auto border-separate border-spacing-y-1.5 w-full min-w-max p-5">
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
                                                <td className="pr-3 text-center">{order}</td>
                                                <td className="pl-3 pr-3 text-center">{taker}</td>
                                                <td className="pl-3 pr-3 text-center">{maker}</td>
                                                <td className="pl-3 pr-3 text-center">{timestamp}</td>
                                                <td className="pl-3 pr-3 text-center">{quantity}</td>
                                                <td className="pl-3 text-right">{price}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="w-full overflow-x-auto">
                            <table className="table-auto border-separate border-spacing-y-1.5 w-full min-w-max p-5 pb-0">
                                <thead>
                                    <tr>
                                        <th className="text-left">Timestamp</th>
                                        <th>Action</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Net Price</th>
                                        <th>Fee</th>
                                        <th>Rebate</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userTrades.map(
                                        ({ ts, side, net_price, price, quantity, fee, rebate, link }, index) => (
                                            <tr key={index}>
                                                <td className="pr-3 text-left">{ts}</td>
                                                <td className="pl-3 pr-3 text-center">{side}</td>
                                                <td className="pl-3 pr-3 text-center">{price}</td>
                                                <td className="pl-3 pr-3 text-center">{quantity}</td>
                                                <td className="pl-3 pr-3 text-center">{net_price}</td>
                                                <td className="pl-3 pr-3 text-center">{fee}</td>
                                                <td className="pl-3 pr-3 text-center">{rebate}</td>
                                                <td className="pl-3 text-center"><a href={link} target="_blank">TX</a></td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <ReactPaginate
                                className="inline-flex -space-x-px text-sm mb-3"
                                pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                activeLinkClassName="flex items-center justify-center px-3 h-8 leading-tight bg-sky-900/70 text-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                previousLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-l-lg"
                                nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg"
                                breakLabel="..."
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={7}
                                pageCount={totalPages}
                                previousLabel="< Prev"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Trades
