import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import WalletData from "../../interfaces/wallet-data-interface";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { getEmbeddedConnectedWallet } from "@privy-io/react-auth";

export const useUserInfo = (): WalletData | undefined => {
  const [walletData, setWalletData] = useState<WalletData>();
  const { authenticated, ready, logout, login }: any = usePrivy();
  const { wallets } = useWallets();

  useEffect(() => {
    const fetchWalletData = async () => {
      const isEmbedded =
        getEmbeddedConnectedWallet(wallets) === null ? false : true;
      console.log(isEmbedded);
      if (wallets[0] && ready && authenticated) {
        const provider = await wallets[0]?.getEthersProvider();
        const signer = provider.getSigner();
        await wallets[0].switchChain(8453);
        setWalletData({
          address: wallets[0]?.address,
          isLoggedIn: true,
          chainId: wallets[0]?.chainId,
          signer,
          action: logout,
          login,
          logout,
          isEmbedded,
        });
      } else {
        setWalletData({
          address: null,
          isLoggedIn: false,
          chainId: null,
          signer: null,
          action: login,
          img: null,
          login,
          logout,
          isEmbedded,
        });
      }
    };
    fetchWalletData();
  }, [wallets, ready, authenticated]);
  return walletData;
};

//ready checks to see if privy provider is ready to be used (we must use this)
