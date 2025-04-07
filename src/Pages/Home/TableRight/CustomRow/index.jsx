/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const CustomRow = ({
  Id,
  status,
  nilai,
  lokasi,
  merks,
  isolasi,
  zona,
  bgColor,
  isTitle,
}) => {
  return (
    <div className="flex w-full h-full gap-1 text-[12px]">
      <div
        className={`flex w-[12%] h-full ${
          isTitle ? "text-textColor" : "text-textColor"
        }  justify-center items-center ${
          isTitle ? bgColor : "bg-backgorundSecond"
        } px-[5px]`}
      >
        <p>{Id}</p>
      </div>
      <div
        className={`flex w-[12%] h-full  ${
          isTitle ? "text-textColor" : "text-black"
        } justify-center items-center ${bgColor} px-[5px]`}
      >
        <p>{nilai}</p>
      </div>
      <div
        className={`flex w-[12%] h-full ${
          isTitle ? "text-textColor" : "text-black"
        } justify-center items-center ${bgColor} px-[5px]`}
      >
        <p>{status}</p>
      </div>
      <div
        className={`flex flex-1 w-full h-full ${
          isTitle ? "text-textColor" : "text-black"
        } justify-center items-center ${bgColor} px-[5px]`}
      >
        <p>{lokasi}</p>
      </div>
      <div
        className={`flex w-[12%] h-full ${
          isTitle ? "text-textColor" : "text-black"
        } justify-center items-center ${bgColor} px-[5px]`}
      >
        <p>{merks}</p>
      </div>
      <div
        className={`flex w-[12%] h-full ${
          isTitle ? "text-textColor" : "text-black"
        } justify-center items-center ${bgColor} px-[5px]`}
      >
        <p>{isolasi}</p>
      </div>
      <div
        className={`flex w-[12%] h-full ${
          isTitle ? "text-textColor" : "text-black"
        } justify-center items-center ${bgColor} px-[5px]`}
      >
        <p>{zona}</p>
      </div>
    </div>
  );
};

export default CustomRow;
