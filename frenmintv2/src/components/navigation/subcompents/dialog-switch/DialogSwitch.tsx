import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DialogHolding from "./DialogHolding";
import "./dialog-switch.css";
import useTokenPrice from "../../../../hooks/price/useTokenPrice";
import { getUSDValue } from "../../../../formatters/calculate-usd-value";
import uintFormat from "../../../../formatters/uint-format";

function DialogSwitch({ tokens, keys }: any) {
  let total = 0;

  const prices = useTokenPrice();

  return (
    <Tabs defaultValue="tokens" className="text-start p-2">
      <TabsList className="bg-background">
        <TabsTrigger className="TabsTrigger " value="tokens">
          Tokens
        </TabsTrigger>
        <TabsTrigger className="TabsTrigger" value="keys">
          Keys
        </TabsTrigger>
        <TabsTrigger className="TabsTrigger" value="transactions">
          Transactions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tokens">
        {tokens && (
          <div className="text-text">
            {Object.keys(tokens).map((key) => {
              const token = tokens[key];
              let USD;
              switch (key) {
                case "Friend":
                  USD = getUSDValue(prices?.friend, token?.balance);
                  break;
                case "oooOOO":
                  USD = getUSDValue(prices?.goddog, token?.balance);
                  break;
                case "ETH":
                  USD = getUSDValue(prices?.eth, token?.balance);
                  break;
              }

              return (
                <DialogHolding
                  key={key}
                  name={token?.name}
                  img={token?.img}
                  balance={token?.balance.toFixed(4)}
                  USD={USD?.toFixed(2)}
                  type={"tokens"}
                />
              );
            })}
          </div>
        )}
      </TabsContent>
      <TabsContent value="keys">
        {keys && (
          <>
            {keys?.map((item: any) => {
              const ETH_PRICE: any = prices?.eth;
              const USD: any =
                ETH_PRICE * uintFormat(item?.displayPrice) * item?.balance;
              return (
                <DialogHolding
                  key={item}
                  name={item?.ftName}
                  img={item?.ftPfpUrl}
                  balance={item?.balance}
                  USD={USD.toFixed(2)}
                  type={"keys"}
                />
              );
            })}
          </>
        )}
      </TabsContent>
      <TabsContent value="transactions"></TabsContent>
    </Tabs>
  );
}

export default DialogSwitch;
