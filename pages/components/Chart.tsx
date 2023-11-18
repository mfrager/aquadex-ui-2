import dynamic from 'next/dynamic'
import { Dropdown } from "@nextui-org/react"
import React, { useEffect, useState } from 'react'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

function Chart() {
    const state = {
        options: {
            chart: {
                type: 'candlestick',
                width: '100vw',
                toolbar: {
                    show: false
                },
            },
            xaxis: {
                type: 'datetime',
                range: (60 * 60 * 1000),
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
            },
        },
        series: []
    }
    const [chartView, setChartView] = useState('v1m')
    const chartViewList = [
        {'id': 'v1m', 'name': '1 Min'},
        {'id': 'v3m', 'name': '3 Min'},
        {'id': 'v5m', 'name': '5 Min'},
        {'id': 'v15m', 'name': '15 Min'},
        {'id': 'v30m', 'name': '30 Min'},
        {'id': 'v1h', 'name': '1 Hr'},
        {'id': 'v2h', 'name': '2 Hr'},
        {'id': 'v4h', 'name': '4 Hr'},
        {'id': 'v6h', 'name': '6 Hr'},
        {'id': 'v8h', 'name': '8 Hr'},
        {'id': 'v12h', 'name': '12 Hr'},
        {'id': 'v1d', 'name': '1 Day'},
        {'id': 'v7d', 'name': '7 Day'},
        {'id': 'v30d', 'name': '30 Day'},
    ]
    const chartViewMap = Object.assign({}, ...chartViewList.map((x) => ({[x.id]: x.name})))
    const chartViewRange = {
        'v1m': (1000 * 60 * 60),
        'v3m': (1000 * 60 * 60 * 3),
        'v5m': (1000 * 60 * 60 * 6),
        'v15m': (1000 * 60 * 60 * 8),
        'v30m': (1000 * 60 * 60 * 12),
        'v1h': (1000 * 60 * 60 * 16),
        'v2h': (1000 * 60 * 60 * 24),
        'v4h': (1000 * 60 * 60 * 24),
        'v6h': (1000 * 60 * 60 * 48),
        'v8h': (1000 * 60 * 60 * 72),
        'v12h': (1000 * 60 * 60 * 72),
        'v1d': (1000 * 60 * 60 * 24 * 30),
        'v7d': (1000 * 60 * 60 * 24 * 30 * 6),
        'v30d': (1000 * 60 * 60 * 24 * 30 * 12),
    }
    return (
        <div className="relative group w-full mt-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900 via-sky-600 to-violet-900 filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
            <div className="relative leading-none rounded-3xl flex items-center custom-border-1">
                <div className="z-10 w-full items-center px-4 py-2 font-mono text-sm flex flex-col border-neutral-800/50 from-inherit lg:static rounded-3xl border space-y-2 h-full justify-center">
                    <div className="flex w-full items-start mt-3">
                        <Dropdown isBordered>
                            <div className="border border-neutral-800 rounded-xl">
                                <Dropdown.Button size={"sm"} className="font-mono" color={"primary"}>
                                    <span className="pr-2">{chartViewMap[chartView]}</span>
                                </Dropdown.Button>
                            </div>
                            <Dropdown.Menu className="font-mono" color="secondary" onAction={(key) => setChartView(key)}>
                                {chartViewList.map(
                                    ({ id, name }, index) => (<Dropdown.Item key={id}>{name}</Dropdown.Item>)
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {typeof window !== 'undefined' ? (<ApexChart options={state.options} series={state.series} type="bar" className="w-full"/>) : null}
                </div>
            </div>
        </div>
    )
}

export default Chart
