import { Text } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";
import images from "../images";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
function SmHero() {
  const navigate = useNavigate();
  return (
    <div className="text-text">
      <div className="  w-full text-center ">
        <Heading className="p-1 text-[45px] md:text-[60px] mx-auto leading-[95%] max-w-[500px] md:max-w-[600px]">
          The central trading hub for friend.tech keys
        </Heading>
        <div className="grid grid-cols-5 size-[280px] mx-auto mt-5 h-[50px] gap-2">
          {images.map((item: any) => {
            return (
              <div key={item} className="-mr-4">
                <img src={item} alt="" className="rounded-full" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto  text-center mt-9 w-[300px]">
        <Text className="text-[12px] ">
          FrenMint offers a cost-effective way to mint ERC-1155 NFTs via
          Friend.Tech shares, providing up to 38% higher revenue for hosts.
        </Text>
      </div>
      <div className="mt-5   text-center ">
        <Button
          className="bg-primary hover:bg-white w-[380px] text-black"
          onClick={() => {
            navigate("/swap");
          }}
        >
          Launch App
        </Button>
        <Button className="bg-secondary hover:bg-accent w-[380px] mt-3 text-white">
          Read Docs
        </Button>
      </div>
    </div>
  );
}

export default SmHero;
