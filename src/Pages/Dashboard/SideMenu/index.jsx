// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import HomePNG from "../../../assets/home.png";
import DocumentPNG from "../../../assets/document.png";
import MapPNG from "../../../assets/map.png";
import SettingPNG from "../../../assets/setting.png";
import LogoutPNG from "../../../assets/logout.png";
import Logo from "../../../assets/iconProduct.png";

function SideMenu() {
  return (
    <div className="bg-[#34495c] w-full h-screen flex-col place-items-center">
      <div className="flex flex-col h-[calc(92%)] min-h-[600px] ">
        <div className="w-[25px] h-[25px]  m-[10px] rounded-xl mb-[80px] mt-[30px] ">
          <img src={Logo} alt="" />
        </div>
        <div className="w-[25px] h-[25px]  m-[10px] mb-[30px]">
          <img src={HomePNG} alt="" />
        </div>
        <div className="w-[25px] h-[25px]  m-[10px] mb-[30px]">
          <img src={MapPNG} alt="" />
        </div>
        <div className="w-[25px] h-[25px]  m-[10px] mb-[30px]">
          <img src={DocumentPNG} alt="" />
        </div>
        <div className="w-[25px] h-[25px]  m-[10px] mb-[30px]">
          <img src={SettingPNG} alt="" />
        </div>
      </div>
      <div className="flex-1 ">
        <div className="w-[25px] h-[25px]">
          <img src={LogoutPNG} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
