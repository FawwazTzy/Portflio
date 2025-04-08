import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import ChartView from "./Chart";
import { useZustandState } from "../../../store/state";
import { fetchChartNode } from "../../../Utils/api";
import { convertToDataChart } from "../function";

const ChartBox = () => {
  const {
    isChartReady,
    dataChartXY,
    nodeSelected,
    setDataChartXY,
    setMaxY_Axis,
    setMinY_Axis,
    setIsChartReady,
    setFilterName,
    filterName
  } = useZustandState((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  // const [filterName, setFilterName] = useState("Daily");
  // const [typeChart, setTypeChart] = useState("Daily");

  const defaultDataChartXY = [
    {
      xAxis: 0,
      value: 0,
    },
  ];

  const dropdownData = [
    { id: 1, label: "Daily" },
    { id: 2, label: "Weekly" },
    { id: 3, label: "Monthly" },
  ];

  const dropdownRefFilterChart = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefFilterChart.current &&
        !dropdownRefFilterChart.current.contains(event.target)
      ) {
        setIsOpen(false); // Tutup dropdown
      }
    };

    // Tambahkan event listener untuk klik dan klik kanan
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);

    return () => {
      // Bersihkan event listener saat komponen unmount
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [setIsOpen]);

  const onClickHandleChartFilter = async (item) => {
    setIsOpen(!isOpen)
    setFilterName(item.label)
    let typeFilter = "daily";
    if (item.label === dropdownData[0].label) {
      typeFilter = "daily";
    } else if (item.label === dropdownData[1].label) {
      typeFilter = "weekly";
    } else if (item.label === dropdownData[2].label) {
      typeFilter = "monthly";
    } else {
      typeFilter = "other";
    }

    let start = "2025-04-03"; //2025-04-03
    let end = "2025-04-03"; //2025-04-03

    console.log("NodeName ", nodeSelected.nodeName)
    console.log("type ", typeFilter)
    console.log("start ", start)
    console.log("end ", end)

    //! get data chart
    const res = await fetchChartNode(nodeSelected.nodeName, typeFilter, start, end)
    const dataJson = res.data.message;
    console.log("Chart Res ", dataJson)
    if (dataJson.length > 0) {
      const pressure = dataJson[0].pressures
      const dateTime = dataJson[0].dateTime
      console.log("pressure ", pressure)
      console.log("dateTime ", dateTime)
      const d = await convertToDataChart(
        dateTime,
        pressure
      );
      console.log("DataChartXY ", d[0])
      setDataChartXY(d[0]);
      setMaxY_Axis(d[1]);
      setMinY_Axis(d[2]);
      setIsChartReady(true)
    } else {
      setIsChartReady(false)
    }

  }


  return (
    <div className="flex flex-col w-full h-full px-[20px] py-[5px]">
      <div className="flex w-full h-[35px]  items-center justify-start">
        <p className="text-textColor text-[16px]">Node Data</p>
        <div className="relative w-[120px] h-[20px] ml-[20px]" ref={dropdownRefFilterChart}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center bg-textColor text-black h-full rounded-md shadow-md 0"
          >
            <span className="px-4 py-[8px] text-[14px]">{filterName}</span>
            {isOpen ? (
              <div className="bg-dropDownArrow h-[20px] w-[20px] justify-center items-center flex rounded-md">
                <ChevronUp size={20} className="text-textColor" />
              </div>
            ) : (
              <div className="bg-dropDownArrow h-[20px] w-[20px] justify-center items-center flex rounded-md">
                <ChevronDown size={20} className="text-textColor" />
              </div>
            )}
          </button>
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-full z-50 w-full bg-textColor border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            {dropdownData.map((item) => (
              <li
                key={item.id}
                className="px-4 py-[8px] hover:bg-gray-100 cursor-pointer text-[14px]"
                onClick={() => onClickHandleChartFilter(item)}
              >
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
      <div className="flex w-full h-full">
        <ChartView
          data={
            isChartReady
              ? dataChartXY //dataChartXY
              : defaultDataChartXY
          }
        />
      </div>
    </div>
  );
};

export default ChartBox;
