// eslint-disable-next-line no-unused-vars
import React from "react";
import CircleChart from "../CircleChart";

const DataBottom = () => {
  const data1 = [
    { name: "A", value: 25 },
    { name: "B", value: 25 },
    { name: "C", value: 25 },
    { name: "D", value: 25 },
    { name: "E", value: 25 },
  ];
  const data2 = [
    { name: "A", value: 10 },
    { name: "B", value: 30 },
    { name: "C", value: 60 },
  ];
  const data3 = [
    { name: "A", value: 70 },
    { name: "B", value: 30 },
  ];
  const data4 = [
    { name: "A", value: 50 },
    { name: "B", value: 50 },
  ];
  return (
    <div className="flex flex-col w-full h-full  ">
      <div className="flex w-full h-[50%] pb-[10px] ">
        <div className="flex flex-col w-[25%] h-full bg-[#314a60] rounded-xl text-white px-[10px] mr-[10px] pb-[10px]">
          <div className="flex w-full h-[40px]  text-[24px]">
            <p>Gauge Normal</p>
          </div>
          <div className="flex flex-1 w-full h-full  text-[86px] font-bold justify-start items-center font-norwester">
            <p>018</p>
          </div>
          <div className="flex w-full h-[40px]  text-[24px] ">
            <p>90 %</p>
          </div>
        </div>
        <div className="flex w-[25%] h-full bg-[#507fa3] rounded-xl px-[10px] mr-[10px]">
          <div className="flex h-[40px] w-[80px] text-white text-[24px] ">
            <p>Merk</p>
          </div>
          <div className="flex flex-1 w-full h-full  items-center justify-center">
            <CircleChart
              COLORS={["#6be5e8", "#41b8d6", "#2c8bb9", "#2e5f99", "#30356d"]}
              data={data1}
            />
          </div>
        </div>
        <div className="flex w-[25%] h-full bg-[#507fa3] rounded-xl px-[10px] mr-[10px]">
          <div className="flex h-[40px] w-[80px] text-white text-[24px] ">
            <p>Isolasi</p>
          </div>
          <div className="flex flex-1 w-full h-full  items-center justify-center">
            <CircleChart
              COLORS={["#c0ff72", "#00bf62", "#02542c"]}
              data={data2}
            />
          </div>
        </div>
        <div className="flex w-[25%] h-full bg-[#507fa3] rounded-xl px-[10px]">
          <div className="flex h-[40px] w-[80px] text-white text-[24px] ">
            <p>Zona</p>
          </div>
          <div className="flex flex-1 w-full h-full  items-center justify-center">
            <CircleChart COLORS={["#febd59", "#e15b06"]} data={data3} />
          </div>
        </div>
      </div>
      <div className="flex h-[50%] w-full  ">
        <div className="flex flex-col w-[25%] h-full bg-[#314a60] rounded-xl text-white px-[10px] mr-[10px]">
          <div className="flex w-full h-[40px] text-[24px]">
            <p>Gauge Anomali</p>
          </div>
          <div className="flex  w-full h-full  text-[86px] font-bold justify-start items-center font-norwester ">
            <p>002</p>
          </div>
          <div className="flex w-full   text-[24px] ">
            <p>10 %</p>
          </div>
        </div>
        <div className="flex w-[25%] h-full bg-[#507fa3] rounded-xl px-[10px] mr-[10px] ">
          <div className="flex h-[40px] w-[80px] text-white text-[24px] ">
            <p>Merk</p>
          </div>
          <div className="flex flex-1 w-full h-full  items-center justify-center">
            <CircleChart
              COLORS={["#6be5e8", "#41b8d6", "#2c8bb9", "#2e5f99", "#30356d"]}
              data={data1}
            />
          </div>
        </div>
        <div className="flex w-[25%] h-full bg-[#507fa3] rounded-xl px-[10px] mr-[10px]">
          <div className="flex h-[40px] w-[80px] text-white text-[24px] ">
            <p>Isolasi</p>
          </div>
          <div className="flex flex-1 w-full h-full  items-center justify-center">
            <CircleChart
              COLORS={["#c0ff72", "#00bf62", "#02542c"]}
              data={data4}
            />
          </div>
        </div>
        <div className="flex w-[25%] h-full bg-[#507fa3] rounded-xl px-[10px]">
          <div className="flex h-[40px] w-[80px] text-white text-[24px] ">
            <p>Zona</p>
          </div>
          <div className="flex flex-1 w-full h-full  items-center justify-center">
            <CircleChart COLORS={["#febd59", "#e15b06"]} data={data4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBottom;
