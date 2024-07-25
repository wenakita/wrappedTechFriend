import uintFormat from "../../formatters/uint-format";
import getKeyUri from "../contract-requests/contract-reads";
import searchByContract from "../friend-tech-api/friendtech-api-calls";

export async function filterPools(pools: any, ERC20_PAIR: string) {
  const found: any = [];

  for (const pool in pools) {
    const token: any = pools[pool].tokenAddress.toLowerCase();
    const ID: any = pools[pool].erc1155Id;

    const data: any = await searchByContract(await getKeyUri(ID));
    if (token === ERC20_PAIR) {
      pools[pool].ftAddress = data.address;
      pools[pool].ftPfpUrl = data.ftPfpUrl;
      pools[pool].ftHolders = data.holderCount;
      pools[pool].ftSupply = data.shareSupply;
      pools[pool].ftPrice = uintFormat(data.displayPrice);
      pools[pool].ftName = data.ftName;

      found.push(pools[pool]);
    }
  }
  return found;
}
