import {} from "react";

// eslint-disable-next-line react/prop-types
const TableValue = ({ id, name, p, r, t, rh, a, v, bgColor }) => {
  return (
    <div className={`flex flex-col mb-[5px] hover:bg-secondary ${bgColor}`}>
      <div className="grid grid-cols-8 h-[20px] text-[10px]">
        <div className="flex justify-center items-center   ">
          <p className="text-white  truncate">{id}</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white  truncate">{name}</p>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-white  truncate">{p}&deg;</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white  truncate">{r}&deg;</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white  truncate">{t}&deg;C</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white  truncate">{rh}%</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white  truncate">{a}mA</p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-white  truncate">{v}V</p>
        </div>
      </div>
    </div>
  );
};

export default TableValue;
