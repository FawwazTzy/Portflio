// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const TableTitle = ({ isMore }) => {
  return (
    <div className="flex w-full  gap-1 h-full text-textColor">
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>Tanggal & Waktu</p>
      </div>
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>NodeID</p>
      </div>
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>Nilai Tekanan</p>
      </div>
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>Status Kamera</p>
      </div>
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>Status Gauge</p>
      </div>
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>ULTG</p>
      </div>
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>Lokasi</p>
      </div>
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>Merk</p>
      </div>
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>Isolasi</p>
      </div>
      <div className="w-[10%]  border-t-[1px] border-b-[1px] border-t-textColor border-b-textColor flex justify-center items-center text-[14px]">
        <p>Zona</p>
      </div>
      {isMore > 1 && <div className="w-[4px] h-full"></div>}
    </div>
  );
};

export default TableTitle;
