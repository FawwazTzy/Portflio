import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import ChartView from "./Chart";
import { useZustandState } from "../../../store/state";

const ChartBox = () => {
  const { sensorClicked, dataChartXY } = useZustandState((state) => state);
  const [isOpen, setIsOpen] = useState(false);

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
  return (
    <div className="flex flex-col w-full h-full px-[20px] py-[5px]">
      <div className="flex w-full h-[35px]  items-center justify-start">
        <p className="text-white text-[16px]">Node Data</p>
        <div className="relative w-[120px] h-[20px] ml-[20px]">
          {" "}
          {/* Tambahkan relative */}
          {/* <div className="w-64"> */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center bg-white text-black h-full rounded-md shadow-md 0"
          >
            <span className="px-4 py-[8px]">Daily</span>
            {isOpen ? (
              <div className="bg-[#a6a7a8] h-[20px] w-[20px] justify-center items-center flex rounded-md">
                <ChevronUp size={20} className="text-white" />
              </div>
            ) : (
              <div className="bg-[#a6a7a8] h-[20px] w-[20px] justify-center items-center flex rounded-md">
                <ChevronDown size={20} className="text-white" />
              </div>
            )}
          </button>
          {/* Dropdown dengan posisi absolute & z-index tinggi */}
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-full z-50 w-full bg-white border border-gray-200 rounded-sm shadow-md overflow-hidden"
          >
            {dropdownData.map((item) => (
              <li
                key={item.id}
                className="px-4 py-[8px] hover:bg-gray-100 cursor-pointer"
              >
                {item.label}
              </li>
            ))}
          </motion.ul>
          {/* </div> */}
        </div>
      </div>
      <div className="flex w-full h-full">
        <ChartView
          data={
            sensorClicked.node_id != "err"
              ? dataChartXY //dataChartXY
              : defaultDataChartXY
          }
        />
      </div>
    </div>
  );
};

export default ChartBox;
