import { useEffect, useState } from "react";
import {
  getTrendingFriends,
  SearchByUser,
} from "../../requests/friend-tech-api/friendtech-api-calls";

export const useLpPairs = (searchInput: any) => {
  console.log(searchInput);
  const [pairs, setPairs] = useState<any | undefined>();
  const [searchResults, setSearchResults] = useState<any | undefined>();

  useEffect(() => {
    const getTrending = async () => {
      const res = await getTrendingFriends();
      setPairs(res);
    };
    const getAllPairs = async () => {
      // const oooOOO: any = await getPoolPairs(goddogContract);
      // const friend: any = await getPoolPairs(friendTechContract);
      // const eth: any = await getTrendingFriends();
      const res = await SearchByUser(searchInput);

      console.log(res.length);
      console.log(res);

      if (res !== undefined && res.length > 2) {
        setPairs(res);
      } else if (res) {
        console.log(null);
        getTrending();
      }

      // if (res.length > 0) {
      //   setCurrentERC1155(res[0]);
      // }
    };

    if (searchInput.length > 0) {
      getAllPairs();
    } else {
      getTrending();
    }
  }, [searchInput]);

  return pairs;
};

///get all pairs from this hook and in swap componenet make a useReducer to handle which available pairs to show based on
//ERC20 selected by user
