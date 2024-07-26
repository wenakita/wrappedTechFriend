import { Text } from "@radix-ui/themes";

function ModalBody({ message, usd, amount, img }: any) {
  return (
    <div
      className="p-3 rounded-lg border border-soft grid grid-cols-2 bg-background"
      //   style={{ backgroundColor: "#04222f" }}
    >
      <div className="grid grid-rows-3 gap-y-1 w-full justify-start text-text text-[14px]">
        <div className=" text-start">
          <Text
            className="font-regular text-[10px]  ms-0.5"
            style={{ color: "grey" }}
          >
            {message ? message : message}
          </Text>
        </div>
        <div className="text-start">
          <Text className="text-[23px] ms-1 ">{amount ? amount : 0}</Text>
        </div>
        <div className="text-start ms-1.5">
          <Text className="font-regular" style={{ color: "grey" }}>
            ${usd ? usd : 0}
          </Text>
        </div>
      </div>
      <div className="">
        <img
          src={img || ""}
          alt=""
          className="size-10 ms-auto  mt-5 me-3 rounded-full"
        />
      </div>
    </div>
  );
}

export default ModalBody;
