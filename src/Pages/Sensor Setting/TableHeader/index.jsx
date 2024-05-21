import {} from "react";

const TableHeader = () => {
  return (
    <div className="grid grid-cols-11 h-[36px] text-[10px] w-full mb-[5px]">
      <div className="flex justify-center items-center bg-secondary rounded-tl-lg ">
        <p className="text-white ">Id</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Sensor Name</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Username</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Init Pitch</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Init Roll</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Thres Pitch</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Thres Roll</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Tinggi Tower</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Tinggi Pemasangan</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Nomor M2M</p>
      </div>
      <div className="flex justify-center items-center bg-secondary rounded-tr-lg ">
        <p className="text-white ">Last Update</p>
      </div>
    </div>
  );
};

export default TableHeader;
