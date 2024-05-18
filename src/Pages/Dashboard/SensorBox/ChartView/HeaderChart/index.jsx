import {} from "react";

// eslint-disable-next-line react/prop-types
const HeaderGraph = ({ title, dateTime }) => {
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between  items-center">
        <div className="inline-flex justify-center">
          <p className="text-white text-md">Chart View {title}</p>
          <button className="bg-[#6ab782] ml-[20px] w-[70px] h-[25px] rounded-lg text-white text-xs">
            Normal
          </button>
        </div>
        <div className="flex flex-col text-white text-sm">
          <p>Last Update:</p>
          <p>{dateTime}</p>
        </div>
      </div>
      <div className=" mt-[5px] w-full h-[8px] border-b-2 border-secondary"></div>
    </div>
  );
};

export default HeaderGraph;
