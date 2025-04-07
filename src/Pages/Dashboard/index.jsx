import { useState, useEffect, useRef } from "react";
import MapComponent from "./MapBox";
import HeaderDashboard from "./Header";
import DetailSensorBox from "./DetailSensorBox";
// import SensorBox from "./SensorBox";
// import DeviceBox from "./DeviceBox";
// import NavigatorMap from "./NavigatorMap";
// import DeviceDetails from "./DeviceDetails";
// import Menu from "./Menu";
import { useZustandState } from "../../store/state";
import { fetchCheckAuth, fetchGetUnit, fetchGetNodes } from "../../Utils/api";
// import { getUnitFromServer } from "./function";


import SideMenu from "./SideMenu";
import NodeBox from "./NodeBox";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageProduct from "./ImageProduct";
import { useNavigate } from "react-router-dom";


// import { cekCookie, cekTokenAdmin, fetchProfile } from "../../globalFunction";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  // const [userProfile, setUserProfile] = useState({
  //   username: "-",
  //   id: "-",
  //   email: "-",
  //   phone: "-",
  //   unit: "-",
  //   nodes_id: [],
  // });

  const [responsiveHeightScreen, setResponsiveHeightScreen] = useState("100%");
  const [responsiveWidthScreen, setResponsiveWidthScreen] = useState("100%");

  // const [responsiveHeightDeviceBox, setResponsiveHeightDeviceBox] =
  //   useState("300px");
  // const [topChartBox, setTopChartBox] = useState("350px");
  const [time, setTime] = useState(new Date());
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const {
    windowSize,
    constrainHeightScreen,
    setViewport,
    isSensorImageVisible,
    sensorClicked,
    setDataSensor,
    loading,
    setLoading,
    setUPT,
    setULTG,
    setUnit,
    setNodes,
    setNodesView,
    nodeSelected,
    dipilihULTG,
    setDipilihULTG
  } = useZustandState((state) => state);

  async function getGataNode() {
    //! fetch data Nodes
    // const result = await fetchNodesData();
    //! cek apakah ada sensor yang sudah di click
    // const index = result.findIndex(
    //   (item) => item.node_id === sensorClicked.node_id
    // );
    //! jika ada data yang sudah pernah di click
    // if (index >= 0) {
    //   result[index].isClicked = sensorClicked.isClicked;
    // }
    //! save to global variable
    // setDataSensor(result);
    // console.log(result);
    //! update center map ketika pertama kali fetchdata
    // if (result[0].node_id != -1 && isFirstFetch) {
    //   console.log("update map pertama kali");

    //   const updateMap = {
    //     //!ikuti perhitungan function
    //     longitude: result[0].GPS_Koordinat[1] + 0.000211111, //kanan kiri
    //     latitude: result[0].GPS_Koordinat[0] - 0.0002111, //atas bawah
    //     zoom: 19,
    //   };
    //   setViewport(updateMap);
    //   setIsFirstFetch(false);
    // }
  }

  // useEffect(() => {
  //   getGataNode();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  //!==================

  useEffect(() => {
    // try {
    //   getGataNode();
    //   const update = () => {
    //     setTime(new Date());
    //   };
    //   //   //! call function
    //   //   processData();
    //   //   //! Fetch data every 1 minute
    //   const intervalId = setTimeout(update, 10000);
    //   //   //! Clean up interval on component unmount
    //   return () => clearInterval(intervalId);
    // } catch (error) {
    //   console.log("error catch use effect");
    //   console.log(error);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  //!================================================================================================================================================
  //!================================================================================================================================================
  //!================================================================================================================================================
  //!================================================================================================================================================
  //!================================================================================================================================================
  useEffect(() => {
    if (windowSize.height < constrainHeightScreen) {
      setResponsiveHeightScreen("560px");
      console.log("560px");
    } else {
      setResponsiveHeightScreen(`${windowSize.height}px`);
    }

    if (windowSize.width < 1024) {
      setResponsiveWidthScreen(`1024px`);
    } else {
      setResponsiveWidthScreen(`${windowSize.width}px`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  async function checkAuth() {
    try {
      const response = await fetchCheckAuth();
      if (response.status != 200) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  }

  // Ambil semua unit berdasarkan nama ULTG
  function getUnitsByULTG(data, ULTGfilter) {
    return data.ULTGS
      .filter(item => item.ULTG === ULTGfilter)
      .flatMap(item => item.unit);
  }

  async function getUnitFromServer() {
    try {
      const res = await fetchGetUnit();
      const dataJson = res.data.message;
      // Ambil data pertama (karena bentuknya array)
      const data = dataJson[0];
      const UPTArray = [data.UPT];
      // Ambil semua nama ULTG unik
      const ULTG_unik = [...new Set(data.ULTGS.map(item => item.ULTG))];
      // Gabungkan dengan "Semua ULTG"
      const ULTGArray = ["Semua ULTG", ...ULTG_unik];
      // Semua unit (untuk "Semua ULTG")
      // const allUnits = dataJson.ULTGS.flatMap(item => item.unit);
      // Buat array unit:
      // - index ke-0 = semua unit
      // - index ke-1, ke-2, dst = unit sesuai urutan di ULTG_unik
      const allUnits = [
        // Semua unit:
        data.ULTGS.flatMap(item => item.unit),
        // Unit berdasarkan masing-masing ULTG
        ...ULTG_unik.map(namaULTG => getUnitsByULTG(data, namaULTG))
      ];
      // console.log("UPTArray ", UPTArray)
      // console.log("ULTGArray ", ULTGArray)
      // console.log("allUnits ", allUnits)
      setUPT(UPTArray);
      setULTG(ULTGArray);
      setUnit(allUnits)

      return true;
    } catch (error) {
      console.log("get unit error")
      return false;
    }
  }

  async function getNodes() {
    const res = await fetchGetNodes();
    const dataArray = res.data.message;
    //! menambahkan key isClicked: false
    const updatedDataArray = dataArray.map(item => ({
      ...item,
      isClicked: false
    }));
    //! update key isCLicked jika sebelumnya sudah di klik
    const updatedDataHaveClicked = updatedDataArray.map(item => {
      if (item.nodeName === nodeSelected) {
        return {
          ...item,
          isClicked: true
        };
      }
      return item;
    });
    setNodes(updatedDataHaveClicked)
    console.log("ULTGSelected ", dipilihULTGRef.current)
    if (dipilihULTGRef.current === "" || dipilihULTGRef.current === "Semua ULTG") {
      setDipilihULTG("Semua ULTG")
      console.log("updatedDataHaveClicked ", updatedDataHaveClicked)
      setNodesView(updatedDataHaveClicked)
    } else {
      const filterByULTG = updatedDataHaveClicked.filter(i => i.ULTG === dipilihULTGRef.current);
      console.log("filterByULTG ", filterByULTG)
      setNodesView(filterByULTG)
    }

    console.log("get nodes status ", res.status)
    console.log("get nodes  ", res.data)

  }

  const dipilihULTGRef = useRef(dipilihULTG);

  // update ref setiap dipilihULTG berubah
  useEffect(() => {
    dipilihULTGRef.current = dipilihULTG;
  }, [dipilihULTG]);


  useEffect(() => {
    // Kirim langsung saat pertama render
    //! check token
    checkAuth();
    getUnitFromServer();
    getNodes();


    //! get data unit    

    // Interval pertama
    const intervalId = setInterval(() => {
      checkAuth();
      getUnitFromServer();
      getNodes();
    }, 10 * 1000); // Set interval untuk kirim setiap 1 menit (60000 ms)

    // // Interval kedua
    // const intervalId2 = setInterval(() => {
    //   console.log("Interval 2 jalan");
    // }, 300 * 1000); // Set interval untuk kirim setiap 5 menit (300000 ms)

    // Cleanup saat komponen unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //! menunggu parameter height dan width screen ready
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 100); // 100ms

    return () => clearTimeout(timeout); // cleanup jika unmount
  }, []);

  return (
    <div>
      {showContent && (<div
        style={{
          height: responsiveHeightScreen,
          width: responsiveWidthScreen,
          backgroundColor: "#223849",
        }}
        className={`flex fixed h-screen w-screen`}
      >
        <div className="flex h-full w-[60px]">
          <SideMenu />
        </div>
        <div className="flex-1 flex flex-col h-full w-full ml-[20px] pr-[10px]">
          <div className="flex bg-backgorundFirst  min-h-[100px] mt-[10px]  rounded-xl">
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
            className={`w-[220px]  bg-backgorundFirst border-primary border-[2px] rounded-xl`}
          >
            <NodeBox />
          </div>
        </div>
        <div
          className={`absolute bottom-[20px] right-[250px] z-10 transition-all duration-500 ease-in-out`}
        >
          <div
            style={{
              height: `240px`,
              width: `calc(${responsiveWidthScreen} - 320px - 20px)`,
            }}
            className={`border-primary border-[2px] rounded-xl p-[3px]`}
          >
            <DetailSensorBox />
          </div>
        </div>
        {windowSize.height > 650 && (
          <div
            className={`absolute bottom-[270px] right-[180px] z-10 transition-all duration-500 ease-in-out ${isSensorImageVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-[150%] opacity-0"
              }`}
          >
            <div
              style={{
                height: `240px`,
                width: `240px`,
              }}
              className={`border-primary border-[2px] rounded-xl p-[3px]`}
            >
              <ImageProduct />
            </div>
          </div>
        )}
      </div>)}
    </div>

  );
};

export default Dashboard;
