import React, { useEffect, useState } from "react";
import { Dropdown } from "@nextui-org/react";
import LoginButton from "./LogInButton";
import { ClockIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import bus from "@/emitter";

function Header({marketList, marketMap}) {
    const [marketSelected, setMarketSelected] = useState(null)
    const [marketName, setMarketName] = useState('')

    useEffect(() => {
        if (marketList.length > 0 && !marketName) {
            setMarketSelected(marketList[0].address)
        }
    }, [marketList])

    useEffect(() => {
        if (marketSelected in marketMap) {
            bus.emit('setMarketSelected', marketMap[marketSelected])
            setMarketName(marketMap[marketSelected].name)
        }
    }, [marketSelected])

    return (
        <div className="w-full">
            <div className="mt-4 w-full flex justify-left">
                <img src="/aquadex-logo-1.png" style={{width: '200px'}} />
            </div>
            <div className="w-full mt-4 space-y-2 overflow-visible">
                <div className="w-full flex justify-between items-start">
                    {" "}
                    <Dropdown isBordered>
                        <div className="border border-neutral-800 rounded-xl ">
                            <Dropdown.Button size={"sm"} className="font-mono" color={"primary"}>
                                <span className="pr-8">{marketName}</span>
                            </Dropdown.Button>
                        </div>
                        <Dropdown.Menu className="font-mono" color="secondary" items={marketList} onSelectionChange={setMarketSelected}>
                            {(item) => (
                                <Dropdown.Item key={item.address}>{item.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <LoginButton />
                </div>
                <div className="z-10 w-full items-center px-4 py-2 justify-between font-mono text-sm flex flex-col from-inherit lg:static space-y-2">
                    <div className="flex flex-wrap items-center w-full gap-2 md:gap-6">
                        <div className="flex justify-center items-center space-x-2">
                            <BanknotesIcon className="w-8 h-8 md:w-6 md:h-6 text-violet-900" />
                            <div className="flex flex-col md:flex-row md:space-x-2">
                                <span>Last Price</span>
                                <span className="text-white/50">0.70000</span>
                            </div>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            <ClockIcon className="w-8 h-8 md:w-6 md:h-6 text-violet-900" />

                            <div className="flex flex-col md:flex-row md:space-x-2">
                                <span>Last Trade</span>
                                <span className="text-white/50 ">02.05.2023/07:21:43</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
