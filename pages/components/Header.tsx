import React, { useEffect, useState } from "react";
import { Dropdown } from "@nextui-org/react";
import LoginButton from "./LogInButton";
import { ClockIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { useBus } from 'react-bus'

function Header({marketList, marketMap}) {
    const [marketSelected, setMarketSelected] = useState(null)
    const [marketName, setMarketName] = useState('')
    const bus = useBus()

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
            </div>
        </div>
    )
}

export default Header
