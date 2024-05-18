import { useState } from "react";
import Title from "./TableTitle";
import TableValue from "./TableValue";
import { useZustandState } from "../../../store/state";
// import axios from "axios";
import {
  convertToDataChart,
  fetchChartDataDay,
  fetchChartDataWeekly,
  fetchChartDataMonthly,
} from "../function";

const DeviceBox = () => {
  const {
    sensorBox,
    setViewport,
    setDataSensorSelect,
    setIsSensorSelect,
    timeFilter,
    setDataChartXY,
    setMinY_Axis,
    setMaxY_Axis,
    setDataChartAllSensor,
    clearSelectMenu,
    setTimeFilter,
  } = useZustandState((state) => state);
  const [isSelectDevice, setSelectDevice] = useState([]);

  //!========================= CLICK HANDLE ==================================
  const onClickHandle = async (value) => {
    setDataSensorSelect(value);
    setIsSensorSelect(true);
    setTimeFilter("Daily");

    //!==========================================================================
    //! set bg table, viewport, clear leftMenu
    let tempArray = [];
    for (let i = 0; i < sensorBox.length; i++) {
      tempArray.push(false);
    }
    let long = 0.0;
    let lat = 0.0;

    long = parseFloat(value.long);
    lat = parseFloat(value.lat);

    const updateMap = {
      longitude: long + 0.015111111, //kanan kiri
      latitude: lat - 0.010111111, //atas bawah
      zoom: 14,
    };
    setViewport(updateMap);
    tempArray[value.key] = true;
    setSelectDevice(tempArray);
    clearSelectMenu();

    console.log("data device");
    console.log(value);
    //!==========================================================================

    //!==========================================================================
    //! set to convert data chart day, weekly, monthly
    console.log(`timeFilter => ${timeFilter}`);
    // if (value.createOn != "-") {
    if (timeFilter === "Daily") {
      const day = await fetchChartDataDay(value.idGateway, value.idNode);
      setDataChartAllSensor(day);
      const d = convertToDataChart(day.timeOn, day.pitch);
      setDataChartXY(d[0]);
      setMaxY_Axis(d[1]);
      setMinY_Axis(d[2]);

      // console.log(day);
      // console.log(`hasil convert`);
      // console.log(d);
    } else if (timeFilter === "Weekly") {
      const weekly = await fetchChartDataWeekly(value.idGateway, value.idNode);
      setDataChartAllSensor(weekly);
      const d = convertToDataChart(weekly.timeOn, weekly.pitch);
      setDataChartXY(d[0]);
      setMaxY_Axis(d[1]);
      setMinY_Axis(d[2]);
    } else if (timeFilter === "Monthly") {
      const monthly = await fetchChartDataMonthly(
        value.idGateway,
        value.idNode
      );
      setDataChartAllSensor(monthly);
      const d = convertToDataChart(monthly.timeOn, monthly.pitch);
      setDataChartXY(d[0]);
      setMaxY_Axis(d[1]);
      setMinY_Axis(d[2]);
    } else {
      // const other = await fetchChartDataDay(3, 1);
      // setDataChartSelect(other);
    }
    // }
    //!==========================================================================
  };
  //!============================================================================

  return (
    <div className="w-full h-full bg-third rounded-xl border-secondary border-2 p-[10px] flex flex-col">
      <Title />
      <div className="overflow-y-auto w-full h-full">
        {sensorBox.length > 0 &&
          sensorBox.map((data) => (
            <div
              key={data.key}
              onClick={() => onClickHandle(data)}
              className="cursor-pointer"
            >
              <TableValue
                id={data.nameGateway}
                name={data.nameNode}
                p={data.p}
                r={data.r}
                t={data.t}
                rh={data.rh}
                a={data.a}
                v={data.v}
                bgColor={isSelectDevice[data.key] && "bg-secondary"}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeviceBox;
