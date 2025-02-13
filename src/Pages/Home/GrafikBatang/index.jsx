import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Konversi data agar memiliki 2 bagian
const rawData = [
  { time: "10:00", value: 20 },
  { time: "10:05", value: 18 },
  { time: "10:10", value: 19 },
  { time: "10:15", value: 21 },
  { time: "10:20", value: 22 },
  { time: "10:25", value: 20 },
  { time: "10:30", value: 19 },
  { time: "10:35", value: 18 },
  { time: "10:40", value: 21 },
  { time: "10:45", value: 22 },
  { time: "10:50", value: 20 },
  { time: "10:55", value: 19 },
];

// Membagi value menjadi 2 bagian
const data = rawData.map((item) => ({
  time: item.time,
  value1: item.value * 0.7, // Bagian bawah
  value2: item.value * 0.3, // Bagian atas
}));

export default function GrafikBatang() {
  return (
    <div className="flex w-full h-full p-4 bg-[#314a60] rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: -40, bottom: -10 }}
        >
          <XAxis dataKey="time" tick={{ fill: "white" }} fontSize={"8px"} />
          <YAxis tick={{ fill: "white" }} fontSize={"8px"} />
          <Tooltip />
          <Bar dataKey="value1" stackId="a" fill="#00838F" />
          <Bar dataKey="value2" stackId="a" fill="#FF7043" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
