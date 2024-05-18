import {} from "react";

// eslint-disable-next-line react/prop-types
const TableValue = ({ title, max, min, avg }) => {
  return (
    <div className="flex flex-col text-white text-[10px] h-[20px]">
      <div className="grid grid-cols-4 ">
        <div className="flex justify-start w-[160px]">
          <p className="truncate">{title}</p>
        </div>
        <div className="flex justify-center items-center ">
          <p>{max}</p>
        </div>
        <div className="flex justify-center items-center ">
          <p>{min}</p>
        </div>
        <div className="flex justify-center items-center ">
          <p>{avg}</p>
        </div>
      </div>
    </div>
  );
};

export default TableValue;
