import getKeyUri, {
  getBalance,
} from "../requests/contract-requests/contract-reads";
import searchByContract from "../requests/friend-tech-api/friendtech-api-calls";
import uintFormat from "./uint-format";

async function findKeysData(holdings: any, owner: string) {
  const data = [];
  if (holdings) {
    for (const key in holdings) {
      const uri = await getKeyUri(holdings[key]?.inner_id);
      const balance = await getBalance(holdings[key]?.inner_id, owner);
      const ftData = await searchByContract(uri);

      const formattedPrice = uintFormat(ftData?.displayPrice);
      data.push({
        ...ftData,
        balance: balance,
        price: formattedPrice,
      });
    }
  }
  return data;
}

export default findKeysData;
