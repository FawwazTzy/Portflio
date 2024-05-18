import {} from "react";

const TableTitle = () => {
  return (
    <div className="flex flex-col mb-[5px]   ">
      <div className="grid grid-cols-4 h-[20px] text-[10px]">
        <div className="flex justify-center items-center bg-secondary rounded-tl-lg  ">
          <p className="text-white ">Value</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white ">Max</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white ">Min</p>
        </div>
        <div className="flex justify-center items-center bg-secondary rounded-tr-lg">
          <p className="text-white ">Avg</p>
        </div>
      </div>
    </div>
  );
};

export default TableTitle;
