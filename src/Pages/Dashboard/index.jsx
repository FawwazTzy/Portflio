import { useState, useEffect } from "react";
import MapComponent from "./MapBox";
import HeaderDashboard from "./Header";
import SensorBox from "./SensorBox";
import DeviceBox from "./DeviceBox";
// import NavigatorMap from "./NavigatorMap";
import DeviceDetails from "./DeviceDetails";
import Menu from "./Menu";
import { useZustandState } from "../../store/state";
import {
  processDataToSensorBoxData,
  processDataDevices,
  convertToDataChart,
  fetchChartDataOther,
} from "./function";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cekCookie, cekTokenAdmin, fetchProfile } from "../../globalFunction";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    username: "-",
    id: "-",
    email: "-",
    phone: "-",
    unit: "-",
    nodes_id: [],
  });

  const [responsiveHeightScreen, setResponsiveHeightScreen] = useState("500px");
  const [responsiveWidthScreen, setResponsiveWidthScreen] = useState("1024px");
  const [topNavigator, setTopNavigator] = useState("250px");
  const [responsiveHeightDeviceBox, setResponsiveHeightDeviceBox] =
    useState("300px");
  const [topChartBox, setTopChartBox] = useState("350px");
  // const [time, setTime] = useState(new Date());

  const {
    setDataChartAllSensor,
    setDataChartXY,
    setMaxY_Axis,
    setMinY_Axis,
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
    isCalenderStartOpen,
    isCalenderEndOpen,
    setIsCalenderStartOpen,
    setIsCalenderEndOpen,
    setStartDate,
    setEndDate,
    dataSensorSelect,
    startDate,
    isSensorSelect,
    isMenuActive,
    setIsMenuActive,
  } = useZustandState((state) => state);

  const handleDateChange = async (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    if (isCalenderStartOpen) {
      console.log(`${day}-${month}-${year}`);
      setIsCalenderStartOpen(false);
      setIsCalenderEndOpen(false);
      setStartDate(`${day}-${month}-${year}`);
      setEndDate("End");
    } else {
      let start_date = "";
      let end_date = "";
      const temp = startDate.split("-");
      const startYear = temp[2].split("");
      let y = "29999";
      y = year.toString();
      const endYear = y.split("");

      console.log(`${day}-${month}-${year}`);
      setIsCalenderStartOpen(false);
      setIsCalenderEndOpen(false);
      setEndDate(`${day}-${month}-${year}`);

      start_date = `${temp[0]}${temp[1]}${startYear[2]}${startYear[3]}`;
      end_date = `${day}${month}${endYear[2]}${endYear[3]}`;
      //!! Get data by startDate and endDate
      const idGateway = dataSensorSelect.idGateway;
      const idNode = dataSensorSelect.idNode;
      console.log(
        `${start_date} - ${end_date} - idgateway ${idGateway} idnode ${idNode}`
      );
      if (isSensorSelect) {
        const other = await fetchChartDataOther(
          idGateway,
          idNode,
          start_date,
          end_date
        );
        setDataChartAllSensor(other);
        const d = convertToDataChart(other.timeOn, other.pitch);
        setDataChartXY(d[0]);
        setMaxY_Axis(d[1]);
        setMinY_Axis(d[2]);
      }
    }
  };

  const [localStorageUserToken, setLocalStorageUserToken] = useState("");

  useEffect(() => {
    async function getDataProfile() {
      //! cek ada token di cookie ada atau tidak
      setIsMenuActive(false);
      const statusCookie = await cekCookie();

      //! jika tidak ada direct ke error page
      // console.log("statusCookie ", statusCookie);
      if (!statusCookie) {
        // Hapus data dari Local Storage dan update state
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      } else {
        //! jika ada get profile
        const result = await fetchProfile();
        if (!result) {
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
        }
        const user = await JSON.parse(localStorage.getItem("user"));
        setLocalStorageUserToken(user.token);
        const message = result["message"];
        console.log("message", message);
        setUserProfile(message);
      }
    }

    getDataProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   try {
  //     // eslint-disable-next-line no-inner-declarations
  //     async function fetchDevices() {
  //       const res = await axios.get(
  //         "http://venom-uitjbb.id/api/test/getDevices"
  //       );
  //       const convDevice = await processDataDevices(res.data.data);

  //       console.log("markerIndex");
  //       console.log(markerIndex);
  //       if (markerIndex != -1 && isDetailBoxShow) {
  //         convDevice[markerIndex].isClicked = true;
  //       }
  //       setDevices(convDevice);
  //       return convDevice;
  //     }

  //     // eslint-disable-next-line no-inner-declarations
  //     async function fetchSensorBox() {
  //       const res = await axios.get(
  //         "http://venom-uitjbb.id/api/test//getRealtime"
  //       );
  //       // setSensorRealtime(res.data.data);
  //       return res.data.data;
  //     }

  //     // eslint-disable-next-line no-inner-declarations
  //     async function processData() {
  //       const devices = await fetchDevices();
  //       const sensorRealtime = await fetchSensorBox();
  //       const tempSensorBoxData = await processDataToSensorBoxData(
  //         devices,
  //         sensorRealtime
  //       );
  //       setSensorBox(tempSensorBoxData);
  //       console.log("parsing data");
  //       // console.log(devices);
  //     }

  //     const update = () => {
  //       setTime(new Date());
  //     };

  //     //! call function
  //     processData();
  //     //! Fetch data every 1 minute
  //     const intervalId = setTimeout(update, 60000);
  //     //! Clean up interval on component unmount
  //     return () => clearInterval(intervalId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [time]);

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
        profile_email={`${userProfile.email}`}
        profile_name={`${userProfile.username}`}
        token={`${localStorageUserToken}`}
        cekTokenAdmin={`${cekTokenAdmin}`}
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
      {/* <div className="absolute bottom-[calc(40%+20px)] right-[580px]  z-10">
        <NavigatorMap />
      </div> */}
      {isCalenderStartOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Pilih Tanggal Mulai</p>
            <DatePicker
              // selected={startDate}
              onChange={handleDateChange}
              inline
            />
          </div>
        </div>
      )}
      {isCalenderEndOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Pilih Tanggal Akhir</p>
            <DatePicker
              // selected={startDate}
              onChange={handleDateChange}
              inline
            />
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default Dashboard;
