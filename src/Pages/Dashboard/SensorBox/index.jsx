import {} from "react";
import HeaderGraph from "./ChartView/HeaderChart";
import ChartView from "./ChartView";
import HeaderTable from "./RightTable/HeaderRightTable";
import TableTitle from "./RightTable/TableTitle";
import TableValue from "./RightTable/TableValue";
import { useZustandState } from "../../../store/state";

const data = [
  {
    key: "1",
    title: "Pitch",
    max: "90",
    min: "-90",
    avg: "90",
  },
  {
    key: "2",
    title: "Roll",
    max: "90",
    min: "-90",
    avg: "90",
  },
  {
    key: "3",
    title: "Dev Pitch",
    max: "90",
    min: "-90",
    avg: "90",
  },
  {
    key: "4",
    title: "Dev Roll",
    max: "90",
    min: "-90",
    avg: "90",
  },
  {
    key: "5",
    title: "Pitch Proj",
    max: "90",
    min: "-90",
    avg: "90",
  },
  {
    key: "6",
    title: "Roll Proj",
    max: "90",
    min: "-90",
    avg: "90",
  },
  {
    key: "10",
    title: "Pitch Thres",
    max: "90",
    min: "-90",
    avg: "90",
  },
];

const SensorBox = () => {
  const {
    isSensorSelect,
    dataSensorSelect,
    dataChartXY,
    heightChartBox,
    windowSize,
    constrainHeightScreen,
  } = useZustandState((state) => state);

  const defaultDataChartXY = [
    {
      xAxis: 0,
      value: 0,
    },
  ];

  return (
    <div className="w-full h-full bg-third rounded-xl border-secondary border-2 p-[5px] flex">
      <div className="flex flex-col w-[calc(75%)] h-full mr-[10px] rounded-xl bg-fourth p-[10px]">
        <div className="h-[35x]">
          <HeaderGraph
            title={
              isSensorSelect && dataSensorSelect.createOn != "-"
                ? `${dataSensorSelect.nameGateway} - ${dataSensorSelect.nameNode}`
                : "- None"
            }
            dateTime={
              isSensorSelect && dataSensorSelect.createOn != "-"
                ? dataSensorSelect.createOn
                : "-"
            }
          />
        </div>
        <div
          style={{
            height:
              windowSize.height < constrainHeightScreen
                ? "100%"
                : `${heightChartBox}`,
          }}
        >
          <ChartView data={isSensorSelect ? dataChartXY : defaultDataChartXY} />
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-fourth rounded-xl p-[10px]">
        <div className="h-[35x] w-full">
          <HeaderTable />
        </div>
        <div className="flex flex-col flex-1 min-h-[155px] w-full border-2 border-secondary bg-third rounded-2xl p-[10px] mt-[10px]">
          <TableTitle />
          <div className="overflow-y-auto w-full h-full place-content-between">
            {isSensorSelect && dataSensorSelect.createOn != "-" ? (
              data.map((item) => (
                <TableValue
                  title={item.title}
                  max={item.max}
                  min={item.min}
                  avg={item.avg}
                  key={item.key}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <p>None</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorBox;
