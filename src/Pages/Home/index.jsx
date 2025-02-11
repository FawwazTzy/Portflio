import { useEffect, useState } from "react";
import { useZustandState } from "../../store/state";

import SideMenu from "../Dashboard/SideMenu";
import HeaderDashboard from "../Dashboard/Header";
import DataTOP from "./DataTOP";
import DataBottom from "./DataBottom";
import { div } from "framer-motion/m";

const Home = () => {
  const [responsiveHeightScreen, setResponsiveHeightScreen] = useState("500px");
  const [responsiveWidthScreen, setResponsiveWidthScreen] = useState("1024px");
  const [heightDataBootom, setHeightDataBootom] = useState("500");

  const [isReady, setIsReady] = useState(false);

  const {
    windowSize,

    constrainHeightScreen,
  } = useZustandState((state) => state);

  useEffect(() => {
    if (windowSize.height < 650) {
      setResponsiveHeightScreen("650px");
      console.log("650px");
      // setResponsiveHeightDeviceBox(`300px`);
      // setTopChartBox("350px");
      // setHeightMinMaxBox("365px");
      // setResponsiveHeightSensorBox("300px");
      // setTopNavigator("295px");
    } else {
      setResponsiveHeightScreen(`${windowSize.height}px`);

      // const heightDeviceBox = windowSize.height * 0.6 - 48;
      // setResponsiveHeightDeviceBox(`${heightDeviceBox}px`);
      // const tempTop = heightDeviceBox - 5;
      // setTopNavigator(`${tempTop}px`);
      // const top = heightDeviceBox + 50;
      // setTopChartBox(`${top}px`);
      // const heightSensorBox = windowSize.height * 0.4 - 10;
      // setResponsiveHeightSensorBox(`${heightSensorBox}px`); //"h-[200px]");
      // const tempHeightChartBox = heightSensorBox - 70;
      // setHeightChartBox(`${tempHeightChartBox}px`);
      // const tempHeightMinMaxBox = heightSensorBox - 60;
      // setHeightMinMaxBox(`${tempHeightMinMaxBox}px`);
    }

    if (windowSize.width < 1024) {
      setResponsiveWidthScreen(`1024px`);
    } else {
      setResponsiveWidthScreen(`${windowSize.width}px`);
    }

    let x = windowSize.height - 180 - 100 - 20;
    setHeightDataBootom(x);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log("ready");
    }, 100);

    // Cleanup function untuk memastikan timer dihentikan jika komponen unmount sebelum selesai
    return () => clearTimeout(timer);
  }, []); // Dependency array kosong -> hanya dijalankan sekali saat mount

  return (
    <div
      style={{
        height: responsiveHeightScreen,
        width: responsiveWidthScreen,
        backgroundColor: "#273647",
      }}
      className={`flex fixed h-screen w-screen`}
    >
      <div className="flex h-full w-[60px]">
        <SideMenu />
      </div>
      <div className="flex-1 flex flex-col h-full w-full ml-[20px] pr-[10px] ">
        <div className="flex bg-[#34495c]  min-h-[100px] mt-[10px]  rounded-xl">
          <HeaderDashboard />
        </div>
        <div
          // style={{ height: `${responsiveHeightScreen}` }}
          className="flex flex-1 flex-col w-full h-full pt-[20px] mr-[10px] mb-[10px]" //h-[calc(100%-100px-10px-10px)
        >
          <div className="flex w-full h-[160px]  rounded-xl border-[#258362] border-[2px] mb-[10px] p-[10px]">
            <DataTOP />
          </div>
          <div
            style={{
              height:
                responsiveHeightScreen == "650px"
                  ? "650px"
                  : `${heightDataBootom}px`,
            }}
            className="flex w-full rounded-xl border-[#258362] border-[2px] p-[10px]"
          >
            <DataBottom />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
