import {} from "react";
import { useZustandState } from "../../../../../store/state";
import { convertToDataChart } from "../../../function";

const SideMenu = () => {
  const {
    isSelectMenu,
    setSelectMenu,
    dataChartAllSensor,
    setDataChartXY,
    setMaxY_Axis,
    setMinY_Axis,
    windowSize,
    constrainHeightScreen,
  } = useZustandState((state) => state);
  const menu = [
    {
      key: "1",
      title: "Pitch",
    },
    {
      key: "2",
      title: "Roll",
    },
    {
      key: "3",
      title: "Temp",
    },
    {
      key: "4",
      title: "Volt",
    },
    {
      key: "5",
      title: "Pitch proj",
    },
    {
      key: "6",
      title: "Roll proj",
    },
  ];

  const onClickHandle = (value) => {
    let tempArray = [false, false, false, false, false, false];
    menu.map((item, index) => {
      if (item.key === value) {
        tempArray[index] = true;
      }
      setSelectMenu(tempArray);
    });
    // filter data
    // console.log("value");
    // console.log(value);
    console.log("dataChartAllSensor");
    console.log(dataChartAllSensor.timeOn.length);
    if (value == 1) {
      //! pitch
      const d = convertToDataChart(
        dataChartAllSensor.timeOn,
        dataChartAllSensor.pitch
      );
      // console.log(d);
      setDataChartXY(d[0]);
      setMaxY_Axis(d[1]);
      setMinY_Axis(d[2]);
    } else if (value == 2) {
      //! roll
      const d = convertToDataChart(
        dataChartAllSensor.timeOn,
        dataChartAllSensor.roll
      );
      // console.log(d);
      setDataChartXY(d[0]);
      setMaxY_Axis(d[1]);
      setMinY_Axis(d[2]);
    } else if (value == 3) {
      //! temp
      const d = convertToDataChart(
        dataChartAllSensor.timeOn,
        dataChartAllSensor.temp
      );
      // console.log(d);
      setDataChartXY(d[0]);
      setMaxY_Axis(d[1]);
      setMinY_Axis(d[2]);
    } else if (value == 4) {
      //! volt
      const d = convertToDataChart(
        dataChartAllSensor.timeOn,
        dataChartAllSensor.voltage
      );
      // console.log(d);
      setDataChartXY(d[0]);
      setMaxY_Axis(d[1]);
      setMinY_Axis(d[2]);
    } else if (value == 5) {
      //! pitch proj
      const d = [
        {
          xAxis: 0,
          value: 0,
        },
      ];
      setDataChartXY(d);
      setMaxY_Axis(10);
      setMinY_Axis(0);
    } else if (value == 6) {
      //! roll proj
      const d = [
        {
          xAxis: 0,
          value: 0,
        },
      ];
      setDataChartXY(d);
      setMaxY_Axis(10);
      setMinY_Axis(0);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {menu.map((item) => (
        <button
          key={item.key}
          className={` my-[0px] w-[100px] rounded text-[10px] 
          ${
            windowSize.height < constrainHeightScreen
              ? "h-[25px]"
              : windowSize.height > 750 && windowSize.height <= 850
              ? "h-[25px]"
              : windowSize.height > 850 && windowSize.height <= 1000
              ? "h-[30px]"
              : windowSize.height > 1000
              ? "h-[40px]"
              : "h-[20px]"
          } text-white ${
            isSelectMenu[item.key - 1] ? "bg-secondary" : "bg-[#686871]"
          }`}
          onClick={() => onClickHandle(item.key)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
