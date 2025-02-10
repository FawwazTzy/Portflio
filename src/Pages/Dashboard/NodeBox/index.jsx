// eslint-disable-next-line no-unused-vars
import React from "react";
import DeviceBox from "./DeviceBox";
import { useZustandState } from "../../../store/state";
import { updateMap, convertToDataChart } from "../function";

function NodeBox() {
  const {
    dataSensor,
    setDataSensor,
    setSensorClicked,
    setViewport,
    setISensorImageVisible,
    setDataChartXY,
    setMaxY_Axis,
    setMinY_Axis,
  } = useZustandState((state) => state);

  const onClickHandle = ({ device, index }) => {
    //! update position map dan zoom
    setViewport(updateMap(device));
    //! Mengubah semua isClicked menjadi false
    const tempDataSensor = dataSensor.map((item) => ({
      ...item,
      isClicked: false,
    }));
    //! update flag isClicked
    tempDataSensor[index].isClicked = true;
    setDataSensor(tempDataSensor);
    //! update flag ke variable backup ketika fetch data server
    setSensorClicked(tempDataSensor[index]);
    //! flag untuk menampilkan sensor image
    setISensorImageVisible(true);

    //! get data chart
    const d = convertToDataChart(
      dataSensor[index].Date_time,
      dataSensor[index].Pressure
    );
    setDataChartXY(d[0]);
    setMaxY_Axis(d[1]);
    setMinY_Axis(d[2]);
  };

  return (
    <div className="flex w-full h-full flex-col p-[10my] ">
      <div className="w-full flex items-center justify-center h-[30px] ">
        <p className="text-[18px] text-white ">Node Island</p>
      </div>
      <div className="flex-1 overflow-y-auto w-full h-full mt-[10px] pl-[10px] pr-[10px]">
        {dataSensor.map((device, index) => (
          <div
            className="cursor-pointer"
            key={index}
            onClick={() => onClickHandle({ device, index })}
          >
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
            <DeviceBox
              title={device.node_id}
              value={device.Pressure.at(-1)}
              isClicked={device.isClicked}
              statusCam={device.Status_cam.at(-1)}
              statusGauge={device.Status_gauge.at(-1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
// overflow - y - scroll;
export default NodeBox;
