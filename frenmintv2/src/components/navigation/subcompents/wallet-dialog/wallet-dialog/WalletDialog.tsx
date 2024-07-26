import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { Heading, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import "../../../../../App.css";
import useUserTokens from "../../../../../hooks/holdings/useUserTokens";
import useViewport from "../../../../../hooks/view-port/useViewport";
import DialogHeroCards from "../../dialog-hero-cards";
import DialogSwitch from "../../dialog-switch";
import useUserKeyHoldings from "../../../../../hooks/holdings/useUserKeyHoldings";
import { sliceContract } from "../../../../../formatters/contract-slicer";
import { IoMdCube } from "react-icons/io";

import useTokenPrice from "@/hooks/price/useTokenPrice";
import { getUSDValue } from "@/formatters/calculate-usd-value";
import { FaPowerOff } from "react-icons/fa";

// 0xec72bc65000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000b35f5e09ae15dfb320d99f1cb599ba1510285727000000000000000000000000b35f5e09ae15dfb320d99f1cb599ba15102857270000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000eb887247da1d81375e789886afee3502ae898b8700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000003c03ce9ca925030000000000000000000000000000000000000000000000000037db53615fb42d0000000000000000000000000000000000000000000000000000000000000180000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000027930000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000374dbf8b7fb4ec
function WalletDialog(props: any) {
  const { address, logout } = props;
  const tokens: any = useUserTokens(address);
  const viewport = useViewport();
  const keys = useUserKeyHoldings(address);
  const [side, setSide] = useState("end");
  const slicedAddress = sliceContract(address);
  useEffect(() => {
    if (viewport.width <= 530) {
      setSide("bottom");
    } else {
      setSide("right");
    }
  }, [viewport]);

  let total = 0;

  const prices = useTokenPrice();
  if (tokens) {
    Object.keys(tokens).map((key: any) => {
      const token: any = tokens[key];
      console.log(token);
      let USD;
      switch (key) {
        case "Friend":
          USD = getUSDValue(prices?.friend, token?.balance);
          total += USD;

          break;
        case "oooOOO":
          USD = getUSDValue(prices?.goddog, token?.balance);
          total += USD;

          break;
        case "ETH":
          USD = getUSDValue(prices?.eth, token?.balance);
          total += USD;

          break;
      }
    });
  }
  // 0x452b5a5dbbf75bebee33cce791bd19e6dbcc327c5ef3a4b0e8b5e4bff369fa0d
  //basescan api key: VAAGUVZPXRQZHUITAPCE6B5VNFZPHEF44U

  //docs: https://docs.basescan.org/api-endpoints/logs the offset is how much transactions u want to retreive

  //example endpoint of getting all sudoswap pool txs https://api.basescan.org/api?module=account&action=txlist&address=0xa07ebd56b361fe79af706a2bf6d8097091225548&startblock=0&endblock=99999999999&page=1&offset=10&sort=desc&apikey=VAAGUVZPXRQZHUITAPCE6B5VNFZPHEF44U
  //what we can do is get all erc1155 pools from sudoswap sdk decode the input data and compare the pool address and see if it is a 1155 pool
  //the hash is the transaction from the basescan api response hash the input is the input data we want to decode
  //in the transaction the expectedSpotprice is the buy or sell price we must calculate dpending on if they buy a large or small amount

  return (
    <Sheet>
      <SheetTrigger className="border border-soft bg-soft rounded-full p-2">
        <div className="flex gap-2 text-text text-[10px] font-bold ">
          {props?.img}
          <Text className="mt-1">{slicedAddress}</Text>
        </div>
      </SheetTrigger>
      <SheetContent
        className={`bg-background text-text border-0 ${
          side === "bottom" ? "h-[90%]" : null
        }`}
        side={side}
      >
        <SheetHeader>
          <SheetTitle className="text-start text-[12px] flex justify-between">
            <div className="flex gap-2">
              {props.img}
              <Text>{slicedAddress}</Text>
            </div>
            <div className=" text-[14px] hover:text-error">
              <Text role="button" onClick={logout}>
                <FaPowerOff />
              </Text>
            </div>
          </SheetTitle>
          <SheetDescription>
            <div className="mt-2 text-start p-3">
              <Heading className="text-[25px] font-bold">
                ${total.toFixed(2) || 0}
              </Heading>
              <div className="flex gap-1 mt-2 text-[10px]">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="lime"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-1"
                >
                  <path d="M4 9H11L7.5 4.5L4 9Z" fill="lime"></path>
                </svg>
                <Text>$50.00 (30%)</Text>
              </div>
            </div>

            <div className="">
              <DialogSwitch tokens={tokens} keys={keys} />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default WalletDialog;
