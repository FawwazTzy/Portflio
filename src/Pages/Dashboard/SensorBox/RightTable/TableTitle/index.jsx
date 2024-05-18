import {} from "react";

const TableTitle = () => {
  return (
    <div className="flex flex-col mb-[5px]   ">
      <div className="grid grid-cols-4 h-[20px]">
        <div className="flex justify-center items-center bg-secondary rounded-tl-lg  ">
          <p className="text-white text-xs">Value</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white text-xs">Max</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white text-xs">Min</p>
        </div>
        <div className="flex justify-center items-center bg-secondary rounded-tr-lg">
          <p className="text-white text-xs">Avg</p>
        </div>
      </div>
    </div>
  );
};

export default TableTitle;
