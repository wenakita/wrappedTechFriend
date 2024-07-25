import { Card, CardContent, CardFooter } from "@/components/ui/card";
import * as Separator from "@radix-ui/react-separator";
import { Button, Text } from "@radix-ui/themes";
import { IoIosArrowDown } from "react-icons/io";
import { LuArrowDownUp } from "react-icons/lu";
import PairsDialog from "./PairsDialog";
import ConfirmModal from "./ConfirmModal";
import "../swap.css";
import SwapInfoDialog from "./SwapInfoDialog";
function SwapCard(props: any) {
  const {
    isLoggedIn,
    action,
    isEmbedded,
    signer,
    ERC20Pairs,
    ERC1155Pairs,
    ERC20Props,
    ERC1155Props,
    isBuyProps,
    inputProps,
    txRunning,
    quote,
    dialogSearchProps,
    txMessageProps,
    approvalCompleteProps,
    history,
  } = props;
  const { currentERC1155, setCurrentERC1155 }: any = ERC1155Props;
  const { currentERC20, setCurrentERC20 }: any = ERC20Props;
  const { isBuy, setIsBuy }: any = isBuyProps;
  const { input, setInput }: any = inputProps;
  const { approvalComplete, setApprovalComplete }: any = approvalCompleteProps;

  const handleTxType = () => {
    if (isBuy) {
      setIsBuy(false);
    } else {
      setIsBuy(true);
    }
  };
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setInput(value);
    }
  };

  const walletDataProps: any = {
    isEmbedded,
    signer,
  };

  if (quote && quote.shouldApprove) {
    setApprovalComplete(true);
  }

  return (
    <Card className="bg-cardBg mx-auto p-3 h-[380px]  text-text border-soft font-bold ">
      <CardContent className="mt-4">
        <div className="flex justify-end">
          <SwapInfoDialog
            history={history ? history : null}
            img={currentERC1155 ? currentERC1155.ftPfpUrl : null}
            name={currentERC1155 ? currentERC1155.ftName : null}
            ERC20={currentERC20 ? currentERC20 : null}
          />
        </div>
        <div className="">
          <Text className="text-[12px] ">{isBuy ? "You Buy" : "You Sell"}</Text>
          <div className="border p-3 rounded-lg  border-soft mt-1.5">
            <div className="flex justify-between">
              <div>
                <PairsDialog
                  trigger={
                    <Button className="bg-soft w-[125px] rounded-lg p-1.5">
                      <span className="flex justify-between  w-full gap-2">
                        <div className="flex justify-start gap-1  w-[80%] ">
                          {currentERC1155 && ERC1155Pairs ? (
                            <>
                              <img
                                src={currentERC1155.ftPfpUrl}
                                className="size-5 rounded-full"
                              />
                              <Text className="overflow-hidden whitespace-nowrap text-[11px] mt-0.5">
                                {currentERC1155.ftName}
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text className="overflow-hidden whitespace-nowrap text-[10px] mt-0.5">
                                Select ERC-1155
                              </Text>
                            </>
                          )}
                        </div>
                        <IoIosArrowDown className="text-text mt-1" />
                      </span>
                    </Button>
                  }
                  pairs={ERC1155Pairs}
                  set={setCurrentERC1155}
                  type={"1155"}
                  dialogSearchProps={dialogSearchProps}
                  ERC20={currentERC20}
                />
              </div>
              <div className="flex justify-end">
                <input
                  placeholder="0"
                  className="bg-transparent border-transparent w-[90%] text-end focus:outline-none"
                  onChange={handleInputChange}
                  value={input}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center my-4 ">
          <Separator.Root className="flex-grow h-px bg-soft" />
          <span
            role="button"
            className="mx-4 border-2 border-lightSoft  hover:border-soft rounded-full p-1"
            onClick={handleTxType}
          >
            <LuArrowDownUp />
          </span>
          <Separator.Root className="flex-grow h-px bg-soft" />
        </div>
        <div>
          <Text className="text-[12px]">
            {isBuy ? "You Pay" : "You Receive"}
          </Text>
          <div>
            <div className="border p-3 rounded-lg   border-soft mt-1.5">
              <div className="flex justify-between">
                <div>
                  <PairsDialog
                    trigger={
                      <Button className="bg-soft w-[125px] rounded-lg p-1.5">
                        <span className="flex justify-between w-full gap-2">
                          <div className="flex justify-start gap-1  w-[80%]">
                            {currentERC20 && (
                              <>
                                <img
                                  src={currentERC20.img}
                                  className="size-5 rounded-full"
                                />
                                <Text className="overflow-hidden whitespace-nowrap text-[11px] mt-0.5">
                                  {currentERC20.name}
                                </Text>
                              </>
                            )}
                          </div>
                          <IoIosArrowDown className="text-text mt-1" />
                        </span>
                      </Button>
                    }
                    pairs={ERC20Pairs}
                    set={setCurrentERC20}
                    type={"20"}
                    dialogSearchProps={dialogSearchProps}
                    ERC20={currentERC20}
                  />
                </div>
                <div className="flex justify-end">
                  <input
                    placeholder="0"
                    className="bg-transparent border-transparent border-none w-[90%] text-end focus:outline-none"
                    disabled={true}
                    value={quote ? quote.quoteTotal.toFixed(4) : ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        {quote &&
          quote.shouldApprove &&
          quote.steps &&
          isLoggedIn &&
          !!approvalComplete && (
            <Button
              role="button"
              className="mx-auto w-[50%]  text-text  p-5 bg-accent hover:bg-secondary rounded-md font-bold text-[12px]"
              disabled={approvalComplete ? false : true}
              onClick={() => {
                console.log(quote);
                const res = quote.steps.call(
                  signer,
                  quote.steps.abi,
                  quote.steps.readAddress,
                  quote.steps.fnName,
                  quote.steps.parameters
                );
                if (res) {
                  setApprovalComplete(true);
                } else {
                  setApprovalComplete(false);
                }
              }}
            >
              {quote.steps ? quote.steps.name : ""}
            </Button>
          )}
        {isLoggedIn ? (
          <ConfirmModal
            trigger={
              <Button
                role="button"
                className="mx-auto w-full h-[30px] text-text  p-5 bg-accent hover:bg-secondary rounded-md font-bold"
                disabled={quote ? false : true}
              >
                Swap
              </Button>
            }
            ERC1155={currentERC1155}
            ERC20={currentERC20}
            quote={quote}
            walletData={walletDataProps}
            txRunning={txRunning}
            txMessageProps={txMessageProps}
          />
        ) : (
          <Button
            className="mx-auto w-full p-5 bg-accent hover:bg-secondary font-bold"
            onClick={() => {
              if (!isLoggedIn) {
                action();
              }
            }}
          >
            Connect Wallet
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default SwapCard;
