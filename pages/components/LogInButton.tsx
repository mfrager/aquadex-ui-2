import dynamic from "next/dynamic";
import React from "react";

const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

function LoginButton() {
  return (
    <div className="rounded-xl leading-none flex items-center justify-center border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900/40 duration-700 w-40 hover:border-neutral-800/50 hover:text-zinc-300">
      <WalletMultiButtonDynamic
        style={{
          height: 34,
          fontSize: 12,
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "normal",
          background: "transparent",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}

export default LoginButton;
