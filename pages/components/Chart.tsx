import React from "react";
import { Dropdown } from "@nextui-org/react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

function Chart() {
  return (
    <div className="relative group w-full  xl:max-w-[66%] mt-4">
      <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-900  via-sky-600 to-violet-900  filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
      <div className="relative leading-none rounded-3xl flex items-center custom-border-1">
        <div className="z-10 w-full items-center px-4 py-2 font-mono text-sm flex flex-col border-neutral-800/50 from-inherit lg:static rounded-3xl border space-y-2 h-96 justify-center">
          <div className="flex w-full items-start mt-3">
            <Dropdown isBordered>
              <div className="border border-neutral-800 rounded-xl ">
                <Dropdown.Button
                  size={"sm"}
                  className="font-mono"
                  color={"primary"}
                >
                  <span className="pr-2">1min</span>
                </Dropdown.Button>
              </div>

              <Dropdown.Menu className="font-mono" color="secondary">
                <Dropdown.Item key="new">1h</Dropdown.Item>
                <Dropdown.Item key="copy">24h</Dropdown.Item>
                <Dropdown.Item key="edit">All</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <ArrowTrendingUpIcon className="w-full h-full text-white/60" />
        </div>
      </div>
    </div>
  );
}

export default Chart;
