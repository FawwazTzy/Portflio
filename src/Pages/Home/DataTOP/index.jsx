// eslint-disable-next-line no-unused-vars
import React from "react";

const DataTOP = () => {
  return (
    <div className="flex w-full h-full gap-3">
      <div className="flex flex-col w-[300px] h-full bg-gradient-to-r from-[#0297b4] to-[#7dda55] rounded-xl px-[10px]">
        <div className="flex w-full h-[40px]  text-white text-[24px]">
          <p>Kamera ON</p>
        </div>
        <div className="flex flex-1 w-full h-full  text-white ">
          <div className="flex flex-1 text-[72px] justify-start items-end font-bold ">
            <p className="font-norwester">020</p>
          </div>
          <div className="flex flex-col w-[100px] text-[24px] text-white justify-end items-end">
            <p>66.7 %</p>
            <div className="w-full h-[14px]"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[300px] h-full  bg-gradient-to-r from-[#fe312f] to-[#ff8e4d] rounded-xl px-[10px]">
        <div className="flex w-full h-[40px]  text-white text-[24px]">
          <p className="font-sans">Kamera OFF</p>
        </div>
        <div className="flex flex-1 w-full h-full  text-white ">
          <div className="flex flex-1 text-[72px] justify-start items-end font-bold ">
            <p className="font-norwester">010</p>
          </div>
          <div className="flex flex-col w-[100px] text-[24px] text-white justify-end items-end">
            <p className="font-sans">33.3 %</p>
            <div className="w-full h-[14px]"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 w-full h-full bg-[#507fa3] rounded-xl"></div>
    </div>
  );
};

export default DataTOP;
