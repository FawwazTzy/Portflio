// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function DeviceBox({ title, value, isClicked, statusCam, statusGauge }) {
  return (
    <div className="flex w-full h-[80px] mb-[10px] bg-[#507fa3] rounded-xl p-[10px]">
      <div
        className={`flex w-[8px] ${
          statusCam === "on" && statusGauge === "aman"
            ? "bg-[#3AB35C]"
            : statusCam === "on" && statusGauge === "waspada"
            ? "bg-[#FFDE59]"
            : statusCam === "on" && statusGauge === "bahaya"
            ? "bg-[#C61D16]"
            : "bg-[#808080]"
        } h-full py-[2px] rounded-lg`}
      ></div>

      <div className="flex-1 flex-col w-full h-full ml-[10px]">
        <div
          className={`flex-1 w-full ${
            isClicked ? "text-green-500" : "text-white"
          }`}
        >
          <p>{title}</p>
        </div>
        <div className="flex h-[40px] w-full ">
          <div className="flex flex-1 text-[24px] text-white  h-full items-center font-bold">
            <p>{value}</p>
          </div>
          <div className="flex w-[30px] h-full text-white justify-end items-center ">
            <p>bar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceBox;
