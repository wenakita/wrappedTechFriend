import { Contract, ethers } from "ethers";
import { parseEther } from "viem";
import wrapped1155ABI from "../../contracts/abi/wrapped1155ABI";
import poolTransactABI from "../../contracts/abi/poolTransactABI";
import {
  poolCreatorContract,
  poolTransactContract,
} from "../../contracts/contract_addresses";
import poolSwapABI from "../../contracts/abi/poolSwapABI";
import poolCreatorABI from "@/contracts/abi/poolCreatorABI";
let ca;
let errorMessage = "Insufficient Funds to complete the transaction";
const errorRes = { hash: null, isError: true, message: errorMessage };
export async function detectTxType(
  ERC1155: any,
  ERC20: any,
  quote: any,
  isBuy: any,
  signer: any
) {
  let res;
  const ERC20_NAME = ERC20.name.toLowerCase();
  switch (ERC20_NAME) {
    case "oooooo":
      console.log("oooOOO");
      res = isBuy
        ? await buyFromPool(ERC1155, quote, signer, isBuy)
        : await sellFromPool(ERC1155, quote, signer, isBuy);
      break;
    case "friend":
      console.log("friend");

      break;
    case "eth":
      console.log("eth");
      console.log(quote.special);
      res = isBuy
        ? await mintERC1155(ERC1155, quote, signer)
        : burnERC1155(ERC1155, quote, signer);
      break;
  }
  return res;
}

export async function createPool(
  ERC20: any,
  ERC1155: any,
  caller: any,
  quote: any,
  signer: any
) {
  console.log(ERC1155);
  console.log(quote);
  const param = [
    ERC20.address,
    "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
    "0xd0A2f4ae5E816ec09374c67F6532063B60dE037B",
    caller,
    2,
    quote?.delta,
    "69000000000000000",
    ethers.BigNumber.from(String(BigInt(quote.spotPrice * 10 ** 18))),
    ERC1155.address,
    ethers.BigNumber.from(quote?.depositAmount),
    ethers.BigNumber.from(BigInt(quote.intialTokenBalance * 10 ** 18)),
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
  ];
  ca = new Contract(poolCreatorContract, poolCreatorABI, signer);
  try {
    const res = await ca.createPairERC1155ERC20(param, {
      gasLimit: 350000,
    });
    return {
      hash: res.hash,
      isError: false,
      message: `Paired ${quote.input} key of ${ERC1155.ftName} with ${ERC20.name}`,
    };
  } catch (error) {
    console.log(error);
    return errorRes;
  }
}

async function mintERC1155(ERC1155: any, quote: any, signer: any) {
  ca = new Contract(
    "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
    wrapped1155ABI,
    signer
  );
  try {
    const res = await ca.wrap(
      ERC1155.address || ERC1155.ftAddress,
      Number(quote.input),
      "0x",
      {
        value: parseEther(String(quote.quoteTotal)),
      }
    );
    console.log("done");
    console.log();
    return {
      hash: res.hash,
      isError: false,
      message: `Minted ${quote.input} key of ${ERC1155.ftName}`,
    };
  } catch (error) {
    return errorRes;
  }
}

async function burnERC1155(ERC1155: any, quote: any, signer: any) {
  console.log("hello");
  ca = new Contract(
    "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
    wrapped1155ABI,
    signer
  );
  try {
    const res = await ca.unwrap(
      ERC1155.address || ERC1155.ftAddress,
      Number(quote.input)
    );

    console.log("done");
    console.log(res.hash);
    return {
      hash: res.hash,
      isError: false,
      message: `Burned ${quote.input} key of ${ERC1155.ftName}`,
    };
  } catch (error) {
    return errorRes;
  }
}

async function buyFromPool(ERC1155: any, quote: any, signer: any, isBuy: any) {
  const constructedParam = await paramConstructor(
    ERC1155,
    quote.special,
    isBuy,
    quote.input,
    quote.caller
  );
  const sudoSwapContract = new Contract(
    "0xa07eBD56b361Fe79AF706A2bF6d8097091225548",
    poolSwapABI,
    signer
  );
  try {
    const res = await sudoSwapContract.swap(constructedParam, {
      gasLimit: 350000,
    });
    return {
      hash: res.hash,
      isError: false,
      message: `Purchased ${quote.input} key of ${ERC1155.ftName}`,
    };
  } catch (error) {
    return errorRes;
  }
}
async function sellFromPool(ERC1155: any, quote: any, signer: any, isBuy: any) {
  const constructedParam = await paramConstructor(
    ERC1155,
    quote.special,
    isBuy,
    quote.input,
    quote.caller
  );
  const sudoSwapContract = new Contract(
    "0xa07eBD56b361Fe79AF706A2bF6d8097091225548",
    poolSwapABI,
    signer
  );
  try {
    console.log("doing");
    const res = await sudoSwapContract.swap(constructedParam, {
      gasLimit: 350000,
    });
    return {
      hash: res.hash,
      isError: false,
      message: `Sold ${quote.input} key of ${ERC1155.ftName}`,
    };
  } catch (error) {
    console.log(error);
    return errorRes;
  }
}

async function paramConstructor(
  ERC1155: any,
  special: any,
  isBuy: any,
  amount: any,
  caller: any
) {
  console.log(special);
  let output: any;
  if (isBuy) {
    output = [
      [
        [
          ERC1155.address, // pool address
          false,
          [String(amount)], //amount to buy
          ethers.BigNumber.from(special[3]), //buy price total
          "0",
          ethers.BigNumber.from(ERC1155.spotPrice), //pools current spot price
          [ethers.BigNumber.from(special[3])], //buy price total
        ],
      ],
      [],
      String(caller), //userAddy
      String(caller), //userAddy
      false,
    ];
  } else {
    output = [
      [],
      [
        [
          ERC1155.address, // pool address
          false,
          false,
          [String(amount)],
          false,
          "0x",
          ethers.BigNumber.from(String(special[3])), //sell price
          ethers.BigNumber.from(String(ERC1155.spotPrice)),
          [ethers.BigNumber.from(String(special[3]))], // sell price
        ],
      ],
      String(caller),
      String(caller),
      false,
    ];
  }
  return output;
}

export async function approveSpending(
  signer: any,
  abi: any,
  address: any,
  targetFn: any,
  params: any
) {
  console.log(true);
  ca = new Contract(address, abi, signer);
  try {
    const res = await ca.approve(params[0], params[1] ? params[1] : true);

    console.log("done");
    console.log(res.hash);
    return true;
  } catch (error) {
    return false;
  }
}
