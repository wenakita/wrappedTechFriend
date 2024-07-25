import uintFormat from "@/formatters/uint-format";
import axios from "axios";
import { findNFTAmount } from "../basescan-requests/basescan-call";

export async function getPoolTransactions(target: any) {
  ///since the api returns the transaction hash and block number we can use basescan api to get the transaction
  //then decode the input to see how much nfts was sold or bought
  //ex call : https://api.basescan.org/api?module=account&action=txlist&address=0xa07ebd56b361fe79af706a2bf6d8097091225548&startblock=0&endblock=16851000&page=1&offset=10&sort=desc&apikey=VAAGUVZPXRQZHUITAPCE6B5VNFZPHEF44U
  //the first index should be the teansaction u are looking for
  const query = `
   query {
  getNftPoolEvents(
    collectionAddress: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514"
    poolAddress:"${target}"
    networkId: 8453
    eventTypes:[SWAP_NFT_IN_POOL_V2, SWAP_NFT_OUT_POOL_V2]
  ) {
    items {
      poolAddress
      exchangeAddress
      maker
      timestamp
      tokenAddress
      transactionHash
      blockNumber
      data {
        ... on SwapNftInPoolEventDataV2 {
          amountT
          nbtRatio
          newBuyPriceT
          newDelta
          newSellPriceT
          newSpotPriceT
          nftAssets{
            quantity
            uri
          }
          nftsTransfered {
            amountT
            nftTokenId
            nftQuantity
          }
          
          poolFeeT
          protocolFeeT
          tokenBalanceT
          type
          usdRatio
        }
         ... on SwapNftOutPoolEventDataV2 {
          amountT
          nbtRatio
          newBuyPriceT
          newDelta
          newSellPriceT
          newSpotPriceT
          nftsTransfered {
            amountT
            nftTokenId
            nftQuantity
          }
          
          poolFeeT
          protocolFeeT
          tokenBalanceT
          type
          usdRatio
        }
      }
    }
  }
}`;
  const response = await axios.post(
    "https://graph.defined.fi/graphql",
    { query },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${import.meta.env.VITE_DEFINED_KEY}`, // Replace with your actual access token if needed
      },
    }
  );

  const transactions = response.data.data.getNftPoolEvents.items;
  const formattedTransactions = formatTransactions(transactions);
  return formattedTransactions;
}

async function formatTransactions(transactions: any) {
  let intiailPrice = 0;
  let change = 0;
  const output: any = { history: [], volume: 0, change: 0 };
  console.log(transactions);

  for (const transaction in transactions) {
    intiailPrice =
      transactions.indexOf(transactions[transaction]) ===
      transactions.length - 1
        ? uintFormat(transactions[transaction].data.newSellPriceT)
        : 0;
    console.log(intiailPrice);
    console.log(transactions.indexOf(transactions[transaction]));
    console.log(transactions[transaction].data);

    const isBuy =
      transactions[transaction].data.type === "SWAP_NFT_IN_POOL_V2"
        ? false
        : true;
    console.log(isBuy);
    const amount = await findNFTAmount(
      transactions[transaction].blockNumber,
      isBuy,
      transactions[transaction].maker
    );
    console.log(amount);

    const buyPrice = uintFormat(transactions[transaction].data.newBuyPriceT);
    const sellPrice = uintFormat(transactions[transaction].data.newSellPriceT);
    const maker = transactions[transaction].maker;
    const timestamp = transactions[transaction].timestamp;
    const ERC20 = transactions[transaction].tokenAddress;
    const tokenAmount = uintFormat(transactions[transaction].data.amountT);
    console.log(transactions[transaction].data.amountT);
    output.history.push({
      buyPrice,
      sellPrice,
      maker,
      time: timestamp,
      ERC20,
      amount,
      tokenAmount,
      value: sellPrice,
      open: buyPrice,
      high: buyPrice,
      low: buyPrice,
      close: buyPrice,
    });

    console.log(uintFormat(buyPrice), uintFormat(sellPrice));
  }

  for (const transaction in transactions) {
    const isBuy =
      transactions[transaction].data.type === "SWAP_NFT_IN_POOL_V2"
        ? false
        : true;
    const tokenAmount = uintFormat(transactions[transaction].data.amountT);
    const buyPrice = uintFormat(transactions[transaction].data.newBuyPriceT);
    change = isBuy
      ? change + buyPrice / intiailPrice
      : change - buyPrice / intiailPrice;
    output.volume += tokenAmount;
  }
  console.log(change);
  output.change = change.toFixed(2);
  const sortedData: any = output.history.sort((a, b) => a.time - b.time);

  output.history = sortedData;
  return output;
}
