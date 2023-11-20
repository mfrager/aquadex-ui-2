import React, { useEffect, useState } from 'react'
import { useInterval } from 'react-interval-hook'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { DateTime } from 'luxon'
import { useBus, useListener } from 'react-bus'
import $solana from "@/atellix/solana-client"
import bs58 from 'bs58'

const AquaProvider = ({ children }) => {
    const { publicKey, wallet, signTransaction, signAllTransactions } = useWallet()
    const [isConnected, setIsConnected] = useState(false)
    const [currentMarket, setCurrentMarket] = useState(null)
    const [marketReady, setMarketReady] = useState(false)
    const [marketRefresh, setMarketRefresh] = useState(false)
    const [marketAccounts, setMarketAccounts] = useState({})
    const [marketSummary, setMarketSummary] = useState({})
    const [tradeList, setTradeList] = useState([])
    const [settleList, setSettleList] = useState([])
    const [orderbookData, setOrderbookData] = useState({})
    const [tokenList, setTokenList] = useState([
        { abbr: '', amount: '', name: '', symbol: '', create: false },
        { abbr: '', amount: '', name: '', symbol: '', create: false },
    ])
    const { start, isActive } = useInterval(
        () => {
            console.log('Refresh...')
            bus.emit('refresh', true)
        },
        60000,
        {
            autoStart: false,
            immediate: false,
            selfCorrecting: false,
        }
    )
    const bus = useBus()
    var logUpdates = {}
    var tradeUpdates = false

    $solana.init()
    $solana.loadProgram('aqua-dex')

    async function getMarketMetadata(marketPK) {
        const url = 'https://aqua-dev1.atellix.net/v1/market_info'
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'market': marketPK.toString(),
            })
        })
        if (res.ok) {
            return await res.json()
        } else {
            return {}
        }
    }

    async function updateTradeLog(logSpec) {
        var list = []
        for (var i = 0; i < logSpec.logs.length; i++) {
            var item = logSpec.logs[i]
            item['maker'] = item['maker'].toString()
            item['taker'] = item['taker'].toString()
            var lastTs = new Date(item['ts'] * 1000)
            var lastDt = DateTime.fromJSDate(lastTs)
            item['ts'] = lastDt.toLocaleString(DateTime.DATETIME_SHORT)
            list.push(item)
        }
        setTradeList(list)
    }

    async function updateBalance(mint, wallet, scale, decimals, idx) {
        var tkl = [tokenList[0], tokenList[1]]
        const tokens = await $solana.getTokenBalance(mint, wallet)
        if (tokens === '0') {
            const hasAccount = await $solana.hasTokenAccount(mint, wallet)
            //console.log('Has Account: ' + mint + ': ' + hasAccount)
            if (!hasAccount) {
                tkl[idx]['create'] = true
            } else {
                tkl[idx]['create'] = false
            }
        }
        //console.log(mint.toString() + ' ' + tokens + ' ' + scale + ' ' + decimals)
        var bal = new Number(tokens / scale)
        bal = bal.toLocaleString(undefined, {
            'minimumFractionDigits': decimals,
            'maximumFractionDigits': decimals,
        })
        tkl[idx]['amount'] = bal
        setTokenList(tkl)
    }

    async function settlementEntries(firstLog, walletPK, marketAddr) {
        var nextLog = firstLog.toString()
        var logAccounts = []
        var entries = []
        var vault = await $solana.getUserVault(new PublicKey(marketAddr), walletPK)
        if (vault) {
            logAccounts.push(vault.publicKey)
            entries.push({
                'vault': vault.publicKey,
                'mkt_token_balance': new Number(vault.mktTokens),
                'prc_token_balance': new Number(vault.prcTokens),
            })
        }
        do {
            try {
                var logPK = new PublicKey(nextLog)
                var logInfo = await $solana.getAccountInfo(logPK)
                logAccounts.push(logPK)
                var logData = $solana.decodeSettlementLog(logInfo.data, walletPK)
                for (var i = 0; i < logData.entries.length; i++) {
                    var entry = logData.entries[i]
                    entry['log'] = logPK
                    entry['prev'] = new PublicKey(logData.header.prev)
                    entry['next'] = new PublicKey(logData.header.next)
                    entries.push(entry)
                }
                nextLog = logData.header.next
            } catch (error) {
                console.log('Error reading settlement logs: ' + error)
                nextLog = '11111111111111111111111111111111'
            }
        } while (nextLog !== '11111111111111111111111111111111')
        setSettleList(entries)
        return logAccounts
    }

    async function updateMarket(marketSpec) {
        if (!marketRefresh) {
            setMarketRefresh(true)
            const marketData = marketSpec.marketData
            const walletPK = marketSpec.userWallet

            // Tokens
            const mktScale = marketSpec.mktTokenScale
            const mktDecimals = marketSpec.mktTokenDecimals
            const prcScale = marketSpec.prcTokenScale
            const prcDecimals = marketSpec.prcTokenDecimals
            var tkl = tokenList
            tkl[0].name = marketSpec.mktTokenLabel
            tkl[1].name = marketSpec.prcTokenLabel
            tkl[0].symbol = marketSpec.mktTokenSymbol
            tkl[1].symbol = marketSpec.prcTokenSymbol
            if (marketSpec.marketMeta.metadata.marketToken.image) {
                tkl[0].image = marketSpec.marketMeta.metadata.marketToken.image
            }
            if (marketSpec.marketMeta.metadata.pricingToken.image) {
                tkl[1].image = marketSpec.marketMeta.metadata.pricingToken.image
            }
            Promise.all([
                updateBalance(marketData.mktMint, walletPK, mktScale, mktDecimals, 0),
                updateBalance(marketData.prcMint, walletPK, prcScale, prcDecimals, 1),
                settlementEntries(marketData.settle0, walletPK, marketSpec.marketAddr),
            ]).then((results) => {
                setTokenList(tkl)
                var logAccounts = results[2]
                for (var i = 0; i < logAccounts.length; i++) {
                    var k = logAccounts[i].toString()
                    if (!logUpdates[k]) {
                        logUpdates[k] = true
                        $solana.provider.connection.onAccountChange(logAccounts[i], async (accountInfo, context) => {
                            console.log('Updated settlement log')
                            await settlementEntries(marketData.settle0, walletPK, marketSpec.marketAddr)
                        })
                    }
                }
            })
            
            // Orderbook
            const maxOrders = 10
            const orderBook = await $solana.getAccountInfo(marketData.orders)
            const bookData = $solana.decodeOrderBook(orderBook.data)
            //console.log(bookData)
            setOrderbookData({
                'bids': (bookData.bids.length > maxOrders) ? bookData.bids.slice(0, maxOrders) : bookData.bids,
                'asks': (bookData.asks.length > maxOrders) ? bookData.asks.slice(0, maxOrders) : bookData.asks,
            })
            //console.log('Orderbook loaded')
            $solana.provider.connection.onAccountChange(marketData.orders, (accountInfo, context) => {
                const bookUpdate = $solana.decodeOrderBook(accountInfo.data)
                setOrderbookData({
                    'bids': (bookUpdate.bids.length > maxOrders) ? bookUpdate.bids.slice(0, maxOrders) : bookUpdate.bids,
                    'asks': (bookUpdate.asks.length > maxOrders) ? bookUpdate.asks.slice(0, maxOrders) : bookUpdate.asks,
                })
                console.log('Orderbook updated')
            })

            // Trade Log
            const tradeLogMax = 10
            const tradeLogPK = marketData.tradeLog
            const tradeLogInfo = await $solana.getAccountInfo(tradeLogPK)
            const tradeLogSpec = $solana.decodeTradeLog(tradeLogInfo.data, tradeLogMax)
            updateTradeLog(tradeLogSpec)
            if (!tradeUpdates) {
                tradeUpdates = true
                $solana.provider.connection.onAccountChange(tradeLogPK, async (accountInfo, context) => {
                    const tradeLogUpdate = $solana.decodeTradeLog(accountInfo.data, tradeLogMax)
                    updateTradeLog(tradeLogUpdate)
                    console.log('Trade Log updated')
                }) 
            }
        }
    }

    async function setupAquaDEX(marketPK, walletPK) {
        console.log('Setup AquaDEX - Market: ' + marketPK.toString() + ' - Wallet: ' + walletPK.toString())
        const marketData = await $solana.getAccountData('aqua-dex', 'market', marketPK)
        //console.log(marketData)
        const marketStateData = await $solana.getAccountData('aqua-dex', 'marketState', marketData.state)
        //console.log(marketStateData)
        const marketAgent = await $solana.programAddress([marketPK.toBuffer()], $solana.program['aqua-dex'].programId)
        const marketAgentPK = new PublicKey(marketAgent.pubkey)
        const tokenVault1 = await $solana.associatedTokenAddress(marketAgentPK, marketData.mktMint)
        const tokenVault2 = await $solana.associatedTokenAddress(marketAgentPK, marketData.prcMint)
        const userToken1 = await $solana.associatedTokenAddress(walletPK, marketData.mktMint)
        const userToken2 = await $solana.associatedTokenAddress(walletPK, marketData.prcMint)
        const marketMeta = await getMarketMetadata(marketPK)
        setMarketAccounts({
            'market': marketPK,
            'state': marketData.state,
            'agent': marketAgentPK,
            'user': walletPK,
            'userMktToken': new PublicKey(userToken1.pubkey),
            'userPrcToken': new PublicKey(userToken2.pubkey),
            'mktVault': new PublicKey(tokenVault1.pubkey),
            'prcVault': new PublicKey(tokenVault2.pubkey), 
            'orders': marketData.orders,
            'tradeLog': marketData.tradeLog,
            'settleA': marketStateData.settleA,
            'settleB': marketStateData.settleB,
        })
        const marketSpec = {
            'marketLoading': false,
            'marketReady': true,
            'marketTitle': marketMeta.name || 'SPL Token Swap Market',
            'marketAddr': marketPK.toString(),
            'marketData': marketData,
            'marketMeta': marketMeta,
            'userWallet': walletPK,
            'mktTokenLabel': marketMeta.metadata.marketToken.name || 'Market Token',
            'prcTokenLabel': marketMeta.metadata.pricingToken.name || 'Pricing Token',
            'mktTokenSymbol': marketMeta.metadata.marketToken.symbol || 'MKT',
            'prcTokenSymbol': marketMeta.metadata.pricingToken.symbol || 'PRC',
            'mktTokenDecimals': Math.min(parseInt(marketData.mktDecimals), 4),
            'prcTokenDecimals': Math.min(parseInt(marketData.prcDecimals), 4),
            'mktTokenScale': 10 ** new Number(marketData.mktDecimals),
            'prcTokenScale': 10 ** new Number(marketData.prcDecimals),
        }
        setMarketSummary(marketSpec)
        setMarketRefresh(false)
        await updateMarket(marketSpec)
    }

    async function startAquaDEX() {
        try {
            const marketAddr = currentMarket.address
            const marketKeyData = bs58.decode(marketAddr)
            if (marketKeyData.length === 32) {
                const marketPK = new PublicKey(marketAddr)
                await setupAquaDEX(marketPK, publicKey)
                setMarketReady(true)
            }
        } catch(error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        bus.emit('setMarketAccounts', marketAccounts)
    }, [marketAccounts])

    useEffect(() => {
        bus.emit('setMarketSummary', marketSummary)
    }, [marketSummary])

    useEffect(() => {
        bus.emit('setOrderbookData', orderbookData)
    }, [orderbookData])

    useEffect(() => {
        bus.emit('setSettleList', settleList)
    }, [settleList])

    useEffect(() => {
        bus.emit('setTradeList', tradeList)
    }, [tradeList])

    useEffect(() => {
        bus.emit('setTokenList', tokenList)
    }, [tokenList])

    useListener('setMarketSelected', (market) => {
        console.log('Select Market')
        console.log(market)
        if (market) {
            setCurrentMarket(market)
            setIsConnected(isConnected)
        }
    })

    useEffect(() => {
        setIsConnected(publicKey !== null)
    }, [publicKey])

    useEffect(() => {
        console.log('Connected: ' + isConnected)
        if (isConnected && currentMarket) {
            bus.emit('setIsConnected', {'connected': isConnected, 'publicKey': publicKey})
            //console.log(wallet)
            $solana.getProvider({
                publicKey: publicKey,
                signTransaction: function (transaction) { return signTransaction(transaction) },
                signAllTransactions: function (transactions) { return signAllTransactions(transactions) }
            })
            //console.log($solana.program)
            if (!isActive()) {
                start()
                startAquaDEX().then(() => {})
            }
        }
    }, [isConnected])


    return <>{children}</>
}

export default AquaProvider

