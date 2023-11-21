import React from "react";

function Footer() {
  return (
    <div className="font-mono text-sm flex justify-between w-full items-center border-t border-neutral-800 pt-2 border-r border-l rounded-t-3xl -mb-4 h-14 px-4 ">
      <a href="https://atellix.network/" className="hover:text-fuchsia-800">Atellix Network</a>
      {" "}
      <button className="hover:text-fuchsia-800">MIT Licence</button>
    </div>
  );
}
export default Footer;
