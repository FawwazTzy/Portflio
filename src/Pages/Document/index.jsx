import { useState, useEffect } from "react";
import { useZustandState } from "../../store/state";
import { useZustandStateHome } from "../../store/stateHome";

import SideMenu from "../Dashboard/SideMenu";
import HeaderDashboard from "../Dashboard/Header";
import DataTop from "./DataTop";
import DataBottom from "./DataBottom";

// import { fetchNodesData } from "./function";

const Document = () => {
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

  const { windowSize } = useZustandState((state) => state);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log("ready");
    }, 100);

    // Cleanup function untuk memastikan timer dihentikan jika komponen unmount sebelum selesai
    return () => clearTimeout(timer);
  }, []); // Dependency array kosong -> hanya dijalankan sekali saat mount

  async function getGataNode() {
    //! fetch data Nodes
    // const result = await fetchNodesData();
    //! jika fetch data error
    // if (result[0].node_id === -1) {
    //   setFetchDataError(true);
    //   //! jika fetch data berhasil
    // } else {
    //   setFetchDataError(false);
    //   setDataSensorHomePage(result[0]);
    //   setDataSensorKameraOn(result[1]);
    //   setDataSensorKameraOff(result[2]);
    //   setDataSensorGaugeNormal(result[3]);
    //   setDataSensorGaugeAnomali(result[4]);
    //   const tempPercentageKameraOn =
    //     (result[1].length / result[0].length) * 100;
    //   const tempPercentageKameraOff =
    //     (result[2].length / result[0].length) * 100;
    //   const tempPercentageGaugeNormal =
    //     (result[3].length / result[0].length) * 100;
    //   const tempPercentageGaugeAnomali =
    //     (result[4].length / result[0].length) * 100;
    //   setPercentageKameraOn(tempPercentageKameraOn);
    //   setpercentageKameraOff(tempPercentageKameraOff);
    //   setPercentageGaugeNormal(tempPercentageGaugeNormal);
    //   setpercentageGaugeAnomali(tempPercentageGaugeAnomali);
    // }
    // console.log(result);
  }

  useEffect(() => {
    try {
      //   getGataNode();

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

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setIsReady(true);
  //     }, 200);

  //     return () => clearTimeout(timer); // Membersihkan timeout saat unmount
  //   }, []);

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
            <DataTop />
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
