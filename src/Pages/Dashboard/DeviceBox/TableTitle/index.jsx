import {} from "react";

const Title = () => {
  return (
    <div className="flex flex-col mb-[5px]">
      <div className="grid grid-cols-8 h-[20px]">
        <div className="flex justify-center items-center bg-secondary rounded-tl-lg ">
          <p className="text-white text-xs">Id</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white text-xs">Name</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white text-xs">P</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white text-xs">R</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white text-xs">T</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white text-xs">RH</p>
        </div>
        <div className="flex justify-center items-center bg-secondary">
          <p className="text-white text-xs">A</p>
        </div>
        <div className="flex justify-center items-center bg-secondary rounded-tr-lg">
          <p className="text-white text-xs">V</p>
        </div>
      </div>
      <div className=" w-full h-[8px] border-b-2 border-secondary"></div>
    </div>
  );
};

export default Title;
