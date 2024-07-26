import React from "react";
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
import LpQuoteDropdown from "./LpQuoteDropdown";

function LpConfirmModal({
  trigger,
  click,
  LP,
  input,
  usd,
  ERC1155,
  quote,
}: any) {
  console.log(quote);
  console.log(ERC1155);

  return (
    <Dialog>
      <DialogTrigger className="w-[90%] mx-auto">{trigger}</DialogTrigger>
      {ERC1155 && LP && (
        <DialogContent className="bg-background text-text border-none rounded-lg w-[350px] fade">
          <DialogTitle className="text-start text-[14px]">
            Review LP
          </DialogTitle>
          <DialogDescription className="grid grid-flow-row gap-y-3">
            <ModalBody
              message={"Liquidity Added"}
              amount={LP.toFixed(2)}
              usd={usd.toFixed(2)}
              img={
                "https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0x7b202496c103da5bedfe17ac8080b49bd0a333f1/35134801v4w26w52w8?Expires=1820546101&Key-Pair-Id=K11ON08J8XW8N0&Signature=hYhq6S1aeNeA6Ug5vCsR7hhh1654ftV4FSjVO6dJf6NvAoDiEzjmwUgMvVlcIZBUydwz8DEN2YegsTujuOfSdYmo-PmJD0cOigNnJxrMhFtIIqexMq7NOFaVtwTJ~r2OZ-Jk8ilbyXlAggaBYrsAqrHyv76DiulBaba6L65yTtPayfCHNGoWoDN-3UKJxmo2JOWSDvXyANXBIH04Av60CcqDUEQ0ItIskLyaScolK-zPcTBmPuMN~xlr-kxxq04mbIx0JaB1bp04zH96Z0Q164LKdh2v94vpGhZIef8oIpoARh4FJ~uTigKC75caJTmFSoYdrBjenJAblaUqmPLaPA__"
              }
            />
            <ModalBody
              message={"Key Deposited"}
              amount={Number(input).toFixed(2)}
              usd={usd.toFixed(2)}
              img={
                "https://d3egfmvgqzu76k.cloudfront.net/twitterPfps/0xd8e1d8f932e7b50644e5a4c94e2fcf65a1aa25b9.jpg?Expires=1821582981&Key-Pair-Id=K11ON08J8XW8N0&Signature=Y0H6XGwPw8bvLffpXyfq-YJ3ermnEgeg1g0IXljqKWZTb~wOXYwB5UAA7GnCIKFFZvSTZcRGjJMNb5c9NG4gr7YKBqMQobU7yGOgC4SNNAJRRF~UV9E20xOKLNWAJVDhB2qNaqVgMWZjnyxAI3-uV0fLRKFTbKj0azkLbOJhY7BLiohx4PJGAiNqFa3KlkQzZmW9ReLkiRXZsc0va6M2YgEwURQDK08XIglU9hv50lLoiMfe~M~l72gLC0NG1oQHUsuCSXsNoOIf7KcTtBQYfKQ2JT7jjcyO-ETuWazQDZXYcTzarXP9PeH1cJsiq1uuDhod~Qd8EAmkgEERy2brew__"
              }
            />
          </DialogDescription>
          <div className="mt-1 mx-auto  w-[90%]">
            <Button
              role="button"
              className="bg-accent hover:bg-secondary border border-black w-full  rounded-md p-2 font-bold text-[12px] "
              onClick={() => {
                click();
                //   setIsTxRunning(true);
                //   const res = await detectTxType(
                //     ERC1155,
                //     ERC20,
                //     quote,
                //     quote.isBuy,
                //     signer
                //   );
                //   setTxMessage(res);
              }}
            >
              Confirm Deposit
            </Button>
          </div>
          <div>{quote && <LpQuoteDropdown {...ERC1155} {...quote} />}</div>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default LpConfirmModal;

// !isEmbedded && <ModalRunningTx message={txMessage || null} />
