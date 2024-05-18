import { useState, useEffect } from "react";
// import DropDownHeader from "../DropDownHeader";
import PLNlogo from "../../../assets/PLN_logo.png";
import DropDownHeader from "./DropDownHeader";
import MenuPNG from "../../../assets/menu.png";

// eslint-disable-next-line react/prop-types
const Header = ({ setIsMenuActive }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const dayOfWeek = daysOfWeek[now.getDay()];
      const dayOfMonth = now.getDate();
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      const formattedTime = `${hours}:${minutes}:${seconds}`;
      const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-primary h-[48px] flex p-[15px] justify-between z-20">
      <div className="flex items-center">
        <div
          className="flex mr-[15px] cursor-pointer w-[18px] h-[48px] items-center"
          onClick={() => setIsMenuActive(true)}
        >
          <img src={MenuPNG} alt="" className="w-[18px] h-[18x]" />
        </div>
        <img src={PLNlogo} alt="" className="w-[24px] h-[24px]" />
        <p className="pl-[7px] text-white text-xs">Venom</p>
      </div>
      <div className="flex items-center justify-center  w-[230px]">
        <div className="flex justify-end w-[150px] pr-[5px]">
          <p className="text-white text-xs truncate">{currentDate}</p>
        </div>
        <div className="flex-1  ">
          <p className="text-white text-xs truncate">- {currentTime}</p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="text-white text-xs pr-[10px]">View filter:</p>
        <DropDownHeader />
      </div>
    </div>
  );
};

export default Header;
