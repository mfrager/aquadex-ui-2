import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import $solana from "@/atellix/solana-client";

const AquaProvider = ({ children }) => {
    const { publicKey, wallet } = useWallet();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        setIsConnected(publicKey !== null);
    }, [publicKey]);

    useEffect(() => {
        console.log('Connected: ' + isConnected);
        if (isConnected) {
            $solana.getProvider({
                publicKey: publicKey,
                signTransaction: wallet.signTransaction,
                signAllTransactions: wallet.signAllTransactions,
            });
        }
    }, [isConnected]);
    return <>{children}</>;
};

export default AquaProvider;

