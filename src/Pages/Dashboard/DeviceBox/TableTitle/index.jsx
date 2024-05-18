import {} from "react";

const Title = () => {
  return (
    <div className="flex flex-col mb-[5px]">
      <div className="grid grid-cols-8 h-[20px] text-[10px]">
        <div className="flex justify-center items-center bg-secondary rounded-tl-lg ">
          <p className="text-white ">Id</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white ">Name</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white ">P</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white ">R</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white ">T</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white ">RH</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white ">A</p>
        </div>
        <div className="flex justify-center items-center bg-secondary rounded-tr-lg">
          <p className="text-white ">V</p>
        </div>
      </div>
      <div className=" w-full h-[8px] border-b-2 border-secondary"></div>
    </div>
  );
};

export default Title;
