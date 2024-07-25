import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useUserInfo } from "../../hooks/wallet-info/useUserInfo";
import WalletDialog from "./subcompents/wallet-dialog/wallet-dialog/WalletDialog";
import { Link } from "react-router-dom";
function Navigation() {
  const userData = useUserInfo();
  return (
    <div className="border p-2 border-gray-800 flex justify-between">
      <div className="flex">
        <div className="mt-auto mb-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className=" p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="14"
                height="14"
                viewBox="0 0 50 50"
                fill="white"
              >
                <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-soft text-text border-0">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />  the code below store data and urls in a array and just mapp the dropDownmenu items below for less code*/}
              <DropdownMenuItem className="text-[10px]">
                <Link to={"/app"}>App</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[10px]">
                <Link to={"/swap"}>Swap</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[10px]">
                Documentation
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[10px]">
                Whitepaper
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[10px]">
                Meet The Team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link to={"/"} className="ms-2 mt-auto mb-auto text-[20px]">
          🦕
        </Link>
      </div>
      <div className="flex gap-3">
        {!userData?.isLoggedIn && (
          <Button
            className="text-[11px] text-text bg-secondary "
            onClick={userData?.action}
          >
            {"Connect Wallet"}
          </Button>
        )}

        {userData?.isLoggedIn && <WalletDialog {...userData} />}
      </div>
    </div>
  );
}

export default Navigation;
