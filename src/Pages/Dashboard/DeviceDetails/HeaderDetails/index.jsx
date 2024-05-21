import {} from "react";
import CancelPNG from "../../../../assets/cancel.png";
import { useZustandState } from "../../../../store/state";

// eslint-disable-next-line react/prop-types
const HeaderDetails = ({ gateway, node }) => {
  const {
    setIsDetailBoxShow,
    isDetailBoxShow,
    markerIndex,
    devices,
    setDevices,
  } = useZustandState((state) => state);

  const onClickCancelHandle = () => {
    devices[markerIndex].isClicked = false;
    const devicesUpdate = devices;
    setDevices(devicesUpdate);
    console.log(isDetailBoxShow);
    setIsDetailBoxShow(false);
    console.log("nilai marker ketika di close");
    console.log(markerIndex);
  };

  return (
    <div className="flex  w-full h-[25px]  justify-between  mb-[5px]">
      <div className="flex flex-col text-[8px]">
        <p className="text-white truncate">{gateway}</p>
        <p className="text-white truncate">{node}</p>
      </div>
      <div className="flex justify-center items-center ">
        <img
          className="w-[16px] h-[16px]"
          src={CancelPNG}
          alt=""
          onClick={() => onClickCancelHandle()}
        />
      </div>
    </div>
  );
};

export default HeaderDetails;
