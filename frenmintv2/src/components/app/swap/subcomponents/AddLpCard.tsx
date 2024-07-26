import { Card } from "@/components/ui/card";
import ERC20_PAIRS from "@/contracts/available-erc20-pairs";
import { Button, Heading, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PairsDialog from "./PairsDialog";
import { ArrowBigDownIcon } from "lucide-react";
import { useLpPairs } from "@/hooks/pairs/useLpPairs";
import uintFormat from "@/formatters/uint-format";
import { calculatePoolQuote } from "@/requests/contract-requests/contract-reads";
import QuoteDropdown from "./QuoteDropdown";
import LpQuoteDropdown from "./LpQuoteDropdown";
import { createPool } from "@/requests/contract-requests/contract-writes";
import LpConfirmModal from "./LpConfirmModal";

function AddLpCard({
  ERC1155Props,
  ERC20Props,
  dialogSearchProps,
  signer,
  address,
}: any) {
  console.log(signer);
  const [input, setInput] = useState(null);
  const [currentERC1155, setCurrentERC1155] = useState<any | undefined>(null);
  const [currentERC20, setCurrentERC20] = useState<any | undefined>(
    ERC20_PAIRS[0]
  );
  const [quote, setQuote] = useState<any | undefined>(null);
  const { searchInput, setSearchInput } = dialogSearchProps;
  const pairs = useLpPairs(searchInput);
  useEffect(() => {
    const getLpQuote = async () => {
      const res: any = await calculatePoolQuote(
        currentERC1155,
        input,
        currentERC20
      );
      console.log(res);
      setQuote(res);
    };
    if (input) {
      setQuote(null);

      getLpQuote();
    }
  }, [input]);
  return (
    <>
      <Card className="bg-cardBg mx-auto p-5 h-[380px]  text-text border-soft font-bold ">
        <span className="flex gap-1">
          <h3 className="text-[15px] p-2 font-bold mt-0.5">
            Provide Liquidity
          </h3>
        </span>
        <div className="p-3 text-[10px] w-full font-bold">
          <div className="mt-2  ">
            <h3 className="text-start">Select ERC-1155</h3>
          </div>
          <PairsDialog
            trigger={
              <div
                className="border border-soft p-2 w-[360px] rounded-md mt-2 flex justify-between"
                role="button"
              >
                {currentERC1155 ? (
                  <>
                    {" "}
                    <span className="flex justify-start gap-1">
                      <img
                        src={currentERC1155 ? currentERC1155.ftPfpUrl : ""}
                        alt=""
                        className="size-5 rounded-full"
                      />
                      <h3 className="mt-0.5">
                        {currentERC1155 ? currentERC1155.ftName : ""}
                      </h3>
                    </span>
                    <span className="flex justify-end">
                      <IoIosArrowDown className="text-text mt-1" />
                    </span>
                  </>
                ) : (
                  <span className="flex justify-between  w-full p-0.5">
                    <div className="flex justify-start">Select a key</div>
                    <IoIosArrowDown className="text-text mt-1 flex justify-end" />
                  </span>
                )}
              </div>
            }
            pairs={pairs}
            set={setCurrentERC1155}
            type={"1155"}
            dialogSearchProps={dialogSearchProps}
            ERC20={currentERC20}
          />
          <div className="mt-5  ">
            <h3 className="text-start">Select ERC-20</h3>
          </div>
          <PairsDialog
            trigger={
              <div
                className="border border-soft p-2 w-[360px] rounded-md mt-2 flex justify-between"
                role="button"
              >
                <span className="flex justify-start gap-1">
                  <img
                    src={currentERC20.img || ""}
                    alt=""
                    className="size-5 rounded-full"
                  />
                  <h3 className="mt-0.5">
                    {currentERC20 ? currentERC20.name : "d"}
                  </h3>
                </span>
                <span className="flex justify-end">
                  <IoIosArrowDown className="text-text mt-1" />
                </span>
              </div>
            }
            pairs={ERC20_PAIRS}
            set={setCurrentERC20}
            type={"20"}
            dialogSearchProps={dialogSearchProps}
            ERC20={currentERC20}
          />
        </div>
        <div className="mt-4 mx-auto w-[92%]">
          <TextField.Root
            placeholder="Search the docs…"
            className="bg-background border border-soft focus:hidden outline-none focus:outline-none text-text"
            onChange={(e: any) => {
              if (!isNaN(e.target.value)) {
                setInput(e.target.value);
              }
            }}
            value={input || 0}
          >
            <TextField.Slot className="" side="right">
              <div className="flex gap-2 w-[50%]">
                <span className=" text-text text-[10px]">
                  {currentERC1155
                    ? "$" +
                      (uintFormat(currentERC1155.displayPrice) * 3500).toFixed(
                        2
                      )
                    : 0}
                </span>
                <span className=" text-text text-[10px]">
                  <span className="flex gap-1 justify-end    whitespace-nowrap">
                    <h3 className="whitespace-nowrap truncate ">
                      {currentERC1155 ? currentERC1155.ftName : " "}
                    </h3>
                    <h3 className="">
                      Per {currentERC20.name ? currentERC20.name : null}
                    </h3>
                  </span>
                </span>
              </div>
            </TextField.Slot>
          </TextField.Root>
        </div>

        <div className="flex justify-center mt-3">
          <LpConfirmModal
            trigger={
              <Button className="mt-4 h-10 bg-accent font-bold text-[12px] w-[90%] rounded-md">
                Add Liquidity
              </Button>
            }
            click={() => {
              createPool(currentERC20, currentERC1155, address, quote, signer);
            }}
            LP={quote ? quote.LP : null}
            input={quote ? quote.depositAmount : null}
            usd={quote ? quote.usd : null}
            ERC1155={currentERC1155 ? currentERC1155 : null}
            quote={quote}
          />
        </div>
      </Card>
      {quote && <LpQuoteDropdown {...currentERC1155} {...quote} />}
    </>
  );
}

export default AddLpCard;
