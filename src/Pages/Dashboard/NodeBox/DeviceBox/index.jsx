/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function DeviceBox({ title = "-", value = "0.0", isClicked, statusCam = false, statusGauge = false }) {
  return (
    <div className="flex w-full h-[80px] mb-[10px] bg-backgorundSecond rounded-xl p-[10px]">
      <div
        className={`flex w-[8px] ${statusCam === "on" && statusGauge === "aman"
          ? "bg-primary"
          : statusCam === "on" && statusGauge === "waspada"
            ? "bg-[#FFDE59]"
            : statusCam === "on" && statusGauge === "bahaya"
              ? "bg-[#C61D16]"
              : "bg-[#808080]"
          } h-full py-[2px] rounded-lg`}
      ></div>

      <div className="flex-1 flex-col w-full h-full ml-[10px]">
        <div
          className={`flex-1 w-full ${isClicked ? "text-primary" : "text-textColor"
            }`}
        >
          <p>{title.length > 20 ? title.slice(0, 20) + '' : title}</p>
        </div>
        <div className="flex h-[40px] w-full ">
          <div className="flex flex-1 text-[24px] text-textColor  h-full items-center font-bold">
            <p>{value}</p>
          </div>
          <div className="flex w-[30px] h-full text-textColor justify-end items-center ">
            <p>bar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceBox;
