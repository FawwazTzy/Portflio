import axios from "axios";
// Function to convert a sensor reading to the desired format
// menyelesaikan permasalah data sama pada saat dimasukan ke array
function convertToDataSensor(d, key, nameGateway, nameNode, createOn) {
  return {
    key: key,
    idGateway: d.idGateway,
    idNode: d.idNode,
    nameGateway: nameGateway,
    nameNode: nameNode,
    p: d.pitch,
    r: d.roll,
    t: d.suhu,
    rh: d.kelembapan,
    a: d.arus,
    v: d.tegangan,
    lat: d.lat,
    long: d.long,
    createOn: createOn,
  };
}

export async function processDataToSensorBoxData(devices, sensorRealtime) {
  let tempData = [];
  devices.map((sensor, index) => {
    // console.log(`${sensor.idGateway} - ${sensor.idNode}`);
    const idGatewayIdNode = (d) =>
      sensor.idGateway === d.idGateway && sensor.idNode === d.idNode;
    const sensorRealtimeFilter = sensorRealtime.filter(idGatewayIdNode);
    if (sensorRealtimeFilter.length > 0) {
      const formattedString = formatDateString(
        sensorRealtimeFilter[0].createOn
      );
      const t = convertToDataSensor(
        sensorRealtimeFilter[0],
        index,
        sensor.nameGateway,
        sensor.nameNode,
        formattedString
      );
      tempData.push(t);
      //   console.log(sensorRealtimeFilter);
    } else {
      const dataNull = {
        key: "asdasdaseaea",
        idGateway: "-",
        idNode: "-",
        nameGateway: "-",
        nameNode: "-",
        p: "-",
        r: "-",
        t: "-",
        rh: "-",
        a: "-",
        v: "-",
        lat: "-7.04980",
        long: "106.88893",
        createOn: "-",
      };
      dataNull.key = index;
      dataNull.idGateway = sensor.idGateway;
      dataNull.idNode = sensor.idNode;
      dataNull.nameGateway = sensor.nameGateway;
      dataNull.nameNode = sensor.nameNode;
      dataNull.lat = sensor.lat;
      dataNull.long = sensor.long;
      tempData.push(dataNull);
    }
  });
  return tempData;
}

function convertToDataDevices(d) {
  return {
    _id: d._id,
    idGateway: d.idGateway,
    idNode: d.idNode,
    nameGateway: d.nameGateway,
    nameNode: d.nameNode,
    lat: d.lat,
    long: d.long,
    offsetRoll: d.offsetRoll,
    offsetPich: d.offsetPich,
    fileImage: d.fileImage,
    isClicked: false,
  };
}

export function findIndexById(data, id) {
  return data.findIndex((item) => item._id === id);
}

export async function processDataDevices(devices) {
  let tempData = [];
  devices.map((d) => {
    const temp = convertToDataDevices(d);
    tempData.push(temp);
  });
  return tempData;
}

function formatDateString(isoString) {
  const temp = isoString.split("T");
  const tempDate = temp[0].split("-");
  const tempTime = temp[1].split(":");
  const tempTimeSecond = tempTime[2].split(".");
  const second = tempTimeSecond[0];
  const minunte = tempTime[1];
  const hour = tempTime[0];

  return `${tempDate[2]}/${tempDate[1]}/${tempDate[0]} - ${hour}:${minunte}:${second}`;
}

export function convertToDataChart(x, y) {
  console.log("day.timeOn");
  console.log(x.length);
  let min = 0;
  let max = 10;
  let tempData = [];

  if (x.length > 0) {
    const tempMax = y.reduce((a, b) => Math.max(a, b));
    const tempMin = y.reduce((a, b) => Math.min(a, b));
    max = Math.ceil(tempMax) + 2;
    min = 0;
    min = Math.ceil(tempMin) - 2;

    x.map((item, index) => {
      const t = {
        xAxis: `${item}`,
        value: y[index],
      };
      tempData.push(t);
    });

    return [tempData, max, min];
  }

  return [tempData, max, min];
}

export async function fetchChartDataDay(idGateway, idNode) {
  try {
    console.log("chart day");
    const res = await axios.get(
      `http://venom-uitjbb.id/api/v2/get/day?idGateway=${idGateway}&idNode=${idNode}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("request error");
    return {
      idGateway: "error",
      idNode: "error",
      roll: [],
      pitch: [],
      temp: [],
      rh: [],
      voltage: [],
      current: [],
      lat: [],
      long: [],
      dateOn: [],
      timeOn: [],
    };
  }
}

export async function fetchChartDataWeekly(idGateway, idNode) {
  try {
    console.log("chart weekly");
    const res = await axios.get(
      `http://venom-uitjbb.id/api/v2/get/weekly?idGateway=${idGateway}&idNode=${idNode}`
    );
    return res.data;
  } catch (error) {
    console.log("request error");
    return {
      idGateway: "error",
      idNode: "error",
      roll: [],
      pitch: [],
      temp: [],
      rh: [],
      voltage: [],
      current: [],
      lat: [],
      long: [],
      dateOn: [],
      timeOn: [],
    };
  }
}

export async function fetchChartDataMonthly(idGateway, idNode) {
  try {
    console.log("chart monthly");
    const res = await axios.get(
      `http://venom-uitjbb.id/api/v2/get/monthly?idGateway=${idGateway}&idNode=${idNode}`
    );
    return res.data;
  } catch (error) {
    console.log("request error");
    return {
      idGateway: "error",
      idNode: "error",
      roll: [],
      pitch: [],
      temp: [],
      rh: [],
      voltage: [],
      current: [],
      lat: [],
      long: [],
      dateOn: [],
      timeOn: [],
    };
  }
}

export async function fetchChartDataOther(
  idGateway,
  idNode,
  startDate,
  endDate
) {
  try {
    console.log("chart Other");
    const res = await axios.get(
      `http://venom-uitjbb.id/api/v2/get/other?idGateway=${idGateway}&idNode=${idNode}&start=${startDate}&end=${endDate}`
    );
    return res.data;
  } catch (error) {
    console.log("request error");
    return {
      idGateway: "error",
      idNode: "error",
      roll: [],
      pitch: [],
      temp: [],
      rh: [],
      voltage: [],
      current: [],
      lat: [],
      long: [],
      dateOn: [],
      timeOn: [],
    };
  }
}

export async function downloadDaily(idGateway, idNode) {
  try {
    console.log(`download daily G ${idGateway} N ${idNode}`);
    // eslint-disable-next-line no-unused-vars
    const response = await axios.get(
      `http://venom-uitjbb.id/api/v2/download/daily?idGateway=${idGateway}&idNode=${idNode}`,
      {
        responseType: "blob", // Important to handle binary data
      }
    );

    //! get filename from response headers
    //! Extracting filename from response headers
    const contentDisposition = response.headers["Content-Disposition"];
    let fileName = "download-daily.xlsx"; // Default filename
    // console.log("contentDisposition");
    // console.log(response.headers);
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Replace with the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.log("request error");
    return false;
  }
}

export async function downloadWeekly(idGateway, idNode) {
  try {
    console.log(`download weekly G ${idGateway} N ${idNode}`);
    // eslint-disable-next-line no-unused-vars
    const response = await axios.get(
      `http://venom-uitjbb.id/api/v2/download/weekly?idGateway=${idGateway}&idNode=${idNode}`,
      {
        responseType: "blob", // Important to handle binary data
      }
    );

    //! get filename from response headers
    //! Extracting filename from response headers
    const contentDisposition = response.headers["Content-Disposition"];
    let fileName = "download-weekly.xlsx"; // Default filename
    // console.log("contentDisposition");
    // console.log(response.headers);
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Replace with the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.log("request error");
    return false;
  }
}

export async function downloadMonthly(idGateway, idNode) {
  try {
    console.log(`download monthly G ${idGateway} N ${idNode}`);
    // eslint-disable-next-line no-unused-vars
    const response = await axios.get(
      `http://venom-uitjbb.id/api/v2/download/monthly?idGateway=${idGateway}&idNode=${idNode}`,
      {
        responseType: "blob", // Important to handle binary data
      }
    );

    //! get filename from response headers
    //! Extracting filename from response headers
    const contentDisposition = response.headers["Content-Disposition"];
    let fileName = "download-monthly.xlsx"; // Default filename
    // console.log("contentDisposition");
    // console.log(response.headers);
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Replace with the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.log("request error");
    return false;
  }
}

export async function downloadOther(idGateway, idNode, startDate, endDate) {
  try {
    console.log(`download monthly G ${idGateway} N ${idNode}`);
    // eslint-disable-next-line no-unused-vars
    const response = await axios.get(
      `http://venom-uitjbb.id/api/v2/download/other?idGateway=${idGateway}&idNode=${idNode}&start=${startDate}&end=${endDate}`,
      {
        responseType: "blob", // Important to handle binary data
      }
    );

    //! get filename from response headers
    //! Extracting filename from response headers
    const contentDisposition = response.headers["Content-Disposition"];
    let fileName = `download-other-${startDate}-${endDate}.xlsx`; // Default filename
    // console.log("contentDisposition");
    // console.log(response.headers);
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Replace with the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.log("request error");
    return false;
  }
}

export async function findDeviceFromSensorBox(sensorBox, idGateway, idNode) {
  return sensorBox.find(
    (sensor) => sensor.idGateway === idGateway && sensor.idNode === idNode
  );
}
