import {} from "react";
import SideMenu from "./SideMenu";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { useZustandState } from "../../../../store/state";

// eslint-disable-next-line react/prop-types
const ChartView = ({ data }) => {
  const { isSensorSelect, minY_Axis, maxY_Axis } = useZustandState(
    (state) => state
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload; // Assuming single data item in tooltip
      return (
        <div className="custom-tooltip text-white text-[12px] rounded bg-[#6ab782] p-[5px]">
          <p>{`value: ${dataItem.value}`}</p>
          <p>{`time: ${dataItem.xAxis}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex my-[10px] w-full h-full">
      <div className="w-[120px]  ">
        <SideMenu />
      </div>
      <div className="flex-1  py-[5px]">
        <div className="w-full h-full">
          {isSensorSelect ? (
            <ResponsiveContainer>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444d5a" />
                <XAxis dataKey="xAxis" tick={{ fontSize: 10, fill: "white" }} />
                <YAxis
                  tick={{ fontSize: 10, fill: "white" }}
                  domain={[minY_Axis, maxY_Axis]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#70ccff"
                  strokeWidth="2"
                  fillOpacity="30%"
                  fill="#70ccff"
                />
                <Brush
                  dataKey="xAxis"
                  height={10}
                  stroke="white"
                  fill="dddddd"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full text-gray-500 flex items-center justify-center">
              <p>None</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartView;
