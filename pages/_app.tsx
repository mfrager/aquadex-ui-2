import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

import React, { useMemo, useEffect } from "react";
import {
    CoinbaseWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { Provider as BusProvider } from 'react-bus'
import AquaProvider from "./components/AquaProvider";

const theme = createTheme({
    type: "dark",
    theme: {
        colors: {
            primary: "rgb(39 39 42 / 0.3)",
            secondary: "#750168",
            error: "#FCC5D8",
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new CoinbaseWalletAdapter(),
            new TorusWalletAdapter(),
        ],
        [network]
    );
    return (
        <NextUIProvider theme={theme}>
            <BusProvider>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} autoConnect={true}>
                        <WalletModalProvider>
                            <AquaProvider>
                                <Component {...pageProps} />
                            </AquaProvider>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </BusProvider>
        </NextUIProvider>
    );
}
