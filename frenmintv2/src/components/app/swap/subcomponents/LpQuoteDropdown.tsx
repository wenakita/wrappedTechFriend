import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Text } from "@radix-ui/themes";
import { IoIosArrowDown } from "react-icons/io";
import uintFormat from "../../../../formatters/uint-format";

//   {
//     quote: 0,
//     usd: 3252.6816378,
//     fees: 0,
//     feesUsd: 0,
//     LP: 1972832.1374341547,
//     intialTokenBalance: 1972832.1374341547,
//     delta: 12,
//     spotPrice: 23673985.64920986,
//     ethPrice: 3496.5672,
//     ERC20Price: 0.0016487371510636502,
//     depositAmount: '1',
//     ERC20Address: {
//       img:
//         'https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0x7b202496c103da5bedfe17ac8080b49bd0a333f1/35134801v4w26w52w8?Expires=1820546101&Key-Pair-Id=K11ON08J8XW8N0&Signature=hYhq6S1aeNeA6Ug5vCsR7hhh1654ftV4FSjVO6dJf6NvAoDiEzjmwUgMvVlcIZBUydwz8DEN2YegsTujuOfSdYmo-PmJD0cOigNnJxrMhFtIIqexMq7NOFaVtwTJ~r2OZ-Jk8ilbyXlAggaBYrsAqrHyv76DiulBaba6L65yTtPayfCHNGoWoDN-3UKJxmo2JOWSDvXyANXBIH04Av60CcqDUEQ0ItIskLyaScolK-zPcTBmPuMN~xlr-kxxq04mbIx0JaB1bp04zH96Z0Q164LKdh2v94vpGhZIef8oIpoARh4FJ~uTigKC75caJTmFSoYdrBjenJAblaUqmPLaPA__',
//       address: '0xddf7d080c82b8048baae54e376a3406572429b4e',
//       name: 'oooOOO'
//     }
//   }
function LpQuoteDropdown(props: any) {
  return (
    <Collapsible className="text-text  border-white mt-2 w-[95%] mx-auto">
      <div className="flex justify-between font-bold text-[14px]">
        <Text>
          1 {props.ftName} = {props.displayPrice} {props.ERC20Address.name}
        </Text>
        <CollapsibleTrigger>
          <IoIosArrowDown className="text-text mt-1" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2">
        <div className="grid grid-flow-row text-[12px] font-bold gap-y-2">
          <div className="flex justify-between">
            <Text>Amount Deposited</Text>
            <Text>{props ? props.depositAmount : 0}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Fee</Text>
            <Text>6.9%</Text>
          </div>{" "}
          <div className="flex justify-between">
            <Text>Initial LP</Text>
            <Text>
              {props ? props.LP.toFixed(2) : 0} {props.ERC20Address.name}
            </Text>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default LpQuoteDropdown;
