import { Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

function DialogHeroCards({ message, icon }: any) {
  return (
    <button className="primary-accent-gradient-linear rounded-md p-3">
      <div className="text-start">
        {icon}
        <div className="mt-2">
          <Link to={"/swap"} className="">
            {message}
          </Link>
        </div>
      </div>
    </button>
  );
}

export default DialogHeroCards;
