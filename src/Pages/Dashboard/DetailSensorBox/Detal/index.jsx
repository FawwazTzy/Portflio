// eslint-disable-next-line no-unused-vars
import { div } from "framer-motion/m";
// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function Detail({ title, value, isWithSatuan }) {
  return (
    <div className="w-full h-full flex">
      <div className="flex w-[40%] h-full text-white text-[14px] justify-start items-center">
        {title}
      </div>
      {isWithSatuan ? (
        <div className="flex flex-1 w-full h-full">
          <div className="flex flex-1 h-full text-white text-[14px] font-bold justify-start items-center">
            <p>{value}</p>
          </div>
          <div className="flex w-[40px] h-full text-white text-[14px] justify-start items-center">
            <p>bar</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 w-full h-full text-white text-[14px] font-bold justify-start items-center">
          <p>{value}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
