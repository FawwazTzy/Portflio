// eslint-disable-next-line no-unused-vars
import React from "react";
import Gauge from "../../../assets/gauge.png";
import { useZustandState } from "../../../store/state";

function ImageProduct() {
  const { setISensorImageVisible } = useZustandState((state) => state);

  const onClickHandle = () => {
    setISensorImageVisible(false);
  };

  return (
    <div className="relative flex w-full h-full  rounded-xl bg-[#507fa3] ">
      <img
        src="https://cms.ptgis.id/wp-content/uploads/2024/08/94b5a35d-29df-48b9-beea-b8cd089c29f8.jpg"
        alt="Sensor Image"
        className=" rounded-xl"
        onError={(e) => (e.target.src = Gauge)} // Jika error, pakai gray
      />
      <button
        className="absolute top-[5px] right-[5px]  text-white p-1 rounded-full z-50"
        onClick={() => onClickHandle()}
      >
        ❌
      </button>
    </div>
  );
}

export default ImageProduct;
