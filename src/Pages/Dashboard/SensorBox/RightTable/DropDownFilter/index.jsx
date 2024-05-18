import { useState } from "react";
import { useZustandState } from "../../../../../store/state";
import {
  convertToDataChart,
  fetchChartDataDay,
  fetchChartDataWeekly,
  fetchChartDataMonthly,
} from "../../../function";

const DropDownFilter = () => {
  const {
    timeFilter,
    setTimeFilter,
    isSensorSelect,
    dataSensorSelect,
    setDataChartAllSensor,
    setDataChartXY,
    setMaxY_Axis,
    setMinY_Axis,
  } = useZustandState((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const dropDownValue = [
    {
      key: "1",
      title: "Daily",
    },
    {
      key: "2",
      title: "Weekly",
    },
    {
      key: "3",
      title: "Monthly",
    },
    {
      key: "4",
      title: "Other",
    },
  ];

  const onClickHandle = async (value) => {
    setTimeFilter(value);
    setIsOpen(false);
    console.log("value");
    console.log(value);
    if (isSensorSelect) {
      const idGateway = dataSensorSelect.idGateway;
      const idNode = dataSensorSelect.idNode;
      if (value === "Daily") {
        const day = await fetchChartDataDay(idGateway, idNode);
        setDataChartAllSensor(day);
        const d = convertToDataChart(day.timeOn, day.pitch);
        setDataChartXY(d[0]);
        setMaxY_Axis(d[1]);
        setMinY_Axis(d[2]);
      } else if (value === "Weekly") {
        const weekly = await fetchChartDataWeekly(idGateway, idNode);
        setDataChartAllSensor(weekly);
        const d = convertToDataChart(weekly.timeOn, weekly.pitch);
        setDataChartXY(d[0]);
        setMaxY_Axis(d[1]);
        setMinY_Axis(d[2]);
      } else if (value === "Monthly") {
        const monthly = await fetchChartDataMonthly(idGateway, idNode);
        setDataChartAllSensor(monthly);
        const d = convertToDataChart(monthly.timeOn, monthly.pitch);
        setDataChartXY(d[0]);
        setMaxY_Axis(d[1]);
        setMinY_Axis(d[2]);
      } else {
        // const other = await fetchChartDataDay(3, 1);
        // setDataChartSelect(other);
      }
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="w-[100px] h-[30px] items-center justify-between inline-flex rounded bg-secondary px-3 py-2  "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-xs  text-white">{timeFilter}</p>
          <svg
            className="-mr-1 h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute space-x-2 right-0 z-10 mt-2 w-[100px] origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="">
            {dropDownValue.map((data) => (
              <button
                key={data.key}
                className="flex pl-[10px] h-[30px] items-center text-white text-xs w-[100px] border-b-2 border-secondary"
                onClick={() => onClickHandle(data.title)}
              >
                {data.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownFilter;
