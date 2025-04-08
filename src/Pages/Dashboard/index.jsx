import { useState, useEffect, useRef } from "react";
import MapComponent from "./MapBox";
import HeaderDashboard from "./Header";
import DetailSensorBox from "./DetailSensorBox";
import { useZustandState } from "../../store/state";
import { fetchCheckAuth, fetchGetUnit, fetchGetNodes, fetchUserProfile } from "../../Utils/api";

import SideMenu from "./SideMenu";
import NodeBox from "./NodeBox";

import "react-datepicker/dist/react-datepicker.css";
import ImageProduct from "./ImageProduct";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();

  const [responsiveHeightScreen, setResponsiveHeightScreen] = useState("100%");
  const [responsiveWidthScreen, setResponsiveWidthScreen] = useState("100%");

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
    setDipilihULTG,
    unitSelected,
    setUserProfile

  } = useZustandState((state) => state);

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
    console.log("######################### CHECK AUTH")
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
    console.log("######################### getUnitFromServer")
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
    console.log("######################### getNodes")
    const res = await fetchGetNodes();
    const dataArray = res.data.message;
    //! menambahkan key isClicked: false
    const updatedDataArray = dataArray.map(item => ({
      ...item,
      isClicked: false
    }));

    console.log("dipilihNodeSelectedRef ", nodeSelectedRef.current.nodeName)
    //! update key isCLicked jika sebelumnya sudah di klik
    const updatedDataHaveClicked = updatedDataArray.map(item => {
      if (item.nodeName === nodeSelectedRef.current.nodeName) {
        return {
          ...item,
          isClicked: true
        };
      }
      return item;
    });
    console.log("updatedDataHaveClicked every ", updatedDataHaveClicked)
    setNodes(updatedDataHaveClicked)
    console.log("ULTGSelected #1", dipilihULTGRef.current)
    if (dipilihULTGRef.current === "" || dipilihULTGRef.current === "Semua ULTG") {
      setDipilihULTG("Semua ULTG")
      setNodesView(updatedDataHaveClicked)
    } else {
      console.log("dipilihUnitRef ", dipilihUnitRef.current)
      if (dipilihUnitRef.current === "Semua Gardu Induk") {
        const filterByULTG = updatedDataHaveClicked.filter(i => i.ULTG === dipilihULTGRef.current);
        console.log("filterByULTG ", filterByULTG)
        setNodesView(filterByULTG)
      } else {
        const filterByULTG = updatedDataHaveClicked.filter(i => i.unit === dipilihUnitRef.current);
        console.log("filterByULTG unitfilter ", filterByULTG)
        setNodesView(filterByULTG)
      }

    }

    console.log("get nodes status ", res.status)
    console.log("get nodes  ", res.data)

  }

  async function getUserProfile() {
    console.log("cek user profile")
    const res = await fetchUserProfile();
    console.log("user profile ", res.data.message);
    const dataJson = res.data.message;
    setUserProfile(dataJson)
  }

  const dipilihULTGRef = useRef(dipilihULTG);
  const dipilihUnitRef = useRef(unitSelected);
  const nodeSelectedRef = useRef(nodeSelected);

  // update ref setiap dipilihULTG berubah
  useEffect(() => {
    dipilihULTGRef.current = dipilihULTG;
  }, [dipilihULTG]);
  // update ref setiap unitSelected berubah
  useEffect(() => {
    dipilihUnitRef.current = unitSelected;
  }, [unitSelected]);
  // update ref setiap nodeSelected berubah
  useEffect(() => {
    nodeSelectedRef.current = nodeSelected;
  }, [nodeSelected]);


  useEffect(() => {
    // Kirim langsung saat pertama render
    //! check token
    console.log("#########################")
    setDipilihULTG("Semua ULTG")
    checkAuth();
    getUnitFromServer();
    getNodes();
    getUserProfile();


    //! get data unit    

    // Interval pertama
    const intervalId = setInterval(() => {
      checkAuth();
      getUnitFromServer();
      getNodes();
    }, 60 * 1000); // Set interval untuk kirim setiap 1 menit (60000 ms)

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
    }, 500); // 100ms

    return () => clearTimeout(timeout); // cleanup jika unmount
  }, []);

  return (
    // <div className="flex bg-backgorundFirst w-screen h-screen">
    //   {showContent && (
    <div
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
        {showContent && (
          <div>

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
                className={`absolute bottom-[270px] right-[250px] z-10 transition-all duration-500 ease-in-out ${isSensorImageVisible
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
          </div>
        )}

      </div>




    </div>
    // </div>

  );
};

export default Dashboard;
