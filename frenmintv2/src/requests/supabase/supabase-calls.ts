import { formatTransactions } from "./supabase-data-formatter";
import { getData } from "./supabase-requests";

//what we now need to do is format the transactions and
export async function getTransactionData() {
  const pools = formatTransactions(await getData("pool-txs"));
  const mints = formatTransactions(await getData("txs"));
  const poolVolume = calculateVolume(pools);
  const mintVolume = calculateVolume(mints);
  const test = [...pools, ...mints];
  return {
    pools: { transactions: pools, volume: poolVolume },
    mints: { transactions: mints, volume: mintVolume },
    combined: test,
  };
}

function calculateVolume(data: any) {
  let volume = 0;
  for (const key in data) {
    const ETH_VAL = Number(data[key]?.eth_val);
    volume += ETH_VAL;
  }
  return volume;
}
