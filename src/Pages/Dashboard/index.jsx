import { useState, useEffect } from "react";
import MapComponent from "./MapBox";
import HeaderDashboard from "./Header";
import DetailSensorBox from "./DetailSensorBox";
// import SensorBox from "./SensorBox";
// import DeviceBox from "./DeviceBox";
// import NavigatorMap from "./NavigatorMap";
// import DeviceDetails from "./DeviceDetails";
// import Menu from "./Menu";
import { useZustandState } from "../../store/state";
import { fetchNodesData } from "./function";

import SideMenu from "./SideMenu";
import NodeBox from "./NodeBox";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageProduct from "./ImageProduct";

// import { cekCookie, cekTokenAdmin, fetchProfile } from "../../globalFunction";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const navigate = useNavigate();
  // const [userProfile, setUserProfile] = useState({
  //   username: "-",
  //   id: "-",
  //   email: "-",
  //   phone: "-",
  //   unit: "-",
  //   nodes_id: [],
  // });

  const [responsiveHeightScreen, setResponsiveHeightScreen] = useState("500px");
  const [responsiveWidthScreen, setResponsiveWidthScreen] = useState("1024px");

  // const [responsiveHeightDeviceBox, setResponsiveHeightDeviceBox] =
  //   useState("300px");
  // const [topChartBox, setTopChartBox] = useState("350px");
  const [time, setTime] = useState(new Date());
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const {
    // setDataChartAllSensor,
    // setDataChartXY,
    // setMaxY_Axis,
    // setMinY_Axis,
    // setDevices,
    // setSensorBox,
    windowSize,
    // isDetailBoxShow,
    // markerIndex,
    // responsiveHeightSensorBox,
    // setResponsiveHeightSensorBox,
    constrainHeightScreen,
    // setHeightChartBox,
    // setHeightMinMaxBox,
    // isCalenderStartOpen,
    // isCalenderEndOpen,
    // setIsCalenderStartOpen,
    // setIsCalenderEndOpen,
    // setStartDate,
    // setEndDate,
    // dataSensorSelect,
    // startDate,
    // isSensorSelect,
    // isMenuActive,
    // setIsMenuActive,
    setViewport,
    isSensorImageVisible,
    sensorClicked,
    setDataSensor,
  } = useZustandState((state) => state);

  // const handleDateChange = async (date) => {
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   if (isCalenderStartOpen) {
  //     console.log(`${day}-${month}-${year}`);
  //     setIsCalenderStartOpen(false);
  //     setIsCalenderEndOpen(false);
  //     setStartDate(`${day}-${month}-${year}`);
  //     setEndDate("End");
  //   } else {
  //     let start_date = "";
  //     let end_date = "";
  //     const temp = startDate.split("-");
  //     const startYear = temp[2].split("");
  //     let y = "29999";
  //     y = year.toString();
  //     const endYear = y.split("");

  //     console.log(`${day}-${month}-${year}`);
  //     setIsCalenderStartOpen(false);
  //     setIsCalenderEndOpen(false);
  //     setEndDate(`${day}-${month}-${year}`);

  //     start_date = `${temp[0]}${temp[1]}${startYear[2]}${startYear[3]}`;
  //     end_date = `${day}${month}${endYear[2]}${endYear[3]}`;
  //     //!! Get data by startDate and endDate
  //     const idGateway = dataSensorSelect.idGateway;
  //     const idNode = dataSensorSelect.idNode;
  //     console.log(
  //       `${start_date} - ${end_date} - idgateway ${idGateway} idnode ${idNode}`
  //     );
  //     if (isSensorSelect) {
  //       const other = await fetchChartDataOther(
  //         idGateway,
  //         idNode,
  //         start_date,
  //         end_date
  //       );
  //       setDataChartAllSensor(other);
  //       const d = convertToDataChart(other.timeOn, other.pitch);
  //       setDataChartXY(d[0]);
  //       setMaxY_Axis(d[1]);
  //       setMinY_Axis(d[2]);
  //     }
  //   }
  // };

  // const [localStorageUserToken, setLocalStorageUserToken] = useState("");

  async function getGataNode() {
    //! fetch data Nodes
    const result = await fetchNodesData();
    //! cek apakah ada sensor yang sudah di click
    const index = result.findIndex(
      (item) => item.node_id === sensorClicked.node_id
    );
    //! jika ada data yang sudah pernah di click
    if (index >= 0) {
      result[index].isClicked = sensorClicked.isClicked;
    }
    //! save to global variable
    setDataSensor(result);
    console.log(result);
    //! update center map ketika pertama kali fetchdata
    if (result[0].node_id != -1 && isFirstFetch) {
      console.log("update map pertama kali");

      const updateMap = {
        //!ikuti perhitungan function
        longitude: result[0].GPS_Koordinat[1] + 0.000211111, //kanan kiri
        latitude: result[0].GPS_Koordinat[0] - 0.0002111, //atas bawah
        zoom: 19,
      };
      setViewport(updateMap);
      setIsFirstFetch(false);
    }

    //   if (!result) {
    //     localStorage.removeItem("user");
    //     navigate("/login", { replace: true });
    //   }
    //   const user = await JSON.parse(localStorage.getItem("user"));
    //   setLocalStorageUserToken(user.token);
    //   const message = result["message"];
    //   console.log("message", message);
    //   setUserProfile(message);
    // }
  }

  // useEffect(() => {
  //   getGataNode();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  //!==================

  useEffect(() => {
    try {
      getGataNode();
      //   // eslint-disable-next-line no-inner-declarations
      //   async function fetchDevices() {
      //     const res = await axios.get(
      //       "http://venom-uitjbb.id/api/test/getDevices"
      //     );
      //     const convDevice = await processDataDevices(res.data.data);

      //     console.log("markerIndex");
      //     console.log(markerIndex);
      //     if (markerIndex != -1 && isDetailBoxShow) {
      //       convDevice[markerIndex].isClicked = true;
      //     }
      //     setDevices(convDevice);
      //     return convDevice;
      //   }

      //   // eslint-disable-next-line no-inner-declarations
      //   async function fetchSensorBox() {
      //     const res = await axios.get(
      //       "http://venom-uitjbb.id/api/test//getRealtime"
      //     );
      //     // setSensorRealtime(res.data.data);
      //     return res.data.data;
      //   }

      //   // eslint-disable-next-line no-inner-declarations
      //   async function processData() {
      //     const devices = await fetchDevices();
      //     const sensorRealtime = await fetchSensorBox();
      //     const tempSensorBoxData = await processDataToSensorBoxData(
      //       devices,
      //       sensorRealtime
      //     );
      //     setSensorBox(tempSensorBoxData);
      //     console.log("parsing data");
      //     // console.log(devices);
      //   }

      const update = () => {
        setTime(new Date());
      };

      //   //! call function
      //   processData();
      //   //! Fetch data every 1 minute
      const intervalId = setTimeout(update, 10000);
      //   //! Clean up interval on component unmount
      return () => clearInterval(intervalId);
    } catch (error) {
      console.log("error catch use effect");
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  //!==================
  useEffect(() => {
    if (windowSize.height < constrainHeightScreen) {
      setResponsiveHeightScreen("560px");
      console.log("560px");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

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
      <div className="flex-1 flex flex-col h-full w-full ml-[20px] pr-[10px]">
        <div className="flex bg-[#34495c]  h-[100px] mt-[10px]  rounded-xl">
          <HeaderDashboard />
        </div>
        <div
          // style={{ height: `${responsiveHeightScreen}` }}
          className="flex flex-1 w-full h-full pt-[20px] mr-[10px] mb-[10px]" //h-[calc(100%-100px-10px-10px)
        >
          <MapComponent />
        </div>
      </div>

      <div className="absolute bottom-[20px] right-[20px] z-10 ">
        <div
          style={{ height: `calc(${responsiveHeightScreen} - 160px)` }}
          className={`w-[150px]  bg-[#304a60] border-[#258362] border-[2px] rounded-xl`}
        >
          <NodeBox />
        </div>
      </div>
      <div
        className={`absolute bottom-[20px] right-[180px] z-10 transition-all duration-500 ease-in-out`}
      >
        <div
          style={{
            height: `240px`,
            width: `calc(${responsiveWidthScreen} - 250px - 20px)`,
          }}
          className={`border-[#258362] border-[2px] rounded-xl p-[3px]`}
        >
          <DetailSensorBox />
        </div>
      </div>
      {windowSize.height > 650 && (
        <div
          className={`absolute bottom-[270px] right-[180px] z-10 transition-all duration-500 ease-in-out ${
            isSensorImageVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-[150%] opacity-0"
          }`}
        >
          <div
            style={{
              height: `240px`,
              width: `240px`,
            }}
            className={`border-[#258362] border-[2px] rounded-xl p-[3px]`}
          >
            <ImageProduct />
          </div>
        </div>
      )}

      {/* {isDetailBoxShow && (
        <div className="absolute top-[40px] right-[calc(300px+20px)] z-10">
          <DeviceDetails />
        </div>
      )} */}
    </div>
    // </div>
  );
};

export default Dashboard;
