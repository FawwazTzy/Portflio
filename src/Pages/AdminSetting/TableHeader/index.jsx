import {} from "react";

const TableHeader = () => {
  return (
    <div className="grid grid-cols-6 h-[24px] text-[10px] w-full mb-[5px]">
      <div className="flex justify-center items-center bg-secondary rounded-tl-lg ">
        <p className="text-white ">No</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Admin Username</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Email</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Phone Number</p>
      </div>
      <div className="flex justify-center items-center bg-secondary  ">
        <p className="text-white ">Unit</p>
      </div>
      <div className="flex justify-center items-center bg-secondary rounded-tr-lg ">
        <p className="text-white ">Action</p>
      </div>
    </div>
  );
};

export default TableHeader;
