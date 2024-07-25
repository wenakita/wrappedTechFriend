import { useTransactionData } from "../../../hooks/transaction-data/useTransactionData";
import ChartComponent from "./charts/ChartComponent";
import { Text } from "@radix-ui/themes";
import TransactionsTable from "./tables/TransactionsTable";
import { useEffect, useRef, useState } from "react";
import { getPoolTransactions } from "@/requests/defined-requests/defined-fi-calls";
import { createChart } from "lightweight-charts";
import { getShareChartData } from "@/requests/friend-tech-api/friendtech-api-calls";
import "./main-app.css";
function AppMain() {
  const [history, setHistory] = useState(null);
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    test();
  }, []);
  const labelRef = useRef(null);

  //delete when u finish these are examples for creating the trading view chart for eth pair erc1155s and pools

  async function test() {
    // const [res, main] = await Promise.all([

    //   getShareChartData("0xd8e1d8f932e7b50644e5a4c94e2fcf65a1aa25b9"),
    // ]);
    //we got the pool charts ready next target is to find a way to get share chart data in the fastest way possible

    const main = await getPoolTransactions(
      "0x1F0D2950E7ae28649c990aa73eE98F12B6C83b56"
    );
    console.log(main);
    setHistory(main);
  }
  const chartContainerRef = useRef(null);
  const ethContainerRef = useRef(null);
  useEffect(() => {
    console.log(history);

    if (history && chartContainerRef.current) {
      console.log(history);
      const { history: data } = history;
      console.log(data);

      // Map the sorted data to the format expected by the chart library

      const chartOptions: any = {
        layout: {
          textColor: "white",
          background: { type: "solid", color: "#02121d" },
        },
        grid: {
          horzLines: "#705549",
          vertLines: "#353839",
        },
      };

      const chart = createChart(chartContainerRef.current, chartOptions);

      const areaSeries = chart.addAreaSeries({
        lineColor: "#2962FF",
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
      });

      areaSeries.setData(data);

      chart.timeScale().fitContent();

      // Clean up chart on component unmount
      return () => chart.remove();
    }
  }, [history]);

  // useEffect(() => {
  //   if (history && ethContainerRef.current) {
  //     const sortedData = temp.slice().sort((a, b) => a.time - b.time);

  //     // Ensure strictly ascending order by adjusting duplicate timestamps
  //     let lastTime = null;
  //     const adjustedData = sortedData.map((item) => {
  //       // If the current time is the same as the last time, increment it
  //       if (lastTime !== null && item.time <= lastTime) {
  //         item.time = lastTime + 1; // Increment by 1 millisecond
  //       }
  //       lastTime = item.time;
  //       return item;
  //     });

  //     // Map the adjusted data to the format expected by the chart
  //     const mappedData = adjustedData.map((item) => ({
  //       time: item.time / 1000, // Convert milliseconds to seconds
  //       value: item.value,
  //     }));

  //     // Chart options
  //     const chartOptions = {
  //       layout: {
  //         textColor: "white",
  //         background: { type: "solid", color: "#000000" },
  //       },
  //       timeScale: {
  //         timeVisible: true,
  //         secondsVisible: false,
  //       },
  //       grid: {},
  //     };

  //     // Create the chart
  //     const chart = createChart(ethContainerRef.current, chartOptions);

  //     // Add area series
  //     const areaSeries = chart.addAreaSeries({
  //       lineColor: "#2962FF",
  //       topColor: "#2962FF",
  //       bottomColor: "rgba(41, 98, 255, 0.28)",
  //     });

  //     // Set data for the series
  //     areaSeries.setData(mappedData);

  //     // Adjust the time scale to fit the content
  //     chart.timeScale().fitContent();

  //     // Cleanup on component unmount
  //     return () => chart.remove();
  //   }
  // }, [temp]);

  const transactions = useTransactionData();
  return (
    <div className="p-4  w-[100%] lg:w-[70%]  ms-auto me-auto">
      <div className="flex justify-center">
        {/* {transactions && <ChartComponent history={history} />} */}
      </div>

      <div className=" ms-auto  text-text  border-text  mt-4 p-5">
        <div className="text-text text-start font-extralight mx-auto">
          <Text>Mints</Text>
        </div>
        <div className="mt-3 ms-auto">
          {transactions && (
            <TransactionsTable
              data={transactions.mints.transactions}
              type={"mints"}
            />
          )}
        </div>
      </div>
      <div className=" ms-auto  text-text  border-text  mt-4 p-5">
        <div className="text-text text-start font-extralight mx-auto">
          <Text>Pools</Text>
        </div>
        <div className="mt-3 ms-auto">
          {transactions && (
            <TransactionsTable
              data={transactions.pools.transactions}
              type={"pools"}
            />
          )}
        </div>

        <div className="border border-soft border-2 rounded-md mt-10">
          <a
            href="https://tradingview.github.io/lightweight-charts/"
            className=""
          >
            <span className="flex justify-between font-bold gap-1 p-2 mt-0.5">
              <div className="flex gap-1">
                <div className="flex gap-0">
                  <img
                    src="https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0x7b202496c103da5bedfe17ac8080b49bd0a333f1/35134801v4w26w52w8?Expires=1820546101&Key-Pair-Id=K11ON08J8XW8N0&Signature=hYhq6S1aeNeA6Ug5vCsR7hhh1654ftV4FSjVO6dJf6NvAoDiEzjmwUgMvVlcIZBUydwz8DEN2YegsTujuOfSdYmo-PmJD0cOigNnJxrMhFtIIqexMq7NOFaVtwTJ~r2OZ-Jk8ilbyXlAggaBYrsAqrHyv76DiulBaba6L65yTtPayfCHNGoWoDN-3UKJxmo2JOWSDvXyANXBIH04Av60CcqDUEQ0ItIskLyaScolK-zPcTBmPuMN~xlr-kxxq04mbIx0JaB1bp04zH96Z0Q164LKdh2v94vpGhZIef8oIpoARh4FJ~uTigKC75caJTmFSoYdrBjenJAblaUqmPLaPA__"
                    alt=""
                    className="size-6 rounded-full -mr-1"
                  />
                  <img
                    src="https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0x7b202496c103da5bedfe17ac8080b49bd0a333f1/35134801v4w26w52w8?Expires=1820546101&Key-Pair-Id=K11ON08J8XW8N0&Signature=hYhq6S1aeNeA6Ug5vCsR7hhh1654ftV4FSjVO6dJf6NvAoDiEzjmwUgMvVlcIZBUydwz8DEN2YegsTujuOfSdYmo-PmJD0cOigNnJxrMhFtIIqexMq7NOFaVtwTJ~r2OZ-Jk8ilbyXlAggaBYrsAqrHyv76DiulBaba6L65yTtPayfCHNGoWoDN-3UKJxmo2JOWSDvXyANXBIH04Av60CcqDUEQ0ItIskLyaScolK-zPcTBmPuMN~xlr-kxxq04mbIx0JaB1bp04zH96Z0Q164LKdh2v94vpGhZIef8oIpoARh4FJ~uTigKC75caJTmFSoYdrBjenJAblaUqmPLaPA__"
                    alt=""
                    className="size-6 rounded-full"
                  />
                </div>
                <span className=" gap-1 text-[12px] mt-1">oooOOO/oooOOO</span>
              </div>
              <div className="flex gap-1 text-[10px] mt-0.5">
                <span className=" gap-1  mt-1">50,074</span>
                <span className=" gap-1  text-error mt-1">
                  {history ? history.change : 0}%
                </span>
              </div>
            </span>
          </a>
          <div
            ref={chartContainerRef}
            style={{
              height: "380px",
              width: "100%",
              position: "relative",
            }}
            className="mx-auto  "
          >
            <div className="lw-attribution text-text grid grid-flow-row">
              <a href="https://tradingview.github.io/lightweight-charts/">
                <span className="flex font-bold gap-1">
                  {/* <div className="flex gap-0">
                    <img
                      src="https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0x7b202496c103da5bedfe17ac8080b49bd0a333f1/35134801v4w26w52w8?Expires=1820546101&Key-Pair-Id=K11ON08J8XW8N0&Signature=hYhq6S1aeNeA6Ug5vCsR7hhh1654ftV4FSjVO6dJf6NvAoDiEzjmwUgMvVlcIZBUydwz8DEN2YegsTujuOfSdYmo-PmJD0cOigNnJxrMhFtIIqexMq7NOFaVtwTJ~r2OZ-Jk8ilbyXlAggaBYrsAqrHyv76DiulBaba6L65yTtPayfCHNGoWoDN-3UKJxmo2JOWSDvXyANXBIH04Av60CcqDUEQ0ItIskLyaScolK-zPcTBmPuMN~xlr-kxxq04mbIx0JaB1bp04zH96Z0Q164LKdh2v94vpGhZIef8oIpoARh4FJ~uTigKC75caJTmFSoYdrBjenJAblaUqmPLaPA__"
                      alt=""
                      className="size-6 rounded-full -mr-1"
                    />
                    <img
                      src="https://avatars.githubusercontent.com/u/94413972?s=280&v=4"
                      alt=""
                      className="size-6 rounded-full "
                    />
                  </div> */}
                  <span className="flex gap-1 text-[10px]">
                    oooOOO/oooOOO
                    <h3>on SudoSwap</h3>
                  </span>
                </span>
              </a>
              <div className="flex text-[10px] gap-2 mt-2 ms-1">
                <p className=" font-bold  ">Volume</p>
                <p className="text-lime">
                  {history ? history.volume.toFixed(2) : 0} oooOOO
                </p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default AppMain;
