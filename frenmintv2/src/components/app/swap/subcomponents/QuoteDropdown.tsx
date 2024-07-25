import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Text } from "@radix-ui/themes";
import { IoIosArrowDown } from "react-icons/io";
import uintFormat from "../../../../formatters/uint-format";

function QuoteDropdown(props: any) {
  const { quote } = props;

  return (
    <Collapsible className="text-text  border-white mt-2 w-[95%] mx-auto">
      <div className="flex justify-between font-bold text-[14px]">
        <Text>
          1 {props.ftName} = {props.ftPrice || uintFormat(props.displayPrice)}{" "}
          ETH
        </Text>
        <CollapsibleTrigger>
          <IoIosArrowDown className="text-text mt-1" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2">
        <div className="grid grid-flow-row text-[12px] font-bold gap-y-2">
          <div className="flex justify-between">
            <Text>Minimum Received</Text>
            <Text>{quote ? quote.input : 0}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Fee</Text>
            <Text>6.9%</Text>
          </div>{" "}
          <div className="flex justify-between">
            <Text>Total</Text>
            <Text>
              {quote ? quote.quoteTotal.toFixed(4) : 0} {quote.ERC20_NAME}
            </Text>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default QuoteDropdown;
