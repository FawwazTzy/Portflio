import {} from "react";
import CancelPNG from "../../../../assets/cancel.png";
import { useZustandState } from "../../../../store/state";

// eslint-disable-next-line react/prop-types
const HeaderDetails = ({ title }) => {
  const { setIsDetailBoxShow } = useZustandState((state) => state);
  
  return (
    <div className="flex w-full h-[24px]  justify-between mb-[10px]">
      <p className="text-white text-xs">{title}</p>
      <div className="flex justify-center items-center ">
        <img
          className="w-[16px] h-[16px]"
          src={CancelPNG}
          alt=""
          onClick={() => setIsDetailBoxShow(false)}
        />
      </div>
    </div>
  );
};

export default HeaderDetails;
