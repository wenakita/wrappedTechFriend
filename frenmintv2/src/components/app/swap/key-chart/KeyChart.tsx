import React from "react";
import { createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
function KeyChart({ history, img, name, ERC20 }: any) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    console.log(history);
    console.log(ERC20);

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
  return (
    <div
      className=" ms-auto  text-text rounded-md w-full h-full  bg-background "
      style={{ backgroundColor: "#02121d" }}
    >
      {history && ERC20 ? (
        <>
          <div className=" border-background border-2 rounded-md">
            <a
              href="https://tradingview.github.io/lightweight-charts/"
              className=""
            >
              <span className="flex justify-between font-bold gap-1 p-2 mt-0.5">
                <div className="flex gap-1">
                  <div className="flex gap-0">
                    <img
                      src={img}
                      alt=""
                      className="size-6 rounded-full -mr-1"
                    />
                    <img
                      src={ERC20.img}
                      alt=""
                      className="size-6 rounded-full"
                    />
                  </div>
                  <span className=" gap-1 text-[12px] mt-1">
                    {name}/{ERC20.name}
                  </span>
                </div>
                <div className="flex gap-1 text-[10px] mt-0.5">
                  <span className=" gap-1  mt-1">0.9425</span>
                  <span className=" gap-1  text-error mt-1">
                    {history ? history.change : 0}%
                  </span>
                </div>
              </span>
            </a>
            <div
              ref={chartContainerRef}
              className="mx-auto h-[200px] w-[400px] relative"
            >
              <div className="lw-attribution text-text grid grid-flow-row">
                <div>
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
                      {name}/{ERC20.name}
                      <h3>{ERC20.name !== "ETH" && "on SudoSwap"}</h3>
                    </span>
                  </span>
                </div>
                <div className="flex text-[10px] gap-2 mt-2 ms-1">
                  <p className=" font-bold  ">Volume</p>
                  <p className="text-lime">
                    {history ? history.volume.toFixed(2) : 0} {ERC20.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </>
      ) : (
        <div className="flex flex-col space-y-3 ">
          <Skeleton className="h-[125px] w-full rounded-xl bg-background" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-background w-full" />
            <Skeleton className="h-4 w-[200px] bg-background w-full" />
          </div>
        </div>
      )}
    </div>
  );
}

export default KeyChart;
