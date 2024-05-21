import { useState, useEffect } from "react";
import axios from "axios";

import MapComponent from "./MapBox";
import HeaderDashboard from "./Header";
import SensorBox from "./SensorBox";
import DeviceBox from "./DeviceBox";
// import NavigatorMap from "./NavigatorMap";
import DeviceDetails from "./DeviceDetails";
import Menu from "./Menu";
import { useZustandState } from "../../store/state";
import { processDataToSensorBoxData, processDataDevices } from "./function";

const Dashboard = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [responsiveHeightScreen, setResponsiveHeightScreen] = useState("500px");
  const [responsiveWidthScreen, setResponsiveWidthScreen] = useState("1024px");
  const [topNavigator, setTopNavigator] = useState("250px");
  const [responsiveHeightDeviceBox, setResponsiveHeightDeviceBox] =
    useState("300px");
  const [topChartBox, setTopChartBox] = useState("350px");
  const [time, setTime] = useState(new Date());

  const {
    setDevices,
    setSensorBox,
    windowSize,
    isDetailBoxShow,
    markerIndex,
    responsiveHeightSensorBox,
    setResponsiveHeightSensorBox,
    constrainHeightScreen,
    setHeightChartBox,
    setHeightMinMaxBox,
  } = useZustandState((state) => state);

  useEffect(() => {
    try {
      // eslint-disable-next-line no-inner-declarations
      async function fetchDevices() {
        const res = await axios.get(
          "http://venom-uitjbb.id/api/test/getDevices"
        );
        const convDevice = await processDataDevices(res.data.data);

        console.log("markerIndex");
        console.log(markerIndex);
        if (markerIndex != -1 && isDetailBoxShow) {
          convDevice[markerIndex].isClicked = true;
        }
        setDevices(convDevice);
        return convDevice;
      }

      // eslint-disable-next-line no-inner-declarations
      async function fetchSensorBox() {
        const res = await axios.get(
          "http://venom-uitjbb.id/api/test//getRealtime"
        );
        // setSensorRealtime(res.data.data);
        return res.data.data;
      }

      // eslint-disable-next-line no-inner-declarations
      async function processData() {
        const devices = await fetchDevices();
        const sensorRealtime = await fetchSensorBox();
        const tempSensorBoxData = await processDataToSensorBoxData(
          devices,
          sensorRealtime
        );
        setSensorBox(tempSensorBoxData);
        console.log("parsing data");
        // console.log(devices);
      }

      const update = () => {
        setTime(new Date());
      };

      //! call function
      processData();
      //! Fetch data every 1 minute
      const intervalId = setTimeout(update, 60000);
      //! Clean up interval on component unmount
      return () => clearInterval(intervalId);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    if (windowSize.height < constrainHeightScreen) {
      setResponsiveHeightScreen(`900px`);
      setResponsiveHeightDeviceBox(`300px`);
      setTopChartBox("350px");
      setHeightMinMaxBox("365px");
      setResponsiveHeightSensorBox("300px");
      setTopNavigator("295px");
    } else {
      setResponsiveHeightScreen(`${windowSize.height}px`);
      const heightDeviceBox = windowSize.height * 0.6 - 48;
      setResponsiveHeightDeviceBox(`${heightDeviceBox}px`);
      const tempTop = heightDeviceBox - 5;
      setTopNavigator(`${tempTop}px`);
      const top = heightDeviceBox + 50;
      setTopChartBox(`${top}px`);
      const heightSensorBox = windowSize.height * 0.4 - 10;
      setResponsiveHeightSensorBox(`${heightSensorBox}px`); //"h-[200px]");
      const tempHeightChartBox = heightSensorBox - 70;
      setHeightChartBox(`${tempHeightChartBox}px`);
      const tempHeightMinMaxBox = heightSensorBox - 60;
      setHeightMinMaxBox(`${tempHeightMinMaxBox}px`);
    }

    if (windowSize.width < 1024) {
      setResponsiveWidthScreen(`1024px`);
    } else {
      setResponsiveWidthScreen(`${windowSize.width}px`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return (
    // <div className="h-screen w-screen relative">
    <div
      style={{
        height: responsiveHeightScreen,
        width: responsiveWidthScreen,
      }}
      className={`flex flex-col fixed`}
    >
      <HeaderDashboard setIsMenuActive={setIsMenuActive} />
      {/* icon menu */}
      {isMenuActive && (
        <div
          className="absolute top-0 left-0 z-20 w-full h-full "
          onClick={() => setIsMenuActive(false)}
        ></div>
      )}
      <Menu
        className={`${
          isMenuActive ? "left-0 " : "-left-[500px]"
        } fixed top-0  z-30  w-[240px] h-full bg-primary transition-all duration-300 flex flex-col p-[15px]`}
        profile_email="zerohack61@gmail.com"
        profile_name="budi santoso"
      />
      {/* =========== */}
      <div
        style={{
          height: responsiveHeightScreen,
          width: responsiveWidthScreen,
        }}
        className="fixed"
      >
        <MapComponent topNavigator={topNavigator} />
      </div>
      <div
        style={{
          height: responsiveHeightDeviceBox,
        }}
        className={`absolute top-[40px] right-[10px] w-[300px] z-10`}
      >
        <DeviceBox />
      </div>

      {isDetailBoxShow && (
        <div className="absolute top-[40px] right-[calc(300px+20px)] z-10">
          <DeviceDetails />
        </div>
      )}
      <div
        style={{
          top: topChartBox,
          height: responsiveHeightSensorBox,
        }}
        className={`absolute  right-[10px] w-[calc(100%-20px)] z-10 `} //top-[calc(60%-48px-30px+65px)]
      >
        <SensorBox />
      </div>
      {/* <div className="absolute bottom-[calc(40%+20px)] right-[580px] z-10">
        <NavigatorMap />
      </div> */}
    </div>
    // </div>
  );
};

export default Dashboard;
