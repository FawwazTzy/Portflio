import { useEffect, useState } from "react";
import { useZustandState } from "../../store/state";
import { useZustandStateHome } from "../../store/stateHome";

import SideMenu from "../Dashboard/SideMenu";
import HeaderDashboard from "../Dashboard/Header";
import DataTOP from "./DataTOP";
import DataBottom from "./DataBottom";
import TableRight from "./TableRight";
import { fetchNodesData } from "./function";
import { div } from "framer-motion/client";

const Home = () => {
  const [responsiveHeightScreen, setResponsiveHeightScreen] = useState("100%");
  const [responsiveWidthScreen, setResponsiveWidthScreen] = useState("100%");
  const [heightDataBootom, setHeightDataBootom] = useState("500");

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
    const result = await fetchNodesData();
    //! jika fetch data error
    if (result[0].node_id === -1) {
      setFetchDataError(true);
      //! jika fetch data berhasil
    } else {
      setFetchDataError(false);
      setDataSensorHomePage(result[0]);
      setDataSensorKameraOn(result[1]);
      setDataSensorKameraOff(result[2]);
      setDataSensorGaugeNormal(result[3]);
      setDataSensorGaugeAnomali(result[4]);
      // const tempPercentageKameraOn =
      //   (result[1].length / result[0].length) * 100;
      // const tempPercentageKameraOff =
      //   (result[2].length / result[0].length) * 100;
      // const tempPercentageGaugeNormal =
      //   (result[3].length / result[0].length) * 100;
      // const tempPercentageGaugeAnomali =
      //   (result[4].length / result[0].length) * 100;
      const tempPercentageKameraOn = 10;
      const tempPercentageKameraOff = 10;
      const tempPercentageGaugeNormal = 10;
      const tempPercentageGaugeAnomali = 10;
      setPercentageKameraOn(tempPercentageKameraOn);
      setpercentageKameraOff(tempPercentageKameraOff);
      setPercentageGaugeNormal(tempPercentageGaugeNormal);
      setpercentageGaugeAnomali(tempPercentageGaugeAnomali);
    }

    console.log(result);
  }

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

  return (
    <div>
      {isReady && (<div
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

        <div className="flex flex-col flex-1 w-full h-full ml-[20px] mr-[10px]">
          <div className="flex bg-backgorundFirst  min-h-[100px] mt-[10px]  rounded-xl">
            <HeaderDashboard />
          </div>
          <div className="flex flex-1 w-full h-full">
            <div
              // style={{ height: `${responsiveHeightScreen}` }}
              className="flex flex-1 flex-col w-full h-full mt-[20px]" //h-[calc(100%-100px-10px-10px)  mr-[10px] mb-[10px]
            >
              <div className="flex w-full h-[160px]  rounded-xl border-primary border-[2px] p-[10px]">
                <DataTOP />
              </div>
              <div
                style={{
                  height:
                    responsiveHeightScreen == "650px"
                      ? "650px"
                      : `${heightDataBootom}px`,
                }}
                className="flex w-full rounded-xl border-primary border-[2px] p-[10px] mt-[10px] mb-[10px]"
              >
                <DataBottom />
              </div>
            </div>
            <div
              style={{
                height:
                  responsiveHeightScreen == "650px"
                    ? "650px"
                    : `${heightDataBootom + 160 + 10}px`,
              }}
              className="flex w-[400px] rounded-xl border-primary border-[2px] ml-[10px] mt-[20px]"
            >
              <TableRight />
            </div>
          </div>
        </div>
      </div>)}
    </div>

  );
};

export default Home;
