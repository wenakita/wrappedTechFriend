import { Text } from "@radix-ui/themes";
import React from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { Link } from "react-router-dom";

function ModalRunningTx({ message }: any) {
  return (
    <div className=" mt-16 mb-16">
      {message ? (
        <>
          {message.isError ? (
            <BiSolidErrorCircle className="text-error text-[50px] mx-auto " />
          ) : (
            <FaCheckCircle className="text-lime text-[50px] mx-auto " />
          )}
          <div className="text-center mt-3">
            <Text className="text-[12px] ">{message.message}</Text>
          </div>
          <div className="text-center">
            <Link
              to={`https://basescan.org/tx/${message.hash}`}
              target="_blank"
              className="text-[8px] text-center "
            >
              Transaction hash
            </Link>
          </div>
        </>
      ) : (
        <>
          <ImSpinner8 className="text-green-500 animate-spin text-[50px] mx-auto " />
          <div className="text-center mt-3">
            <Text className="text-[12px] ">Completing Transaction</Text>
          </div>
        </>
      )}
    </div>
  );
}

export default ModalRunningTx;
