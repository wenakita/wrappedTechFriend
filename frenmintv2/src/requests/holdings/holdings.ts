import findKeysData from "../../formatters/find-nft-data";
import { filterNFTHoldings } from "../../formatters/nft-holdings-filter";
import { debankHeader } from "../request-body/request-body";

export async function getUserHoldings(address: string) {
  const res = await fetch(
    `https://pro-openapi.debank.com/v1/user/nft_list?id=${address}&chain_id=base`,
    debankHeader
  );
  const foundKeys = filterNFTHoldings(await res.json());
  const keyHoldings = await findKeysData(foundKeys, address);
  return keyHoldings;
}
