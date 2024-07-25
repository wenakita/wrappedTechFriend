import { Heading, Text } from "@radix-ui/themes";
import { Button } from "../../ui/button";
import SmileAnimation from "./SmileAnimation";
import { useNavigate } from "react-router-dom";

function MdHero() {
  const navigate = useNavigate();

  return (
    <div className=" p-5 grid grid-cols-2 text-text">
      <div className="">
        <div className="grid grid-rows-1 ">
          <div className="">
            <Heading className=" text-[50px] lg:text-[60px] mx-auto leading-[95%]  md:max-w-[400px] lg:max-w-[500px] ">
              The central trading hub for friend.tech keys
            </Heading>
            <div className="mt-3 w-[400px] lg:w-[500px]  mx-auto">
              <Text className="text-[15px] lg:text-[20px]  ">
                FrenMint offers a cost-effective way to mint ERC-1155 NFTs via
                Friend.Tech shares, providing up to 38% higher revenue for
                hosts.
              </Text>
              <div className="mt-5 text-center flex justify-start gap-2">
                <Button
                  className="bg-primary hover:bg-white w-[130px] text-black"
                  onClick={() => {
                    navigate("/swap");
                  }}
                >
                  Launch App
                </Button>
                <Button className="bg-secondary hover:bg-accent w-[130px]  text-white">
                  Read Docs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-auto mb-auto ">
        <SmileAnimation />
      </div>
    </div>
  );
}

export default MdHero;
