// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import Gauge from "../../../assets/gauge.png";
import { useZustandState } from "../../../store/state";
import { fetchNodeImageProduct } from "../function";

function ImageProduct() {
  const {
    setISensorImageVisible,
    setIsFetchImageProductReady,
    isFetchImageProductReady,
    photo,
  } = useZustandState((state) => state);

  // const [photo, setPhoto] = useState("");

  // async function getNodeImageProduct() {
  //   //! fetch data Node Image product
  //   const data = await fetchNodeImageProduct(sensorClicked.node_id);
  //   console.log(data);
  //   setPhoto(data);
  // }

  const onClickHandle = () => {
    setISensorImageVisible(false);
    setIsFetchImageProductReady(false);
  };

  // useEffect(() => {
  //   getNodeImageProduct;
  // }, []);

  return (
    <div className="relative flex w-full h-full  rounded-xl bg-backgorundSecond ">
      {isFetchImageProductReady ? (
        <img
          src={photo}
          alt="Sensor Image"
          className=" rounded-xl"
          // onError={(e) => (e.target.src = Gauge)}
        />
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <p>Processing...</p>
        </div>
      )}

      <button
        className="absolute top-[5px] right-[5px]  text-textColor p-1 rounded-full z-50"
        onClick={() => onClickHandle()}
      >
        ❌
      </button>
    </div>
  );
}

export default ImageProduct;
