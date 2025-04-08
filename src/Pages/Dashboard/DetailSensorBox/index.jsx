// eslint-disable-next-line no-unused-vars
import React from "react";
import Detail from "./Detal";
import ChartBox from "../ChartBox";

import { useZustandState } from "../../../store/state";

function DetailSensorBox() {
  const { nodeSelected } = useZustandState((state) => state);
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-1 w-full h-full bg-[#314a60] rounded-xl ">
        <ChartBox />
      </div>
      <div className="flex w-[250px] h-full bg-[#314a60] ml-[10px] rounded-xl p-[10px]">
        <div className="flex flex-col w-full h-full bg-backgorundSecond rounded-xl p-[10px]">
          <div className="flex w-full h-[20px]  justify-center items-center">
            <div
              className={`flex w-[20%] h-[8px] rounded-xl ${nodeSelected.nodeName === "-"
                ? "bg-[#808080]"
                : nodeSelected.statusCam &&
                  nodeSelected.statusGauge === "aman"
                  ? "bg-primary"
                  : nodeSelected.statusCam &&
                    nodeSelected.statusGauge === "waspada"
                    ? "bg-[#FFDE59]"
                    : nodeSelected.statusCam &&
                      nodeSelected.statusGauge === "bahaya"
                      ? "bg-[#C61D16]"
                      : "bg-[#808080]"
                } `}
            ></div>
            <div className="flex flex-1 w-full h-full justify-start items-center ml-[10px] text-textColor">
              <p>
                {nodeSelected.nodeName}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col ">
            <Detail title={"Tekanan"} value={nodeSelected.pressure} isWithSatuan={true} />
            <Detail
              title={"Lokasi"}
              value={nodeSelected.unit}
              isWithSatuan={false}
            />
            <Detail
              title={"Merk"}
              value={nodeSelected.brand}
              isWithSatuan={false}
            />
            <Detail
              title={"Zona"}
              value={nodeSelected.zonaInstallation}
              isWithSatuan={false}
            />
            <Detail
              title={"Isolasi"}
              value={nodeSelected.isolasi}
              isWithSatuan={false}
            />
            <Detail
              title={"Status"}
              value={
                nodeSelected.nodeName === "-"
                  ? "-"
                  : nodeSelected.statusCam &&
                    nodeSelected.statusGauge === "aman"
                    ? "Aman"
                    : nodeSelected.statusCam &&
                      nodeSelected.statusGauge === "waspada"
                      ? "Waspada"
                      : nodeSelected.statusCam &&
                        nodeSelected.statusGauge === "bahaya"
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
