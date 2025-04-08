import { useState, useEffect, useRef } from "react";
import { useZustandState } from "../../store/state";
import { useZustandStateHome } from "../../store/stateHome";

import SideMenu from "../Dashboard/SideMenu";
import HeaderDashboard from "../Dashboard/Header";
import DataTop from "./DataTop";
import DataBottom from "./DataBottom";
import { useNavigate } from "react-router-dom";

import { fetchCheckAuth, fetchGetUnit, fetchGetNodes, fetchUserProfile } from "../../Utils/api";



const Document = () => {
  const navigate = useNavigate();
  const [responsiveHeightScreen, setResponsiveHeightScreen] = useState("100%");
  const [responsiveWidthScreen, setResponsiveWidthScreen] = useState("100%");
  const [heightDataBootom, setHeightDataBootom] = useState("500");

  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [isReady, setIsReady] = useState(false);

  const [time, setTime] = useState(new Date());

  const {
    setDataSensorKameraOn,
    setDataSensorKameraOff,
    setDataSensorHomePage,
    setFetchDataError,
    setPercentageKameraOn,
    setpercentageKameraOff,
    setDataSensorGaugeNormal,
    setDataSensorGaugeAnomali,
    setPercentageGaugeNormal,
    setpercentageGaugeAnomali,
  } = useZustandStateHome((state) => state);

  const { windowSize, nodesView, setUPT,
    setLoading,
    setULTG,
    setUnit,
    setNodes,
    setNodesView,
    nodeSelected,
    dipilihULTG,
    setDipilihULTG,
    unitSelected,
    setUserProfile } = useZustandState((state) => state);

  useEffect(() => {
    if (windowSize.height < 650) {
      setResponsiveHeightScreen("650px");
      console.log("650px");
    } else {
      setResponsiveHeightScreen(`${windowSize.height}px`);
    }

    if (windowSize.width < 1260) {
      setResponsiveWidthScreen(`1260px`);
    } else {
      setResponsiveWidthScreen(`${windowSize.width}px`);
    }

    let x = windowSize.height - 180 - 100 - 30;
    setHeightDataBootom(x);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log("ready");
    }, 100);

    // Cleanup function untuk memastikan timer dihentikan jika komponen unmount sebelum selesai
    return () => clearTimeout(timer);
  }, []); // Dependency array kosong -> hanya dijalankan sekali saat mount

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

  return (
    <div
      style={{
        height: responsiveHeightScreen,
        width: responsiveWidthScreen,
        backgroundColor: "#223849",
      }}
      className={`flex fixed `}
    >
      <div className="flex h-full w-[60px]">
        <SideMenu />
      </div>

      <div className="flex flex-col flex-1 w-full h-full ml-[20px] mr-[10px]">
        <div className="flex bg-backgorundFirst  min-h-[100px] mt-[10px]  rounded-xl">
          <HeaderDashboard />
        </div>
        <div className="flex h-[calc(100vh-150px)] flex-col w-full rounded-xl border-primary border-[2px] mt-[20px] p-[10px] mb-[10px]">
          <div className="flex w-full h-[85px] bg-backgorundFirst rounded-xl p-[10px]">
            <DataTop nodes={nodesView} />
          </div>
          <div className="flex flex-1 w-full min-h-[200px] bg-backgorundFirst rounded-xl mt-[10px] p-[10px]">
            <DataBottom />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
