// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import HomePNG from "../../../assets/home.png";
import DocumentPNG from "../../../assets/document.png";
import MapPNG from "../../../assets/map.png";
import SettingPNG from "../../../assets/setting.png";
import LogoutPNG from "../../../assets/logout.png";
import Logo from "../../../assets/govision_circle.png";
import { useZustandState } from "../../../store/state";

import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate();

  const {
    indexOfMenuActivate,

    setIndexOfMenuActivate,
  } = useZustandState((state) => state);

  const [isActive, setIsActive] = useState([false, false, false, false]);

  const onClickHandle = (index) => {
    let temp = [false, false, false, false];
    temp[index] = true;
    setIsActive(temp);
    if (index === 0 && index != indexOfMenuActivate) {
      setIndexOfMenuActivate(0);
      navigate("/home", { replace: false });
    } else if (index === 1 && index != indexOfMenuActivate) {
      setIndexOfMenuActivate(1);
      navigate("/map", { replace: false });
    }
  };

  useEffect(() => {
    const currentURL = window.location.pathname;
    console.log(currentURL);
    if (currentURL === "/home") {
      let temp = [false, false, false, false];
      temp[0] = true;
      setIsActive(temp);
    } else if (currentURL === "/map") {
      let temp = [false, false, false, false];
      temp[1] = true;
      setIsActive(temp);
    }
  }, []);

  return (
    <div className="bg-[#34495c] w-full h-screen flex-col place-items-center">
      <div className="flex flex-col h-[calc(92%)] min-h-[600px] ">
        <div className="w-[25px] h-[25px]  m-[10px] rounded-xl mb-[80px] mt-[30px] ">
          <img src={Logo} alt="" />
        </div>
        <div
          className={`flex w-full h-[50px] mb-[10px] hover:bg-[#3ab35c] items-center justify-center ${
            isActive[0] ? "bg-[#3ab35c]" : "bg-none"
          }`}
          onClick={() => onClickHandle(0)}
        >
          <img src={HomePNG} alt="" className="w-[25px] h-[25px]" />
        </div>
        <div
          className={`flex w-full h-[50px] mb-[10px] hover:bg-[#3ab35c] items-center justify-center ${
            isActive[1] ? "bg-[#3ab35c]" : "bg-none"
          }`}
          onClick={() => onClickHandle(1)}
        >
          <img src={MapPNG} alt="" className="w-[25px] h-[25px]" />
        </div>
        <div
          className={`flex w-full h-[50px] mb-[10px] hover:bg-[#3ab35c] items-center justify-center ${
            isActive[2] ? "bg-[#3ab35c]" : "bg-none"
          }`}
          onClick={() => onClickHandle(2)}
        >
          <img src={DocumentPNG} alt="" className="w-[25px] h-[25px]" />
        </div>
        <div
          className={`flex w-full h-[50px] mb-[10px] hover:bg-[#3ab35c] items-center justify-center ${
            isActive[3] ? "bg-[#3ab35c]" : "bg-none"
          }`}
          onClick={() => onClickHandle(3)}
        >
          <img src={SettingPNG} alt="" className="w-[25px] h-[25px]" />
        </div>
      </div>
      <div className="flex-1 w-full px-[10px] ">
        <div className="flex w-full h-[50px] hover:bg-[#3ab35c] items-center justify-center">
          <img src={LogoutPNG} alt="" className="w-[25px] h-[25px]" />
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
