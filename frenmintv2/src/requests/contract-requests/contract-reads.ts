import { readContract } from "@wagmi/core";
import { config } from "../../components/provider/wagmi/config";
import { erc1155WrapperContract } from "../../contracts/contract_addresses";
import wrapped1155ABI from "../../contracts/abi/wrapped1155ABI";
import Address from "../../interfaces/address-interface";
import { getEthPrice, getPrices } from "@/hooks/price/get-prices";
import { getNftTokenUri } from "node_modules/viem/_types/utils/ens/avatar/utils";
import uintFormat from "@/formatters/uint-format";

async function getKeyUri(key_ID: string) {
  const uri = await readFromContract(
    erc1155WrapperContract,
    wrapped1155ABI,
    "uri",
    [key_ID]
  );
  console.log(uri);
  console.log(uri.slice(28, uri.length));

  return uri.slice(28, uri.length);
}

export async function getBalance(key_ID: any, owner: any) {
  const balance = await readFromContract(
    erc1155WrapperContract,
    wrapped1155ABI,
    "balanceOf",
    [owner, key_ID]
  );
  return Number(balance);
}


export async function readFromContract(
  contract: any,
  abi: any,
  fnName: any,
  args: any
) {
  const uri: any = await readContract(config, {
    address: contract as Address,
    abi: abi,
    functionName: fnName,
    args,
  });
  return uri;
}

export default getKeyUri;

//we have to call the check approval from calculate-quotes file

export async function calculatePoolQuote(share: any, amount: any, ERC20: any) {
  const ethPriceUSD: any = await getEthPrice();
  const ERC20PRICEUSD: any = await getPrices(ERC20?.address);
  const sharePrice = uintFormat(share?.displayPrice);
  const deltaEquation = amount * 11 + 1;
  const spotPrice = (sharePrice * deltaEquation * ethPriceUSD) / ERC20PRICEUSD;
  const initialBalance = sharePrice * amount;
  const finalDepositAmount = (initialBalance * ethPriceUSD) / ERC20PRICEUSD;
  console.log(finalDepositAmount);
  const sharePairPrice = (sharePrice * 1 * ethPriceUSD) / ERC20PRICEUSD;
  console.log(sharePairPrice);
  return {
    quote: 0, //lp to deposit
    usd: finalDepositAmount * ERC20PRICEUSD,
    fees: 0,
    feesUsd: 0,
    LP: finalDepositAmount,
    intialTokenBalance: finalDepositAmount,
    delta: deltaEquation,
    spotPrice: spotPrice,
    ethPrice: ethPriceUSD,
    ERC20Price: ERC20PRICEUSD,
    depositAmount: amount,
    ERC20Address: ERC20,
    displayPrice: sharePairPrice.toFixed(2),
  };
}
