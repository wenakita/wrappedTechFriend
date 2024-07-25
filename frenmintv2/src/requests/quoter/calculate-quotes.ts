import friendTechKeysABI from "../../contracts/abi/friendTechKeysABI";
import goddogABI from "../../contracts/abi/goddogABI";
import poolTransactABI from "../../contracts/abi/poolTransactABI";
import wrapped1155ABI from "../../contracts/abi/wrapped1155ABI";
import {
  erc1155WrapperContract,
  friendTechKeysContract,
  goddogContract,
  poolTransactContract,
} from "../../contracts/contract_addresses";
import uintFormat from "../../formatters/uint-format";
import { getEthPrice, getPrices } from "../../hooks/price/get-prices";
import { readFromContract } from "../contract-requests/contract-reads";
import { approveSpending } from "../contract-requests/contract-writes";

export async function detectTransactionType(
  ERC20: any,
  isBuy: any,
  amount: any,
  ERC1155: any,
  walletAddress: any
) {
  const ERC20Name = ERC20.name.toLowerCase();
  const ERC1155Price = uintFormat(ERC1155.displayPrice);
  let res;
  let output;

  switch (ERC20Name) {
    case "oooooo":
      console.log("oooOOO");

      res = await readFromContract(
        ERC1155.address,
        poolTransactABI,
        isBuy ? "getBuyNFTQuote" : "getSellNFTQuote",
        [ERC1155.erc1155Id, amount]
      );
      console.log(res);
      output = quoteBuilder(
        res,
        ERC1155,
        amount,
        isBuy,
        ERC20,
        true,
        walletAddress
      );
      break;
    case "friend":
      console.log("Friend");
      res = await readFromContract(
        ERC1155.address,
        poolTransactABI,
        isBuy ? "getBuyNFTQuote" : "getSellNFTQuote",
        [ERC1155.erc1155Id, amount]
      );
      console.log(res);

      break;
    case "eth":
      res = await readFromContract(
        friendTechKeysContract,
        friendTechKeysABI,
        isBuy ? "getBuyPriceAfterFee" : "getSellPriceAfterFee",
        [ERC1155.address || ERC1155.ftAddress, amount]
      );
      output = quoteBuilder(
        uintFormat(res),
        ERC1155,
        amount,
        isBuy,
        ERC20,
        false,
        walletAddress
      );
      break;
  }
  return output;
}

async function quoteBuilder(
  toPay: any,
  ERC1155: any,
  amount: any,
  isBuy: any,
  ERC20: any,
  shouldApprove: any,
  walletAddress: any
) {
  // const ETH_PRICE: any = await getEthPrice();
  // const usd = Number(ETH_PRICE) * toPay;
  // const keyTotal = uintFormat(ERC1155.displayPrice || ERC1155.ftPrice) * amount;
  // const keyETHUSD = keyTotal * ETH_PRICE;
  const quote: any = await createQuote(
    toPay,
    ERC1155,
    amount,
    isBuy,
    ERC20,
    shouldApprove,
    walletAddress
  );

  const { usd, keyTotal, keyETHUSD, quoteToPay, steps, special } = quote;

  return {
    quoteTotal: quoteToPay,
    quoteTotalUsd: usd,
    input: amount,
    keyETHTotal: keyTotal,
    KeyETHTotalUsd: keyETHUSD,
    isBuy,
    shouldApprove,
    steps,
    special,
    caller: walletAddress,
    ERC20_NAME: ERC20.name,
  };
}

// when returning the quotes we will return the steps needed to complete the transaction
//we will also add a boolean hasSteps to tell the frontend if steps are required
function test(target: string) {
  console.log(target);
}

async function createQuote(
  toPay: any,
  ERC1155: any,
  amount: any,
  isBuy: any,
  ERC20: any,
  shouldApprove: any,
  walletAddress: any
) {
  let ETH_PRICE: any = await getEthPrice();
  let output;
  let price: any;

  let usd;
  let keyTotal;
  let keyETHUSD;
  let quoteToPay;
  let isApproved;
  let steps;
  let special = null;
  switch (ERC20.name) {
    //index 3 of the pool quote is the amount the user had to pay
    //to check approval for goddog u call allowance first param is users address and second is the spender
    case "oooOOO":
      quoteToPay = uintFormat(toPay[3]);
      price = await getPrices(ERC20.address);
      console.log(price);
      usd = Number(price) * uintFormat(toPay[3]);
      keyTotal = ERC1155.ftPrice * amount;
      console.log(ERC1155.ftPrice);
      console.log(walletAddress);
      keyETHUSD = keyTotal * ETH_PRICE;
      isApproved = await readFromContract(
        goddogContract,
        goddogABI,
        "allowance",
        [walletAddress, poolTransactContract]
      );
      console.log(poolTransactContract);
      console.log(uintFormat(isApproved));
      console.log(isApproved);
      console.log(Number(isApproved) > 0);
      steps =
        Number(isApproved) > 0
          ? null
          : {
              name: `Approve ${ERC20.name}`,
              call: approveSpending,
              parameters: isBuy
                ? [
                    poolTransactContract,
                    "99999999999999999999999999999999999999999999",
                  ]
                : [true],
              readAddress: isBuy ? goddogContract : erc1155WrapperContract,
              fnName: "approve",
              abi: isBuy ? goddogABI : wrapped1155ABI,
            };
      special = toPay;
      output = { usd, keyTotal, keyETHUSD, quoteToPay, steps, special };
      break;
    case "Friend":
      break;
    case "ETH":
      quoteToPay = toPay;
      price = await getEthPrice();
      usd = Number(price) * toPay;
      keyTotal = uintFormat(ERC1155.displayPrice || ERC1155.ftPrice) * amount;
      keyETHUSD = keyTotal * price;
      steps = {};
      special = null;
      output = { usd, keyTotal, keyETHUSD, quoteToPay, steps, special };

      break;
  }
  return output;
}
