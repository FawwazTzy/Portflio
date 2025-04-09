import { fetchGetUnit } from "../../Utils/api";

export function updateMap(device) {
  //! update position map dan zoom
  let lat = parseFloat(device.gps_lat);
  let long = parseFloat(device.gps_long);

  return {
    longitude: long + 0.000211111, //kanan kiri
    latitude: lat - 0.000211111, //atas bawah
    zoom: 19,
  };
}

export async function convertToDataChart(x, y) {
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

export async function getUnitFromServer() {
  try {
    const res = await fetchGetUnit();
    const data = await res.data;
    return data;
  } catch (error) {
    return false;
  }
}

