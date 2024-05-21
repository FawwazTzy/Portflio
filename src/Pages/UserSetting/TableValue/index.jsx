import {} from "react";
import DeleteSVG from "../../../assets/delete.svg";

// eslint-disable-next-line react/prop-types
const TableValue = ({ no, username, email, phone, unit, action }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="grid grid-cols-6 h-[36px] text-[10px] w-full bg-third">
        <div className="flex justify-center items-center   ">
          <p className="text-white ">{no}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{username}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{email}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{phone}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{unit}</p>
        </div>
        <div className="flex justify-center items-center  ">
          {!action && <DeleteSVG />}
        </div>
      </div>
      <div className="w-full h-[1px] bg-[rgba(150,84,244,0.4)]"></div>
    </div>
  );
};

export default TableValue;
