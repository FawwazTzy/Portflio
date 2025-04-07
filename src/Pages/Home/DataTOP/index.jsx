// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
import { useZustandStateHome } from "../../../store/stateHome";
import GrafikBatang from "../GrafikBatang";
import { formatNumber } from "../function";

const DataTOP = () => {
  const {
    setIsBoxClick,
    dataSensorKameraOn,
    dataSensorKameraOff,
    fetchDataError,
    percentageKameraOn,
    percentageKameraOff,
  } = useZustandStateHome((state) => state);

  const onClickHandleKameraOn = () => {
    setIsBoxClick("kameraOn");
  };

  const onClickHandleKameraOff = () => {
    setIsBoxClick("kameraOff");
  };

  return (
    <div className="flex w-full h-full gap-3">
      <div
        className="flex flex-col cursor-pointer w-[200px] h-full bg-gradient-to-r from-[#0297b4] to-[#7dda55] rounded-xl px-[10px]"
        onClick={() => onClickHandleKameraOn()}
      >
        <div className="flex w-full h-[40px]  text-textColor text-[24px]">
          <p>Kamera ON</p>
        </div>
        <div className="flex flex-1 w-full h-full  text-textColor ">
          <div className="flex flex-1 text-[72px] justify-start items-end font-bold ">
            <p className="font-norwester">
              {formatNumber(dataSensorKameraOn.length)}
            </p>
          </div>
          <div className="flex flex-col w-[100px] text-[24px] text-textColor justify-end items-end">
            <p>{!fetchDataError ? percentageKameraOn : 0} %</p>
            <div className="w-full h-[14px]"></div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col cursor-pointer w-[200px] h-full  bg-gradient-to-r from-[#fe312f] to-[#ff8e4d] rounded-xl px-[10px] "
        onClick={() => onClickHandleKameraOff()}
      >
        <div className="flex w-full h-[40px]  text-textColor text-[24px]">
          <p className="font-sans">Kamera OFF</p>
        </div>
        <div className="flex flex-1 w-full h-full  text-textColor ">
          <div className="flex flex-1 text-[72px] justify-start items-end font-bold ">
            <p className="font-norwester">
              {formatNumber(dataSensorKameraOff.length)}
            </p>
          </div>
          <div className="flex flex-col w-[100px] text-[24px] text-textColor justify-end items-end">
            <p className="font-sans">
              {!fetchDataError ? percentageKameraOff : 0} %
            </p>
            <div className="w-full h-[14px]"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 w-full h-full bg-backgorundSecond rounded-xl">
        <GrafikBatang />
      </div>
    </div>
  );
};

export default DataTOP;
