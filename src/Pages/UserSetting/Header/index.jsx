import { useState, useEffect } from "react";
import PLNlogo from "../../../assets/PLN_logo.png";
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
    <div className="flex flex-col w-full ">
      <div className="w-full bg-primary h-[24px] flex px-[15px] justify-between z-20">
        <div className="flex items-center">
          <div
            className="flex mr-[15px] cursor-pointer w-[18px] h-[24px] items-center"
            onClick={() => setIsMenuActive(true)}
          >
            <img src={MenuPNG} alt="" className="w-[16px] h-[16x]" />
          </div>
          <img src={PLNlogo} alt="" className="w-[16px] h-[16px]" />
          <p className="pl-[7px] text-white text-[10px]">Venom</p>
        </div>
        <div className="flex items-center justify-items-end ">
          <div className="flex-1 pr-[5px]">
            <p className="text-white text-[10px] truncate">{currentDate}</p>
          </div>
          <div className="flex w-[55px]">
            <p className="text-white text-[10px] truncate">- {currentTime}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#424a55]"></div>
    </div>
  );
};

export default Header;
