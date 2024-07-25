import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useViewport from "@/hooks/view-port/useViewport";
import { getPoolTransactions } from "@/requests/defined-requests/defined-fi-calls";
import { useEffect, useState } from "react";
import ERC20_PAIRS from "../../../contracts/available-erc20-pairs";
import { useSwapPairs } from "../../../hooks/pairs/useSwapPairs";
import { useQuotes } from "../../../hooks/quotes/useQuotes";
import { useUserInfo } from "../../../hooks/wallet-info/useUserInfo";
import QuoteDropdown from "./subcomponents/QuoteDropdown";
import SmContent from "./subcomponents/SmContent";
import SwapCard from "./subcomponents/SwapCard";
import TxStatusAlert from "./subcomponents/TxStatusAlert";
import "./swap.css";
import KeyChart from "./key-chart/KeyChart";
import AddLpCard from "./subcomponents/AddLpCard";
import { getShareChartData } from "@/requests/friend-tech-api/friendtech-api-calls";
function Swap() {
  const dimensions = useViewport();
  const [isBuy, setIsBuy] = useState(true);
  const [currentERC1155, setCurrentERC1155] = useState<any | undefined>(null);
  const [currentERC20, setCurrentERC20] = useState<any | undefined>(
    ERC20_PAIRS[0]
  );
  const [searchInput, setSearchInput] = useState("");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(null);

  const [isTxRunning, setIsTxRunning] = useState<any | undefined>(false);
  const [txMessage, setTxMessage] = useState(null);
  const [approvalComplete, setApprovalComplete] = useState(false);
  console.log(currentERC1155);
  const userData = useUserInfo();
  const ERC1155Pairs = useSwapPairs(
    currentERC20.name,
    setCurrentERC1155,
    searchInput
  );
  const quote = useQuotes(
    currentERC1155,
    currentERC20,
    input,
    isBuy,
    userData?.address
  );
  const txMessageProps: any = {
    txMessage,
    setTxMessage,
  };

  const approvalCompleteProps: any = {
    approvalComplete,
    setApprovalComplete,
  };
  const ERC1155Props: any = {
    currentERC1155,
    setCurrentERC1155,
  };
  const dialogSearchProps: any = {
    searchInput,
    setSearchInput,
  };

  const ERC20Props: any = {
    currentERC20,
    setCurrentERC20,
  };

  const isBuyProps: any = {
    isBuy,
    setIsBuy,
  };
  const inputProps: any = {
    input,
    setInput,
  };
  const txRunningProps: any = {
    isTxRunning,
    setIsTxRunning,
  };
  console.log(dimensions);
  useEffect(() => {
    console.log(currentERC1155);

    setHistory(null);
    const getChart = async () => {
      if (currentERC20.name !== "ETH") {
        console.log(true);
        const main = await getPoolTransactions(currentERC1155.address);
        console.log(main);
        setHistory(main);
      } else if (currentERC1155) {
        console.log(currentERC1155);
        console.log(true);
        const main: any = await getShareChartData(currentERC1155.address);
        console.log(main);
        setHistory(main);
      }
    };
    getChart();
  }, [currentERC1155]);

  return (
    <>
      {txMessage && (
        <TxStatusAlert
          message={txMessage}
          setTxMessage={setTxMessage}
          txRunningProps={txRunningProps}
        />
      )}

      <div className=" w-[425px] mx-auto mt-10">
        <Tabs defaultValue="swap" className=" bg-transparent">
          <TabsList className=" text-text   font-bold ">
            <TabsTrigger
              value="swap"
              className="custom-tabs-trigger  text-[12px]"
            >
              Swap
            </TabsTrigger>
            <TabsTrigger
              value="lp"
              className="custom-tabs-trigger   text-[12px]"
            >
              Add Liquidity
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="swap"
            className=" bg-background ms-auto me-auto mx-auto gap-0"
          >
            <SwapCard
              {...userData}
              ERC20Pairs={ERC20_PAIRS}
              ERC1155Pairs={ERC1155Pairs || []}
              ERC1155Props={ERC1155Props}
              ERC20Props={ERC20Props}
              isBuyProps={isBuyProps}
              inputProps={inputProps}
              quote={quote}
              txRunning={txRunningProps}
              dialogSearchProps={dialogSearchProps}
              txMessageProps={txMessageProps}
              approvalCompleteProps={approvalCompleteProps}
              history={history}
            />
            {quote && <QuoteDropdown {...currentERC1155} quote={quote} />}
          </TabsContent>
          <TabsContent value="lp">
            <AddLpCard
              ERC1155Props={ERC1155Props}
              ERC20Props={ERC20Props}
              dialogSearchProps={dialogSearchProps}
              txRunningProps={txRunningProps}
              txMessageProps={txMessageProps}
              {...userData}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="test"></div>
    </>
  );
}

export default Swap;
