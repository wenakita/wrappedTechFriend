import { useEffect, useState } from "react";
import { getUserHoldings } from "../../requests/holdings/holdings";

const useUserKeyHoldings = (address: string) => {
  const [keyHoldings, setKeyHoldings] = useState(null);

  const getKeyHoldings = async () => {
    const results: any = await getUserHoldings(address);
    setKeyHoldings(results);
  };
  useEffect(() => {
    getKeyHoldings();
  }, [address]);
  return keyHoldings;
};

export default useUserKeyHoldings;
