import { Text } from "@radix-ui/themes";

function DialogHolding({ name, img, balance, USD }: any) {
  return (
    <div role="button" className="grid grid-cols-2 py-1">
      <div className="flex gap-2">
        <img
          src={img}
          className={
            img.includes("eth")
              ? "size-8 ms-1"
              : name.includes("Friend")
              ? "size-8 rounded-full ms-1"
              : "size-8 rounded-full ms-1"
          }
        />
        <div className="grid grid-rows-2 ">
          <Text className="text-text whitespace-nowrap">{name}</Text>
          <Text className="text-[9px] text-text font-bold whitespace-nowrap">
            {balance} {name}
          </Text>
        </div>
      </div>
      <div className="flex justify-end ">
        <div className="grid grid-rows-2">
          <Text className="text-text">${USD}</Text>
        </div>
      </div>
    </div>
  );
}

export default DialogHolding;
