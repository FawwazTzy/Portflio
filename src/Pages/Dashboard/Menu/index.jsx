import {} from "react";
import PLNICONPNG from "../../../assets/Logo_PLN.png";
import avatarPNG from "../../../assets/avatar_face.png";
// import Home_onPNG from "../../../assets/Home_on.png";
// import Home_offPNG from "../../../assets/Home_off.png";
// import Admin_onPNG from "../../../assets/Admin_Setting_on.png";
// import Admin_offPNG from "../../../assets/Admin_setting_off.png";
// import User_onPNG from "../../../assets/User_setting_on.png";
// import User_offPNG from "../../../assets/User_setting_off.png";
// import Analytics_onPNG from "../../../assets/Analytic_on.png";
// import Analytics_offPNG from "../../../assets/Analytics_off.png";
// import Sensor_onPNG from "../../../assets/Sensor_setting_on.png";
// import Sensor_offPNG from "../../../assets/Sensor_setting_off.png";
import HomeIconSVG from "../../../assets/dashbboard.svg";
import AdminIconSVG from "../../../assets/admin.svg";
import AnalyticIconSVG from "../../../assets/analytic.svg";
import SensorSVG from "../../../assets/sensor.svg";
import UserIconSVG from "../../../assets/user.svg";

import MenuItem from "./MenuItem";

const data = [
  {
    key: "1",
    title: "Dashboard",
    icon: <HomeIconSVG />,
  },
  {
    key: "2",
    title: "Admin Setting",
    icon: <AdminIconSVG />,
  },
  {
    key: "3",
    title: "User Setting",
    icon: <UserIconSVG />,
  },

  {
    key: "4",
    title: "Analytics",
    icon: <AnalyticIconSVG />,
  },
  {
    key: "5",
    title: "Sensor Setting",
    icon: <SensorSVG />,
  },
];

// eslint-disable-next-line react/prop-types
const Menu = ({ className, profile_name, profile_email }) => {
  return (
    <div className={className}>
      <div className="flex flex-col w-full h-[200px] ">
        <div className="flex w-full    justify-center pt-[15px]">
          <div className="flex h-[90px] w-[90px]">
            <img src={PLNICONPNG} alt="" />
          </div>
        </div>
        <div className="flex flex-col flex-1  w-full justify-center items-center text-white text-sm">
          <p>VENOM PLN</p>
          <p>Verticality Online Monitoring</p>
        </div>
      </div>
      <div className="bg-secondary w-full h-[2px]"></div>
      <div className="flex-1 px-[15px]">
        {data.map((item) => (
          <MenuItem
            key={item.key}
            textColor="text-white"
            iconColor="stroke-white"
            title={item.title}
            Icon={item.icon}
          />
          // <div key={item.key} className="stroke-white">
          //   <UserIconSVG />
          // </div>
        ))}
      </div>
      <div className="flex h-[60px] w-full">
        <div className=" h-full w-[48px] flex justify-center items-center ">
          <div className="h-[48px] w-[48px]  flex justify-center items-center">
            <img src={avatarPNG} alt="" className="" />
          </div>
        </div>
        <div className="ml-[15px] flex-1 flex flex-col truncate text-white text-[12px] justify-center">
          <p>{profile_name}</p>
          <p>{profile_email}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
