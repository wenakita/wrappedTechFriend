import { useEffect, useState } from "react";
import {
  friendTechContract,
  goddogContract,
} from "../../contracts/contract_addresses";
import { getEthPrice, getPrices } from "./get-prices";
import { TokenPrices } from "../../interfaces/token-prices";

const useTokenPrice = () => {
  const [prices, setPrices] = useState<TokenPrices | null>();

  const fetchPrices = async () => {
    const goddogPrice: any = await getPrices(goddogContract);
    const friendPrice: any = await getPrices(friendTechContract);
    const ethPrice: any = await getEthPrice();

    setPrices({
      goddog: goddogPrice,
      friend: friendPrice,
      eth: ethPrice,
    });
  };

  useEffect(() => {
    fetchPrices();
  }, []);
  return prices;
};
export default useTokenPrice;
