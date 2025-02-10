import axios from "axios";

export async function fetchNodesData() {
  try {
    console.log(
      "fetch nodes data https://fairuz90.pythonanywhere.com/vision/devices/"
    );
    const res = await axios.get(`/api/vision/devices/`);
    const data = await res.data;
    const tranformData = processData(data);

    return tranformData;
  } catch (error) {
    console.log("response error");
    return [
      {
        node_id: -1,
        GPS_Koordinat: [-7.824328708769684, 115.58724216408724],
        Pressure: [],
        Date_time: [],
        Status_cam: [],
        Status_gauge: [],
        File_image: [],
        isClicked: false,
      },
    ];
  }
}

const processData = (data) => {
  return data.map((node) => {
    // Konversi GPS_Koordinat dari string ke array
    const GPS_Koordinat = JSON.parse(node.GPS_Koordinat);

    // Extrak data dari realtimes_data
    const Pressure = node.realtimes_data.map((item) => item.Pressure);
    const Date_time = node.realtimes_data.map((item) => item.Date_time);
    const Status_cam = node.realtimes_data.map((item) => item.Status_cam);
    const Status_gauge = node.realtimes_data.map((item) => item.Status_gauge);
    const File_image = node.realtimes_data.map((item) => item.File_image);
    const isClicked = false; // Tambahan flag default

    return {
      node_id: node.node_id,
      GPS_Koordinat,
      Pressure,
      Date_time,
      Status_cam,
      Status_gauge,
      File_image,
      isClicked,
    };
  });
};

export function updateMap(device) {
  //! update position map dan zoom
  let lat = parseFloat(device.GPS_Koordinat[0]);
  let long = parseFloat(device.GPS_Koordinat[1]);

  return {
    longitude: long + 0.000211111, //kanan kiri
    latitude: lat - 0.000211111, //atas bawah
    zoom: 19,
  };
}

export function convertToDataChart(x, y) {
  // console.log("day.timeOn");
  // console.log(x.length);
  // let min = 0;
  // let max = 10;
  // let tempData = [];

  // if (x.length > 0) {
  //   const tempMax = y.reduce((a, b) => Math.max(a, b));
  //   const tempMin = y.reduce((a, b) => Math.min(a, b));
  //   max = Math.ceil(tempMax) + 2;
  //   min = 0;
  //   min = Math.ceil(tempMin) - 2;

  //   x.map((item, index) => {
  //     const t = {
  //       xAxis: `${item}`,
  //       value: y[index],
  //     };
  //     tempData.push(t);
  //   });

  //   return [tempData, max, min];
  // }

  // return [tempData, max, min];

  console.log(`x ${x}`);
  console.log(`y ${y}`);
  if (x.length > 0) {
    const dataChart = x.map((item, index) => ({
      xAxis: item,
      value: y[index],
    }));

    const max = Math.max(...y);
    const min = Math.min(...y);

    console.log(`dataChart => ${dataChart}`);
    console.log(`max => ${max}`);
    console.log(`min => ${min}`);

    return [dataChart, max + 2, min - 2];
  }
}

//!====================================================================
