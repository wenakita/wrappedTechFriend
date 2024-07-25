import { useEffect, useState } from "react";
import { useBalance } from "wagmi";
import {
  goddogContract,
  friendTechContract,
} from "../../contracts/contract_addresses";
import tokenImages from "../../contracts/token-images";
import TokenHoldings from "../../interfaces/token-holdings-interface";
import Address from "../../interfaces/address-interface";
const useUserTokens = (address: string) => {
  const chainId = 8453;
  const [tokens, setTokens] = useState<TokenHoldings | undefined>();

  const ETH_BALANCE: any = useBalance({
    address: address as Address,
    chainId,
    blockTag: "latest",
  });
  const oooOOO_BALANCE: any = useBalance({
    address: address as Address,
    chainId,
    blockTag: "latest",
    token: goddogContract as Address,
  });
  const FRIEND_BALANCE: any = useBalance({
    address: address as Address,
    chainId,
    blockTag: "latest",
    token: friendTechContract as Address,
  });

  //we have to have this outside of the use effect to prevent the bug
  //MAXIMUM depth exceeded becuase the balance objects change on each render so we cant add this as dependency
  //instead we add these formatted baalnces as dependencies they are not object
  const ethBalanceFormatted = Number(ETH_BALANCE.data?.formatted);
  const oooOOOBalanceFormatted = Number(oooOOO_BALANCE.data?.formatted);
  const friendBalanceFormatted = Number(FRIEND_BALANCE.data?.formatted);

  useEffect(() => {
    setTokens({
      ETH: {
        balance: ethBalanceFormatted,
        img: tokenImages?.eth,
        name: "ETH",
      },
      oooOOO: {
        balance: oooOOOBalanceFormatted,
        img: tokenImages?.goddog,
        name: "oooOOO",
      },
      Friend: {
        balance: friendBalanceFormatted,
        img: tokenImages?.friend,
        name: "Friend",
      },
    });
  }, [ethBalanceFormatted, oooOOOBalanceFormatted, friendBalanceFormatted]);
  return tokens;
};

export default useUserTokens;
