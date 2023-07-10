import React, { useEffect, useState } from 'react'
import { UserCircleIcon } from "@heroicons/react/24/solid"
import {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid"
import bus from "@/emitter"
function Accounts() {
    // data
    const [data, setData] = useState([])
    bus.on('setTokenList', (tknList) => {
        if (tknList.length > 0) {
            const mktToken = tknList[0]
            const prcToken = tknList[1]
            const newList = [
                {
                    logo: mktToken.image,
                    name: mktToken.name,
                    symbol: mktToken.symbol,
                    balance: mktToken.amount,
                },
                {
                    logo: prcToken.image,
                    name: prcToken.name,
                    symbol: prcToken.symbol,
                    balance: prcToken.amount,
                }
            ]
            setData(newList)
        }
    })
    return (
        <div className="relative group w-full mt-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900 filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>

            <div className="relative leading-none rounded-3xl bg-zinc-950 flex custom-border-1">
                <div className="z-10 w-full items-start font-mono text-sm flex flex-col border-neutral-800/50 from-inherit lg:static rounded-3xl border">
                    <UserCircleIcon className="w-8 h-8 aboslute -rotate-12 -mt-3 -mb-2 text-[#750168]" />
                    <div className="w-full flex flex-col px-4 mb-3">
                        {" "}
                        <div className="flex h-8 w-full items-center text-slate-400/70 text-center">
                            <div className="w-[50%] border-r my-2 text-start border-neutral-800/50">
                                Token
                            </div>
                            <span className="w-[50%] text-right">Balance</span>
                        </div>
                        <table className="table-auto border-separate border-spacing-y-1.5">
                            <tbody>
                                {data.map(({ name, logo, symbol, balance }, index) => (
                                    <tr key={index}>
                                        <td><img className="w-8 h-8 rounded-full" src={logo} /></td>
                                        <td>{symbol}</td>
                                        <td className="text-right">{balance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accounts
