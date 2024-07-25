import { erc1155WrapperContract } from "../contracts/contract_addresses";
export function filterNFTHoldings(holdings: any) {
  const erc1155Holdings = [];
  for (const key in holdings) {
    const currentContract = String(holdings[key]?.contract_id).toLowerCase();
    if (currentContract === erc1155WrapperContract.toLowerCase()) {
      erc1155Holdings.push(holdings[key]);
    }
  }
  return erc1155Holdings;
}
