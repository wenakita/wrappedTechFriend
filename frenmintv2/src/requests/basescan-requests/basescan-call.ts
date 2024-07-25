import axios from "axios";
import { ethers } from "ethers";
import poolSwapABI from "@/contracts/abi/poolSwapABI"; //this is the abi to get all pool tx data
import { getAllPools } from "../sudoswap-api/sudoswap-api-calls";
import uintFormat from "@/formatters/uint-format";

//whats left to do for this is finding out how to calculate the price at the time of the transaction based on
//there is actually a function to calculate it given the parameters ill find
export async function getPoolChartData(poolAddress: any) {
  const priceHistory = [];
  const pools = await getAllPools();
  const logs: any = await getLogs();

  for (const log in logs) {
    const caller = logs[log].from;
    const hash = logs[log].hash;
    const input = logs[log].input;
    const timeStamp = logs[log].timeStamp;
    const decodedInput = decodeInputData(poolSwapABI, input);

    const decoded = dissectInputData(decodedInput);
    if (decoded.poolAddress.toLowerCase() === poolAddress.toLowerCase()) {
      priceHistory.push({
        ...decoded,
        timeStamp: Number(timeStamp),
        hash,
      });
    }
  }
}
//we have to check and see which input data passes in the target pool address

async function getLogs() {
  const res = await axios.get(
    "https://api.basescan.org/api?module=account&action=txlist&address=0xa07ebd56b361fe79af706a2bf6d8097091225548&startblock=0&endblock=99999999999&page=1&offset=1&sort=desc&apikey=VAAGUVZPXRQZHUITAPCE6B5VNFZPHEF44U"
  );
  console.log(res.data.result);
  return res.data.result;
}

function decodeInputData(abi: any, input: any) {
  if (input) {
    const iface = new ethers.utils.Interface(abi);
    const inputData = iface.parseTransaction({
      data: input,
    });
    console.log(inputData);
    return inputData;
  }
  return null;
}

//finish this fucntion this is wehere we dissect the input data to get the values we want
function dissectInputData(data: any) {
  let poolAddress;
  let total;
  let NFTAmount;
  let spotPrice;

  const isBuy = data.args[0][0].length > 0;
  console.log(data.args[0]);
  console.log(isBuy);

  if (isBuy) {
    poolAddress = data.args[0][0][0][0];
    NFTAmount = convertOBJToNum(data.args[0][0][0][2][0]);
    total = uintFormat(convertOBJToNum(data.args[0][0][0][3]));

    console.log(NFTAmount);
    console.log(total);

    console.log("sell");
  } else {
    poolAddress = data.args[0][1][0][0];
    NFTAmount = convertOBJToNum(data.args[0][1][0][3][0]);
    total = uintFormat(convertOBJToNum(data.args[0][1][0][6]));
    spotPrice = uintFormat(convertOBJToNum(data.args[0][1][0][7]));

    console.log(NFTAmount);
    console.log(total);
    console.log(spotPrice);
    console.log(spotPrice * 0.931);

    console.log("sell");
  }
  console.log(poolAddress);
  return { poolAddress, NFTAmount, total, spotPrice };
}

function convertOBJToNum(OBJ: any) {
  return ethers.BigNumber.from(OBJ).toString();
}

const secretRoulete = [
  "VAAGUVZPXRQZHUITAPCE6B5VNFZPHEF44U",
  "ZYU6BFVG4TXUAX1DZRH2XP7ZPFHQ85GG79",
  "9553565AKWMPP85V479Y76343EK9I7WDTU",
  "VAAGUVZPXRQZHUITAPCE6B5VNFZPHEF44U",
  "ZYU6BFVG4TXUAX1DZRH2XP7ZPFHQ85GG79",
  "9553565AKWMPP85V479Y76343EK9I7WDTU",
  "VAAGUVZPXRQZHUITAPCE6B5VNFZPHEF44U",
  "ZYU6BFVG4TXUAX1DZRH2XP7ZPFHQ85GG79",
  "9553565AKWMPP85V479Y76343EK9I7WDTU",
];
export async function findNFTAmount(blockNumber: any, isBuy: any, from: any) {
  const randomIndex = Math.floor(
    Math.random() * (secretRoulete.length - 0) + 0
  );
  console.log(randomIndex);
  const secret = secretRoulete[randomIndex];
  let amount;
  console.log(isBuy);
  const res = await axios.get(
    `https://api.basescan.org/api?module=account&action=txlist&address=${from}&startblock=${blockNumber}&endblock=${blockNumber}&page=1&offset=1&sort=asc&apikey=VAAGUVZPXRQZHUITAPCE6B5VNFZPHEF44U`
  );

  const inputData = res.data.result[0].input;
  console.log(res.data);

  let decodedInput;
  if (res.data) {
    decodedInput = decodeInputData(poolSwapABI, inputData);
  }
  console.log(decodedInput);
  if (decodedInput && isBuy) {
    if (decodedInput.args[0][0][0] && decodedInput.args[0][0][0].length > 0) {
      console.log(convertOBJToNum(decodedInput.args[0][0][0][2][0]));
      amount = convertOBJToNum(decodedInput.args[0][0][0][2][0]);
    }
  } else if (decodedInput && !isBuy) {
    console.log(true);
    console.log(decodedInput.args[0][1][0][3][0]);
    console.log(convertOBJToNum(decodedInput.args[0][1][0][3][0]));
    amount = convertOBJToNum(decodedInput.args[0][1][0][3][0]);
  }
  return amount;
}
