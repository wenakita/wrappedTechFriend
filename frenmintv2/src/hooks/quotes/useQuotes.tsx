import { useEffect, useState } from "react";
import { detectTransactionType } from "../../requests/quoter/calculate-quotes";

export const useQuotes = (
  ERC1155: any,
  ERC20: any,
  input: any,
  isBuy: any,
  address: any
) => {
  const [quote, setQuote] = useState<any | undefined>();
  console.log(input.length);
  useEffect(() => {
    const getQuotes = async () => {
      const res = await detectTransactionType(
        ERC20,
        isBuy,
        input,
        ERC1155,
        address
      );
      setQuote(res);
    };

    if (input && ERC1155 && ERC20) {
      setQuote(null);
      getQuotes();
    } else {
      if (input.length === 0) {
        console.log(true);
        setQuote(null);
      }
    }
  }, [input, isBuy]);
  return quote;
};
