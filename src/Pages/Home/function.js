import axios from "axios";

export async function fetchNodesData() {
  try {
    console.log(
      "fetch nodes data https://fairuz90.pythonanywhere.com/vision/devices/"
    );
    const res = await axios.get(`/api/vision/devices/`);
    const data = await res.data;
    const tranformData = processData(data);

    const kameraOnFiltered = tranformData.filter(
      (item) => item.LastStatus_cam === "on"
    );
    const kameraOffFiltered = tranformData.filter(
      (item) => item.LastStatus_cam === "off"
    );

    const gaudeNormalFiltered = tranformData.filter(
      (item) => item.LastStatus_gauge === "aman"
    );
    const gaugeAnomaliFiltered = tranformData.filter(
      (item) => item.LastStatus_gauge != "aman"
    );

    return [
      tranformData,
      kameraOnFiltered,
      kameraOffFiltered,
      gaudeNormalFiltered,
      gaugeAnomaliFiltered,
    ];
  } catch (error) {
    console.log("response error");
    return [
      [
        {
          node_id: -1,
          Merk: "none",
          type: "none",
          zona_instalasi: "none",
          isolasi: "none",
          LastPressure: "none",
          LastStatus_cam: "none",
          LastStatus_gauge: "none",
        },
      ],
      [
        {
          node_id: -1,
          Merk: "none",
          type: "none",
          zona_instalasi: "none",
          isolasi: "none",
          LastPressure: "none",
          LastStatus_cam: "none",
          LastStatus_gauge: "none",
        },
      ],
      [
        {
          node_id: -1,
          Merk: "none",
          type: "none",
          zona_instalasi: "none",
          isolasi: "none",
          LastPressure: "none",
          LastStatus_cam: "none",
          LastStatus_gauge: "none",
        },
      ],
    ];
  }
}

const processData = (data) => {
  return data.map((node) => {
    const lastData = node.realtimes_data[node.realtimes_data.length - 1]; // Ambil data terakhir berdasarkan index
    return {
      node_id: node.node_id,
      Merk: node.Merk,
      type: node.type,
      zona_instalasi: node.zona_instalasi,
      isolasi: node.isolasi,
      LastPressure: lastData.Pressure,
      LastStatus_cam: lastData.Status_cam,
      LastStatus_gauge: lastData.Status_gauge,
    };
  });
};

export function formatNumber(x) {
  return x.toString().padStart(3, "0");
}
