import uintFormat from "@/formatters/uint-format";
import { formatUserName } from "../../formatters/format-username-param";
import { friendTechHeader } from "../request-body/request-body";
const JWT = import.meta.env.VITE_FRIEND_JWT;
import pLimit from "p-limit";

const limit = pLimit(5);

async function searchByContract(address: string) {
  const response = await fetch(
    `https://prod-api.kosetto.com/users/${address}`,
    friendTechHeader
  );
  const data = await response.json();
  return data;
}

export async function getTrendingFriends() {
  try {
    const res = await fetch("https://prod-api.kosetto.com/lists/top-by-price");
    const trendingUsers = await res.json();

    return trendingUsers.users;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function SearchByUser(userName: any) {
  try {
    const formattedQueryName = formatUserName(userName);
    const response = await fetch(
      `https://prod-api.kosetto.com/v2/search/users?username=${formattedQueryName}`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE1MDM5OTAwLCJleHAiOjE3MTc2MzE5MDB9.LfBn7S7_F0FTZfwg0NhNy8ZQPXG0zFpfqds-ikv-_n4",
        },
      }
    );
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.log(error);
  }
}

export default searchByContract;

//////////////

export async function formatChartData(chartData) {
  for (const key in chartData) {
    const currentShare = chartData[key];
    const currentDate = currentShare?.date;
    const buyAmountEth = uintFormat(currentShare.ethAmount);
    const sharesBought = currentShare.shareAmount;
    const convertedDate = new Date(currentDate);
    let month = convertedDate.toLocaleString("default", { month: "long" });
    let day = convertedDate.getDate();
    let year = convertedDate.getFullYear();
    let formattedDate = `${month} ${day}, ${year}`;
    chartData[key].fullDate = formattedDate;
    const calculatePriceAtTime = Number(buyAmountEth) / Number(sharesBought);
    chartData[key].time = currentShare?.date;
  }
  return chartData;
}

//if lapotop discharges we gotta finish these last two functions here we get all chart data for users

export async function getShareChartData(shareAddress) {
  let currentPageStart = null;
  let shareChartData = [];

  const fetchActivityData = async (pageStart = null) => {
    const url = pageStart
      ? `https://prod-api.kosetto.com/users/${shareAddress}/account-trade-activity?pageStart=${pageStart}`
      : `https://prod-api.kosetto.com/users/${shareAddress}/account-trade-activity`;

    const res = await fetch(url, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHhhMjRlMTQyNmJjMzdkMGQxYTllNzAzN2Y1ZGUzMzIyZTgwMGYyZDdkIiwiaWF0IjoxNzE3MDI1MzAzLCJleHAiOjE3MTk2MTczMDN9.pk9d_c7NMUBgRC5ySrGdxwLBoHKSYjlG8RMVKN0a5JY",
      },
    });
    return await res.json();
  };

  const processActivity = (activity) => {
    return activity
      .filter((item) => item.subject && item.subject.address === shareAddress)
      .map((item) => ({
        tradedShareAddress: item.subject.address,
        traderShareAddress: item.trader.address,
        traderName: item.trader.ftName,
        traderPfp: item.trader.ftPfpUrl,
        isBuy: item.isBuy,
        shareAmount: item.shareAmount,
        value: uintFormat(item.ethAmount),
        time: item.createdAt,
      }));
  };

  try {
    let data = await fetchActivityData();
    shareChartData.push(...processActivity(data.users));
    currentPageStart = data.nextPageStart;

    const pagePromises = [];
    while (currentPageStart !== null) {
      const fetchPagePromise = fetchActivityData(currentPageStart).then(
        (newData) => {
          shareChartData.push(...processActivity(newData.users));
          return newData.nextPageStart;
        }
      );
      pagePromises.push(fetchPagePromise);
      currentPageStart = await fetchPagePromise;
    }

    await Promise.all(pagePromises);

    console.log(shareChartData);
    const sortedData: any = shareChartData.sort((a, b) => a.time - b.time);
    let lastTime: any = null;
    const adjustedData = sortedData.map((item) => {
      // If the current time is the same as the last time, increment it
      if (lastTime !== null && item.time <= lastTime) {
        item.time = lastTime + 1; // Increment by 1 millisecond
      }
      lastTime = item.time;
      return item;
    });
    return { history: adjustedData, volume: 0, change: 0 };
  } catch (error) {
    console.log(error);
    return null;
  }
}
