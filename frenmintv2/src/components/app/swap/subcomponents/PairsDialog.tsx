import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Text, TextField } from "@radix-ui/themes";
import DialogTopPairs from "./DialogTopPairs";
import { sliceContract } from "../../../../formatters/contract-slicer";
import { ImSpinner8 } from "react-icons/im";
function PairsDialog({
  trigger,
  pairs,
  type,
  set,
  dialogSearchProps,
  ERC20,
}: any) {
  const { searchInput, setSearchInput } = dialogSearchProps;
  const escEvent = new KeyboardEvent("keydown", {
    key: "Escape",
    keyCode: 27,
    code: "Escape",
    which: 27,
    bubbles: true,
    cancelable: true,
  });

  const handleSelection = (item: any) => {
    set(item);
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    if (type === "1155") {
      setSearchInput(value);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-background text-text border-background  w-[90%] ">
        <DialogHeader>
          <DialogTitle className="">
            <TextField.Root
              placeholder="Search by name"
              className="  h-[30px] outline-none focus:outline-none text-[10px]"
              variant="soft"
              onChange={handleSearch}
            >
              <TextField.Slot className="me-1 ">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </TextField.Slot>
              <Button className="ms-4 border border-soft bg-swapSecondary text-text p-2 rounded-md text-[10px]">
                ESC
              </Button>
            </TextField.Root>
            {pairs && pairs.length > 0 && <DialogTopPairs pairs={pairs} />}
          </DialogTitle>
          <DialogDescription className="p-3 h-[300px] overflow-hidden overflow-y-auto">
            {pairs && pairs.length > 0 ? (
              <div className="grid grid-flow-row">
                {pairs.map((item: any) => {
                  const address = sliceContract(item.address);
                  const IMG = item.img || item.ftPfpUrl;
                  const NAME = item.ftName || item.name;

                  return (
                    <button
                      key={item}
                      className="mt-2 text-[10px] font-bold flex justify-between"
                      onClick={() => {
                        handleSelection(item);
                        document.dispatchEvent(escEvent);
                      }}
                    >
                      <span className="flex gap-2  overflow-hidden">
                        <img src={IMG} alt="" className="size-6 rounded-full" />
                        <Text>{NAME}</Text>
                      </span>
                      <span>
                        <Text>{address}</Text>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <ImSpinner8 className="text-green-500 animate-spin text-[25px] mx-auto mt-16" />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PairsDialog;
