import { Text } from "@radix-ui/themes";
import { formatTopPairs } from "../top-pairs-format/top-pairs-formatter";

function DialogTopPairs({ pairs }: any) {
  const top10 = formatTopPairs(pairs);
  return (
    <div className="mt-3 grid grid-flow-col ">
      {pairs && (
        <>
          {top10.map((item: any) => {
            return (
              <div
                className="p-0.5  text-[9px] overflow-hidden w-[90%] whitespace-nowrap rounded-lg"
                key={item}
              >
                <span className="flex justify-start p-0.5 gap-1">
                  <img
                    src={item.ftPfpUrl ? item.ftPfpUrl : item.img}
                    alt=""
                    className="size-4 rounded-full"
                  />
                  <Text className="mt-1">
                    {item.ftName ? item.ftName : item.name}
                  </Text>
                </span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default DialogTopPairs;
