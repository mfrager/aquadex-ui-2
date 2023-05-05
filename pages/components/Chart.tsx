import React from "react";
import { Dropdown } from "@nextui-org/react";

function Chart() {
  return (
    <div className="relative group w-full  md:max-w-[66%] mt-4">
      <div className="absolute inset-1 bg-gradient-to-r from-fuchsia-900  via-sky-600 to-violet-900  filter blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>
      <div className="relative leading-none rounded-3xl bg-zinc-950 flex items-center">
        <div className="z-10 w-full items-center px-4 py-2 font-mono text-sm flex flex-col border-neutral-800/50 from-inherit hover:border-neutral-900 lg:static rounded-3xl border bg-zinc-800/30 space-y-2 h-96 justify-center">
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
                {/*   <Dropdown.Item key="delete" color="error">
                  Delete file
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-full h-full text-white/60"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
        </div>{" "}
      </div>
    </div>
  );
}

export default Chart;
