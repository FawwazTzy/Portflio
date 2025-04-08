// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useZustandState } from "../../../store/state";

function ImageProduct() {
  const {
    setISensorImageVisible,
    imageUrl,
  } = useZustandState((state) => state);


  const onClickHandle = () => {
    setISensorImageVisible(false);

  };

  return (
    <div className="relative flex w-full h-full  rounded-xl bg-backgorundSecond ">
      <img
        src={imageUrl}
        alt="Sensor Image"
        className=" rounded-xl"
      />

      <button
        className="absolute top-[5px] right-[5px]  text-textColor p-1 rounded-full z-50 bg-red-500 w-[30px] h-[30px]"
        onClick={() => onClickHandle()}
      >
        ❌
      </button>
    </div>
  );
}

export default ImageProduct;
