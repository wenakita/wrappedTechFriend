import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Text } from "@radix-ui/themes";
import "../../../../App.css";
import QuoteDropdown from "./QuoteDropdown";
import ModalBody from "./ModalBody";
import { detectTxType } from "../../../../requests/contract-requests/contract-writes";
import ModalRunningTx from "./ModalRunningTx";
import "../swap.css";
function ConfirmModal({
  trigger,
  ERC1155,
  ERC20,
  quote,
  walletData,
  txRunning,
  txMessageProps,
}: any) {
  const { isTxRunning, setIsTxRunning }: any = txRunning;
  const { signer, isEmbedded }: any = walletData;
  const { txMessage, setTxMessage }: any = txMessageProps;
  if (quote) {
    console.log(quote.isBuy);
  }
  console.log(txRunning);
  //if the walllet is not embedded once we confirm thetransaction we will do a loading animation and on success or fail will show the status
  return (
    <Dialog>
      <DialogTrigger className="w-[90%] mx-auto">{trigger}</DialogTrigger>
      {ERC1155 && ERC20 && (
        <DialogContent className="bg-background text-text border-none rounded-lg w-[400px] fade">
          {!isTxRunning ? (
            <DialogHeader>
              <DialogTitle className="text-start text-[14px] mb-2">
                Review Swap
              </DialogTitle>
              <DialogDescription className="grid grid-flow-row">
                {/* //if buying the amount to pay or to recieve is quote.total, if buying the amount to recieve or amount to sell is quote.amount */}
                <div className="grid grid-rows-2 gap-3">
                  {quote && (
                    <ModalBody
                      message={quote.isBuy ? "You Pay" : "You Sell"}
                      amount={
                        quote.isBuy ? quote.quoteTotal.toFixed(3) : quote.input
                      }
                      usd={
                        quote.isBuy
                          ? quote.quoteTotalUsd.toFixed(2)
                          : quote.KeyETHTotalUsd.toFixed(2)
                      }
                      img={quote.isBuy ? ERC20.img : ERC1155.ftPfpUrl}
                    />
                  )}
                  {quote && (
                    <ModalBody
                      message={"You Recieve"}
                      amount={
                        quote.isBuy ? quote.input : quote.quoteTotal.toFixed(3)
                      }
                      usd={
                        quote.isBuy
                          ? quote.KeyETHTotalUsd.toFixed(2)
                          : quote.quoteTotalUsd.toFixed(2)
                      }
                      img={quote.isBuy ? ERC1155.ftPfpUrl : ERC20.img}
                    />
                  )}
                </div>

                <div className="mt-4 mx-auto  w-[90%]">
                  <Button
                    role="button"
                    className="bg-accent hover:bg-secondary border border-black w-full  rounded-md p-2 font-bold text-[12px] "
                    onClick={async () => {
                      setIsTxRunning(true);

                      const res = await detectTxType(
                        ERC1155,
                        ERC20,
                        quote,
                        quote.isBuy,
                        signer
                      );
                      setTxMessage(res);
                    }}
                  >
                    Confirm Swap
                  </Button>
                </div>
                <div className="mt-4">
                  <QuoteDropdown {...ERC1155} quote={quote} />
                </div>
              </DialogDescription>
            </DialogHeader>
          ) : (
            <>{!isEmbedded && <ModalRunningTx message={txMessage || null} />}</>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ConfirmModal;
