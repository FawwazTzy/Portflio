import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// eslint-disable-next-line react/prop-types
const CircleChart = ({ COLORS, data }) => {
  //   const COLORS = ["#6be5e8", "#30356d", "#2e5f99", "#2c8bb9", "#41b8d6"];
  return (
    <div className="w-full h-full">
      {" "}
      {/* Sesuaikan tinggi sesuai kebutuhan */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart className="outline-none">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="100%"
            dataKey="value"
            startAngle={90} // Mulai dari atas (jam 12:00)
            endAngle={-270} // Putar searah jarum jam
            stroke="rgba(0,0,0,0)" // Buat border transparan
          >
            {(data || []).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % (COLORS || []).length]}
                // stroke="#000000" // Ganti warna border
                stroke="rgba(0,0,0,0)" // Buat border transparan
                strokeWidth={0} // Atur ketebalan border
                style={{ pointerEvents: "none" }} // Menonaktifkan event pada Cell
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CircleChart;
