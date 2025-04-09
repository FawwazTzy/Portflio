/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const TableValue = ({ dateTime, nodeName, pressure, statusCam, statusGauge, ultgName, garduInduk, brand, isolasi, zona }) => {
  return (
    <div className="flex w-full gap-1 mb-[5px]">
      <div className="w-[150px]   flex justify-center items-center text-[14px] bg-backgorundSecond text-textColor">
        <p>{dateTime.length > 20 ? dateTime.slice(0, 20) + '...' : dateTime}</p>
      </div>
      <div className="w-[150px]  flex justify-center items-center text-[14px] bg-backgorundSecond text-textColor">
        <p>{nodeName.length > 20 ? nodeName.slice(0, 20) + '...' : nodeName}</p>
      </div>
      <div className="w-[10%] min-w-[150px] flex justify-center items-center text-[14px] bg-backgorundThird">
        <p>{pressure.length > 20 ? pressure.slice(0, 20) + '...' : pressure}</p>
      </div>
      <div className="w-[10%] min-w-[150px]  flex justify-center items-center text-[14px] bg-backgorundThird">
        <p>{statusCam.length > 20 ? statusCam.slice(0, 20) + '...' : statusCam}</p>
      </div>
      <div className="w-[10%] min-w-[150px] flex justify-center items-center text-[14px] bg-backgorundThird">
        <p>{statusGauge.length > 20 ? statusGauge.slice(0, 20) + '...' : statusGauge}</p>
      </div>
      <div className="w-[10%] min-w-[150px]  flex justify-center items-center text-[14px] bg-backgorundThird">
        <p>{ultgName.length > 20 ? ultgName.slice(0, 20) + '...' : ultgName}</p>
      </div>
      <div className="w-[10%] min-w-[150px] flex justify-center items-center text-[14px] bg-backgorundThird">
        <p>{garduInduk.length > 20 ? garduInduk.slice(0, 20) + '...' : garduInduk}</p>
      </div>
      <div className="w-[10%] min-w-[150px]  flex justify-center items-center text-[14px] bg-backgorundThird">
        <p>{brand.length > 20 ? brand.slice(0, 20) + '...' : brand}</p>
      </div>
      <div className="w-[10%] min-w-[150px]  flex justify-center items-center text-[14px] bg-backgorundThird">
        <p>{isolasi.length > 20 ? isolasi.slice(0, 20) + '...' : isolasi}</p>
      </div>
      <div className="flex-1  min-w-[150px] flex justify-center items-center text-[14px] bg-backgorundThird">
        <p>{zona.length > 20 ? zona.slice(0, 20) + '...' : zona}</p>
      </div>
    </div>
  );
};

export default TableValue;
