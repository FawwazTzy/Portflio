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
    <div className="flex flex-col w-full h-full  py-1">
      <div className="flex w-full h-[10px] justify-center items-center ">
        <img src={imgSRC} alt="" />
      </div>
      <div className="flex flex-col text-[8px] items-center">
        <p className="text-[#b0b1b6] text-[6px] truncate">{title}</p>
      </div>
      <div className="flex flex-col text-[8px] items-center">
        <p className={`text-[#e8e9ea] text-[8px] truncate ${valueFontSize}`}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default ItemDetails;
