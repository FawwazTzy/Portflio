import {} from "react";

// eslint-disable-next-line react/prop-types
const TableValue = ({ id, name, p, r, t, rh, a, v, bgColor }) => {
  return (
    <div className={`flex flex-col mb-[5px] hover:bg-secondary ${bgColor}`}>
      <div className="grid grid-cols-8 h-[20px]">
        <div className="flex justify-center items-center   ">
          <p className="text-white text-xs truncate">{id}</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white text-xs truncate">{name}</p>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-white text-xs truncate">{p}&deg;</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white text-xs truncate">{r}&deg;</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white text-xs truncate">{t}&deg;C</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white text-xs truncate">{rh}%</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white text-xs truncate">{a}mA</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white text-xs truncate">{v}V</p>
        </div>
      </div>
    </div>
  );
};

export default TableValue;
