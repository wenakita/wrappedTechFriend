import { Quoter } from "sudo-defined-quoter";
import { filterPools } from "./sudoswap-pools-filter";

const key = import.meta.env.VITE_DEFINED_KEY;
export async function getPoolPairs(ERC20_PAIR: string) {
  const pools: any = await getAllPools();
  const filtered: any = await filterPools(pools, ERC20_PAIR);
  return filtered;
}

export async function getAllPools() {
  let q: any = new Quoter(key, 8453);
  let a: any = await q.getPoolsForCollection(
    "0xbeea45F16D512a01f7E2a3785458D4a7089c8514"
  );

  return a;
}
