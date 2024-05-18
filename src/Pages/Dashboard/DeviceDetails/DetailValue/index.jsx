import { useEffect, useState } from "react";
import RHPNG from "../../../../assets/rh.png";
import RollPNG from "../../../../assets/roll.png";
import TempPNG from "../../../../assets/temp.png";
import VoltagePNG from "../../../../assets/voltage.png";
import PitchPNG from "../../../../assets/pitch.png";
import CurrentPNG from "../../../../assets/current.png";
import LastUpdatePNG from "../../../../assets/last_update.png";
import ItemDetails from "./ItemDetails";

// eslint-disable-next-line react/prop-types
const DetailValue = ({ lastUpdate, p, r, t, rh, v, a }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const temp = lastUpdate.split("-");
    setDate(temp[0]);
    setTime(temp[1]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col w-full h-full ">
      <div className="grid grid-cols-3 w-full h-[calc(50%)] ">
        {/* <ItemDetails
          imgSRC={LastUpdatePNG}
          title="Last Update"
          value={lastUpdate}
          valueFontSize={"text-[8px]"}
        /> */}
        <div className="flex flex-col w-full h-full py-1">
          <div className="flex w-full h-[10px] justify-center items-center ">
            <img src={LastUpdatePNG} alt="" />
          </div>
          <div className="flex flex-col text-[8px] items-center">
            <p className="text-[#b0b1b6] text-[6px] truncate">Last Update</p>
          </div>
          <div className="flex flex-col items-center">
            <p className={`text-[#e8e9ea] truncate text-[5px]`}>{date}</p>
            <p className={`text-[#e8e9ea] truncate text-[5px]`}>{time}</p>
          </div>
        </div>
        <div className="flex w-full h-full items-center mx-[5px]">
          <div className="flex h-[calc(50%)] w-[2px] bg-[#505360]"></div>
          <ItemDetails imgSRC={PitchPNG} title="Pitch" value={p} />
          <div className="flex h-[calc(50%)] w-[2px] bg-[#505360]"></div>
        </div>
        <ItemDetails imgSRC={RollPNG} title="Roll" value={r} />
      </div>
      <div className="flex-1 grid grid-cols-4 ">
        <ItemDetails imgSRC={TempPNG} title="Temperature" value={t} />
        <div className="flex w-full h-full items-center ml-[5px]">
          <div className="flex h-[calc(50%)] w-[2px] bg-[#505360]"></div>
          <ItemDetails imgSRC={RHPNG} title="Humidity" value={rh} />
          <div className="flex h-[calc(50%)] w-[2px] bg-[#505360]"></div>
        </div>
        <div className="flex w-full h-full items-center mx-[5px]">
          <ItemDetails imgSRC={VoltagePNG} title="Voltage" value={v} />
          <div className="flex h-[calc(50%)] w-[2px] bg-[#505360]"></div>
        </div>
        <ItemDetails imgSRC={CurrentPNG} title="Current" value={a} />
      </div>
    </div>
  );
};

export default DetailValue;
