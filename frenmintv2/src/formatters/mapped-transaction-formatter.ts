import { basescanLink } from "../contracts/contract_addresses";
import { sliceContract } from "./contract-slicer";
import { detectERC20IMG } from "./img-detect";

export function formatMappedTransaction(data: any, type: any) {
  const time = data?.monthName + " " + data?.day + " " + data?.year;
  const ERC20IMG = detectERC20IMG(type, data?.ERC20_Token);
  const TX_TYPE = data?.is_buy;
  const amount = data?.share_amount || data?.purchase_amount;
  const buyer = sliceContract(data?.buyer_address);
  const value = Number(data?.eth_val).toFixed(4);
  const link = basescanLink + data?.buyer_address;

  return { time, ERC20IMG, TX_TYPE, amount, buyer, value, link };
}
