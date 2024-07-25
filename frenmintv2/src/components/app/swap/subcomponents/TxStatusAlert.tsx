import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Text } from "@radix-ui/themes";
import * as React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import "../swap.css";
function TxStatusAlert({ message, setTxMessage, txRunningProps }: any) {
  const { isTxRunning, setIsTxRunning }: any = txRunningProps;

  return (
    <Alert className="max-w-[400px] h-[50px]  mx-auto bg-swapBackground text-text border-0 font-regular mb-2">
      {message.isError ? (
        <MdError className="h-4 w-4 text-error" />
      ) : (
        <FaCheckCircle className="h-4 w-4 text-lime" />
      )}
      <AlertDescription className="">
        <Text className="font-bold">{message.message}</Text>
      </AlertDescription>
      <div className="    w-full ">
        <ProgressDemo
          setTxMessage={setTxMessage}
          setIsTxRunning={setIsTxRunning}
        />
      </div>
    </Alert>
  );
}
export function ProgressDemo({ setTxMessage, setIsTxRunning }: any) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(progress + 10), 200);
    return () => clearTimeout(timer);
  });
  React.useEffect(() => {
    if (progress === 100) {
      console.log(true);

      setTxMessage(null);
      setIsTxRunning(false);
    }
  }, [progress]);

  return (
    <Progress
      value={progress}
      className="progress-bar transition-all duration-500 ease-in-out h-[1px] w-full mt-1.5 "
    />
  );
}

export default TxStatusAlert;
