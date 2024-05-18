import {} from "react";
// import RHPNG from "../../../../assets/rh.png";
// import RollPNG from "../../../../assets/roll.png";
// import TempPNG from "../../../../assets/temp.png";
// import VoltagePNG from "../../../../assets/voltage.png";
// import PitchPNG from "../../../../assets/pitch.png";
// import CurrentPNG from "../../../../assets/current.png";

// eslint-disable-next-line react/prop-types
const ItemDetails = ({ imgSRC, title, value, valueFontSize }) => {
  return (
    <div className="flex flex-col w-full h-full space-y-2 py-1">
      <div className="flex w-full justify-center items-center ">
        <img src={imgSRC} alt="" />
      </div>
      <div className="flex flex-col text-[10px] items-center">
        <p className="text-[#b0b1b6] truncate">{title}</p>
      </div>
      <div className="flex flex-col text-[10px] items-center">
        <p className={`text-[#e8e9ea] truncate ${valueFontSize}`}>{value}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
