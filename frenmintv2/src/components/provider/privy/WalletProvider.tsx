import { PrivyProvider } from "@privy-io/react-auth";
import ProviderInterface from "../../../interfaces/provider-interface";
function WalletProvider({ children }: ProviderInterface) {
  const appID = import.meta.env?.VITE_PRIVY_ID;
  return (
    <PrivyProvider
      appId={appID}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?key=18ea46",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

export default WalletProvider;
