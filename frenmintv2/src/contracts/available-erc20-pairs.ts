import {
  ethContract,
  friendTechContract,
  goddogContract,
} from "./contract_addresses";
import tokenImages from "./token-images";

const ERC20_PAIRS: any = [
  {
    img: tokenImages.eth,
    address: ethContract,
    name: "ETH",
  },
  {
    img: tokenImages.goddog,
    address: goddogContract,
    name: "oooOOO",
  },
  {
    img: tokenImages.friend,
    address: friendTechContract,
    name: "Friend",
  },
];

export default ERC20_PAIRS;
