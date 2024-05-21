/* eslint-disable react/prop-types */
import {} from "react";

// eslint-disable-next-line react/prop-types
const TableValue = ({
  id,
  sensorName,
  username,
  initPitch,
  initRoll,
  thresPitch,
  thresRoll,
  tinggiTower,
  tinggiPemasangan,
  nomorM2M,
  lastUpdate,
}) => {
  return (
    <div className="w-full flex flex-col">
      <div className="grid grid-cols-11 h-[36px] text-[10px] w-full bg-third">
        <div className="flex justify-center items-center   ">
          <p className="text-[#47a0b7] ">{id}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{sensorName}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{username}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{initPitch}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{initRoll}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{thresPitch}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{thresRoll}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-[#47a0b7] ">{tinggiTower}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{tinggiPemasangan}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{nomorM2M}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{lastUpdate}</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[rgba(150,84,244,0.4)]"></div>
    </div>
  );
};

export default TableValue;
