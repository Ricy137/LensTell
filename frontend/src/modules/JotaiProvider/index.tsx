"use client";
import { ReactNode, useEffect } from "react";
import { Provider, useAtom, useSetAtom } from "jotai";
import { useShowToast } from "@/components/Toast";
import { asyncAccountsAtom, accountsAtom } from "@/services/accounts";
import { errorMessage } from "@/utils/error";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
  ]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const JotaiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider>
      <AccountWrapper>
        <WagmiConfig config={config}>{children}</WagmiConfig>
      </AccountWrapper>
    </Provider>
  );
};

export default JotaiProvider;

const AccountWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [, initial] = useAtom(asyncAccountsAtom);
  const setAccount = useSetAtom(accountsAtom);
  const showToast = useShowToast();
  //get accounts connection and network information while rendering
  useEffect(() => {
    const initialize = async () => {
      try {
        await initial("initial");
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          const message = errorMessage(err);
          showToast({ content: message, type: "failed" });
        }
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts);
      });
    }
  }, []);
  return <>{children}</>;
};
