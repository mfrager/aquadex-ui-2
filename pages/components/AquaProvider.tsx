import React, { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import $solana from "@/atellix/solana-client"
import bs58 from 'bs58'
import bus from "@/emitter"

const AquaProvider = ({ children }) => {
    const { publicKey, wallet } = useWallet()
    const [isConnected, setIsConnected] = useState(false)
    const [currentMarket, setCurrentMarket] = useState(null)
    const [marketReady, setMarketReady] = useState(false)
    const [marketRefresh, setMarketRefresh] = useState(false)
    const [marketAccounts, setMarketAccounts] = useState({})
    const [marketSummary, setMarketSummary] = useState({})
    const [orderbookData, setOrderbookData] = useState({})

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

    async function updateOrderbook(marketData) {
        if (!marketRefresh) {
            setMarketRefresh(true)
            const maxOrders = 10
            const orderBook = await $solana.getAccountInfo(marketData.orders)
            const bookData = $solana.decodeOrderBook(orderBook.data)
            console.log(bookData)
            setOrderbookData({
                'bids': (bookData.bids.length > maxOrders) ? bookData.bids.slice(0, maxOrders) : bookData.bids,
                'asks': (bookData.asks.length > maxOrders) ? bookData.asks.slice(0, maxOrders) : bookData.asks,
            })
            console.log('Orderbook loaded')
            $solana.provider.connection.onAccountChange(marketData.orders, (accountInfo, context) => {
                const bookUpdate = $solana.decodeOrderBook(accountInfo.data)
                setOrderbookData({
                    'bids': (bookUpdate.bids.length > maxOrders) ? bookUpdate.bids.slice(0, maxOrders) : bookUpdate.bids,
                    'asks': (bookUpdate.asks.length > maxOrders) ? bookUpdate.asks.slice(0, maxOrders) : bookUpdate.asks,
                })
                console.log('Orderbook updated')
            })
        }
    }

    async function setupAquaDEX(marketPK, walletPK) {
        console.log(marketPK.toString())
        const marketData = await $solana.getAccountData('aqua-dex', 'market', marketPK)
        console.log(marketData)
        const marketStateData = await $solana.getAccountData('aqua-dex', 'marketState', marketData.state)
        console.log(marketStateData)
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
        setMarketSummary({
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
            'mktTokenDecimals': new Number(marketData.mktDecimals),
            'prcTokenDecimals': new Number(marketData.prcDecimals),
            'mktTokenScale': 10 ** new Number(marketData.mktDecimals),
            'prcTokenScale': 10 ** new Number(marketData.prcDecimals),
        })
        setMarketRefresh(false)
        await updateOrderbook(marketData)
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

    const connectWallet = new Promise((resolve, reject) => {
        bus.on('setIsConnected', (connected, pkey) => {
            if (connected) {
                resolve(pkey)
            }
        })
    })
    const connectMarket = new Promise((resolve, reject) => {
        bus.on('setMarketSelected', (market) => {
            if (market) {
                resolve(market)
            }
        })
    })

    useEffect(() => {
        setIsConnected(publicKey !== null)
    }, [publicKey])

    useEffect(() => {
        console.log('Connected: ' + isConnected)
        if (isConnected) {
            bus.emit('setIsConnected', isConnected, publicKey)
            $solana.getProvider({
                publicKey: publicKey,
                signTransaction: wallet.signTransaction,
                signAllTransactions: wallet.signAllTransactions,
            })
            //console.log($solana.program)
        }
    }, [isConnected])

    Promise.all([connectWallet, connectMarket]).then((result) => {
        console.log('Wallet: ' + result[0].toString())
        const marketAddr = result[1].address
        const marketKeyData = bs58.decode(marketAddr)
        if (marketKeyData.length === 32) {
            const marketPK = new PublicKey(marketAddr)
            setupAquaDEX(marketPK, result[0]).then(() => {
                setMarketReady(true)
            }).catch((error) => {
                console.log(error)
            })
        }
    }).catch((error) => {
        console.log(error)
    })

    bus.on('setMarketSelected', (market) => {
        if (market) {
            setCurrentMarket(market)
            if (marketReady && publicKey !== null) {
                console.log('Reload Market')
                const marketAddr = market.marketAddr
                const marketKeyData = bs58.decode(marketAddr)
                if (marketKeyData.length === 32) {
                    const marketPK = new PublicKey(marketAddr)
                    setMarketReady(false)
                    setupAquaDEX(marketPK, publicKey).then(() => {
                        setMarketReady(true)
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }
        }
    })

    return <>{children}</>
}

export default AquaProvider

