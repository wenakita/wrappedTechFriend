import { Text } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";
function WhyCards({ icon, heading, text }: any) {
  return (
    <div
      className="rounded-md p-2 mx-auto lg:w-[400px]"
      style={{ backgroundColor: "hsl(205, 89%, 71%, 5%)" }}
    >
      <div className="flex justify-center mt-4">{icon}</div>
      <div className="mt-4 mx-auto ">
        <Heading className="text-[20px] text-center">{heading}</Heading>
        <div className="  text-start p-5 w-[280px]">
          <Text className="text-[12px]">{text}</Text>
        </div>
      </div>
    </div>
  );
}

export default WhyCards;
