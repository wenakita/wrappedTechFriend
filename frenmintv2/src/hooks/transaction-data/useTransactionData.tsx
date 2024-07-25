import { useEffect, useState } from "react";
import { getTransactionData } from "../../requests/supabase/supabase-calls";

export const useTransactionData = () => {
  const [txData, setTxData] = useState<any | undefined>();

  useEffect(() => {
    const getTxData = async () => {
      const res = await getTransactionData();
      setTxData(res);
    };
    getTxData();
  }, []);
  return txData;
};
