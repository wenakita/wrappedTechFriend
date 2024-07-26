import { useEffect, useState } from "react";
import { getPoolPairs } from "../../requests/sudoswap-api/sudoswap-api-calls";
import {
  friendTechContract,
  goddogContract,
} from "../../contracts/contract_addresses";
import {
  getTrendingFriends,
  SearchByUser,
} from "../../requests/friend-tech-api/friendtech-api-calls";

export const useSwapPairs = (
  ERC20: any,
  setCurrentERC1155: any,
  searchInput: any
) => {
  const [pairs, setPairs] = useState<any | undefined>();
  const [searchResults, setSearchResults] = useState<any | undefined>();

  useEffect(() => {
    const getAllPairs = async () => {
      // const oooOOO: any = await getPoolPairs(goddogContract);
      // const friend: any = await getPoolPairs(friendTechContract);
      // const eth: any = await getTrendingFriends();
      const res = await detectPairType(ERC20, searchInput);

      // if (res.length > 0) {
      //   setCurrentERC1155(res[0]);
      // }

      setPairs(res);
    };
    if (ERC20) {
      setPairs(null);
      setCurrentERC1155(null);
      getAllPairs();
    }
  }, [ERC20]);

  useEffect(() => {
    const getTrending = async () => {
      const res = await getTrendingFriends();
      setPairs(res);
    };
    const searchUser = async () => {
      const res = await SearchByUser(searchInput);
      console.log(res);
      setPairs(res);
    };
    if (searchInput.length > 0 && ERC20 === "ETH") {
      console.log(true);
      setPairs(null);
      searchUser();
    }
  }, [searchInput]);
  return pairs;
};

async function detectPairType(ERC20: string, searchInput: any) {
  let res;
  switch (ERC20.toLowerCase()) {
    case "eth":
      res = await getTrendingFriends();
      break;
    case "oooooo":
      res = await getPoolPairs(goddogContract);
      break;
    case "friend":
      res = await getPoolPairs(friendTechContract);
      break;
  }
  return res;
}

///get all pairs from this hook and in swap componenet make a useReducer to handle which available pairs to show based on
//ERC20 selected by user
