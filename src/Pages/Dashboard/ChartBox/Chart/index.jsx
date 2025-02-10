import {} from "react";
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
  const { sensorClicked, minY_Axis, maxY_Axis } = useZustandState(
    (state) => state
  );

  // eslint-disable-next-line react/prop-types
  const CustomTooltip = ({ active, payload }) => {
    // eslint-disable-next-line react/prop-types
    if (active && payload && payload.length) {
      // eslint-disable-next-line react/prop-types
      const dataItem = payload[0].payload; // Assuming single data item in tooltip
      return (
        <div className="custom-tooltip text-white text-[12px] rounded bg-[#6ab782] p-[5px]">
          {/* eslint-disable-next-line react/prop-types */}
          <p>{`value: ${dataItem.value}`}</p>
          {/* eslint-disable-next-line react/prop-types */}
          <p>{`time: ${dataItem.xAxis}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex py-[2px] w-full h-full">
      {sensorClicked.node_id != "err" ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
            <Brush dataKey="xAxis" height={10} stroke="white" fill="dddddd" />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full text-gray-500 flex items-center justify-center">
          <p>None</p>
        </div>
      )}
    </div>
  );
};

export default ChartView;
