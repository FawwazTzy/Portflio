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
import { processDataToSensorBoxData } from "./function";

const Dashboard = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  // const [devices, setDevices] = useState([]);
  const { setDevices, setSensorBox, isDetailBoxShow } = useZustandState(
    (state) => state
  );

  useEffect(() => {
    try {
      // eslint-disable-next-line no-inner-declarations
      async function fetchDevices() {
        const res = await axios.get(
          "http://venom-uitjbb.id/api/test/getDevices"
        );
        setDevices(res.data.data);
        return res.data.data;
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
        // console.log(tempSensorBoxData);
      }

      //! call function
      processData();
      //! Fetch data every 1 minute
      const intervalId = setInterval(processData, 60000);
      //! Clean up interval on component unmount
      return () => clearInterval(intervalId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col min-h-[700px]">
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
        } fixed top-0  z-30  w-[280px] h-full bg-primary transition-all duration-300 flex flex-col p-[15px]`}
        profile_email="zerohack61@gmail.com"
        profile_name="budi santoso"
      />
      {/* =========== */}
      <div className="w-full h-full">
        <MapComponent />
      </div>
      <div className="absolute bottom-[calc(40%+20px)] right-[10px] w-[420px] h-[calc(100%-40%-48px-30px)] z-10">
        <DeviceBox />
      </div>

      {isDetailBoxShow && (
        <div className="absolute top-[calc(48px+10px)] right-[calc(430px+10px)] z-10">
          <DeviceDetails />
        </div>
      )}
      <div className="absolute bottom-[10px] right-[10px] w-[calc(100%-20px)] h-[calc(40%)] min-h-[300px] z-10 ">
        <SensorBox />
      </div>
      {/* <div className="absolute bottom-[calc(40%+20px)] right-[580px] z-10">
        <NavigatorMap />
      </div> */}
    </div>
  );
};

export default Dashboard;
