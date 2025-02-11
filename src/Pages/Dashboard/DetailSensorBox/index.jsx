// eslint-disable-next-line no-unused-vars
import React from "react";
import Detail from "./Detal";
import ChartBox from "../ChartBox";

import { useZustandState } from "../../../store/state";

function DetailSensorBox() {
  const { sensorClicked } = useZustandState((state) => state);
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-1 w-full h-full bg-[#314a60] rounded-xl ">
        <ChartBox />
      </div>
      <div className="flex w-[250px] h-full bg-[#314a60] ml-[10px] rounded-xl p-[10px]">
        <div className="flex flex-col w-full h-full bg-[#507fa3] rounded-xl p-[10px]">
          <div className="flex w-full h-[20px]  justify-center items-center">
            <div
              className={`flex w-[50%] h-[8px] rounded-xl ${
                sensorClicked.node_id === "err"
                  ? "bg-[#808080]"
                  : sensorClicked.Status_cam.at(-1) &&
                    sensorClicked.Status_gauge.at(-1) === "aman"
                  ? "bg-[#3AB35C]"
                  : sensorClicked.Status_cam.at(-1) &&
                    sensorClicked.Status_gauge.at(-1) === "waspada"
                  ? "bg-[#FFDE59]"
                  : sensorClicked.Status_cam.at(-1) &&
                    sensorClicked.Status_gauge.at(-1) === "bahaya"
                  ? "bg-[#C61D16]"
                  : "bg-[#808080]"
              } `}
            ></div>
            <div className="flex flex-1 w-full h-full justify-start items-center ml-[10px] text-white">
              <p>
                {sensorClicked.node_id === "err" ? "-" : sensorClicked.node_id}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col ">
            <Detail title={"Tekanan"} value={5.8} isWithSatuan={true} />
            <Detail
              title={"Lokasi"}
              value={
                sensorClicked.node_id === "err"
                  ? "-"
                  : `${sensorClicked.Merk} ${sensorClicked.type}`
              }
              isWithSatuan={false}
            />
            <Detail
              title={"Merk"}
              value={sensorClicked.node_id === "err" ? "-" : sensorClicked.Merk}
              isWithSatuan={false}
            />
            <Detail
              title={"Zona"}
              value={
                sensorClicked.node_id === "err"
                  ? "-"
                  : sensorClicked.zona_instalasi
              }
              isWithSatuan={false}
            />
            <Detail
              title={"Status"}
              value={
                sensorClicked.node_id === "err"
                  ? "-"
                  : sensorClicked.Status_cam.at(-1) &&
                    sensorClicked.Status_gauge.at(-1) === "aman"
                  ? "Aman"
                  : sensorClicked.Status_cam.at(-1) &&
                    sensorClicked.Status_gauge.at(-1) === "waspada"
                  ? "Waspada"
                  : sensorClicked.Status_cam.at(-1) &&
                    sensorClicked.Status_gauge.at(-1) === "bahaya"
                  ? "Bahaya"
                  : "Pasif"
              }
              isWithSatuan={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSensorBox;
