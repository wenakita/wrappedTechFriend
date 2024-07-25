import React from "react";
import KeyChart from "../key-chart/KeyChart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaChartArea } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

function SwapInfoDialog({ history, img, name, ERC20 }: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <MdBarChart className="text-lime text-[14px] font-bold" />
      </DialogTrigger>
      <DialogContent className="bg-background rounded-md w-[420px]  h-[270px]     p-2">
        <div className="  mb-2 md:mt-0 md:mb-0  ">
          <KeyChart
            history={history || null}
            img={img}
            name={name}
            ERC20={ERC20}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SwapInfoDialog;
