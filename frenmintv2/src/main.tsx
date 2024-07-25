import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import WalletProvider from "./components/provider/privy/WalletProvider.tsx";
import WagmiReactProvider from "./components/provider/wagmi/WagmiReactProvider.tsx";

import "@radix-ui/themes/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme style={{ backgroundColor: "#02121d" }}>
      <WagmiReactProvider>
        <WalletProvider>
          <App />
        </WalletProvider>
      </WagmiReactProvider>
    </Theme>
  </React.StrictMode>
);

//color palete for ui
//background: #02121d
//text:#e4f5fd
//primary: #74c1f7
//secodnary: #09099b
//accent:#3515f2

//link to ui ex https://www.realtimecolors.com/?colors=e4f5fd-02121d-74c1f7-09099b-3515f2&fonts=Inter-Inter
//0x47F3b985C251Ab2027A97B2854cE393bAF8cA69A
