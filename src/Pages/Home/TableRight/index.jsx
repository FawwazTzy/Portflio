import React from "react";
import CustomRow from "./CustomRow";
import { useZustandStateHome } from "../../../store/stateHome";

const TableRight = () => {
  const {
    dataSensorKameraOn,
    dataSensorKameraOff,
    isBoxClick,
    dataSensorGaugeNormal,
    dataSensorGaugeAnomali,
  } = useZustandStateHome((state) => state);

  return (
    <div className="flex flex-col w-full h-full p-[10px]">
      <div className="flex w-full h-[40px] text-white">
        <p>
          Data :{" "}
          {isBoxClick === "kameraOff"
            ? "Kamera Off"
            : isBoxClick === "kameraOn"
            ? "Kamera On"
            : isBoxClick === "gaugeNormal"
            ? "Gauge Normal"
            : isBoxClick === "gaugeAnomali"
            ? "Gauge Anomali"
            : ""}
        </p>
      </div>
      <div className="flex w-full h-[40px]">
        <CustomRow
          Id={"Id"}
          isolasi={"Isolasi"}
          lokasi={"Lokasi"}
          merks={"Merks"}
          nilai={"Nilai"}
          status={"Status"}
          zona={"Zona"}
          bgColor={"bg-[#314a60]"}
          isTitle={true}
        />
      </div>
      <div className="flex-1 flex flex-col w-full h-full overflow-y-auto mt-[5px]">
        {isBoxClick === "kameraOn" ? (
          (dataSensorKameraOn || []).map((device, index) => (
            <div key={index}>
              <div className="flex w-full h-[40px] mb-[5px] ">
                <CustomRow
                  Id={device.node_id}
                  isolasi={device.isolasi}
                  lokasi={`${device.Merk} ${device.type}`}
                  merks={device.Merk}
                  nilai={device.LastPressure}
                  status={device.LastStatus_cam}
                  zona={device.zona_instalasi}
                  bgColor={"bg-[#91c6f0]"}
                  isTitle={false}
                />
              </div>
            </div>
          ))
        ) : isBoxClick === "kameraOff" ? (
          (dataSensorKameraOff || []).map((device, index) => (
            <div className="flex w-full h-[40px] mt-[5px] " key={index}>
              <CustomRow
                Id={device.node_id}
                isolasi={device.isolasi}
                lokasi={`${device.Merk} ${device.type}`}
                merks={device.Merk}
                nilai={device.LastPressure}
                status={device.LastStatus_cam}
                zona={device.zona_instalasi}
                bgColor={"bg-[#91c6f0]"}
                isTitle={false}
              />
            </div>
          ))
        ) : isBoxClick === "gaugeNormal" ? (
          (dataSensorGaugeNormal || []).map((device, index) => (
            <div className="flex w-full h-[40px] mt-[5px] " key={index}>
              <CustomRow
                Id={device.node_id}
                isolasi={device.isolasi}
                lokasi={`${device.Merk} ${device.type}`}
                merks={device.Merk}
                nilai={device.LastPressure}
                status={device.LastStatus_cam}
                zona={device.zona_instalasi}
                bgColor={"bg-[#91c6f0]"}
                isTitle={false}
              />
            </div>
          ))
        ) : isBoxClick === "gaugeAnomali" ? (
          (dataSensorGaugeAnomali || []).map((device, index) => (
            <div className="flex w-full h-[40px] mt-[5px] " key={index}>
              <CustomRow
                Id={device.node_id}
                isolasi={device.isolasi}
                lokasi={`${device.Merk} ${device.type}`}
                merks={device.Merk}
                nilai={device.LastPressure}
                status={device.LastStatus_cam}
                zona={device.zona_instalasi}
                bgColor={"bg-[#91c6f0]"}
                isTitle={false}
              />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
      {/* {isKameraOnClick
        ? dataSensorKameraOn
        : dataSensorKameraOff.map((device, index) => {
            <CustomRow
              key={index}
              Id={device.node_id}
              isolasi={device.isolasi}
              lokasi={"lokasi"}
              merks={device.Merk}
              nilai={device.LastPressure}
              status={device.Status_cam}
              zona={device.zona_instalasi}
              bgColor={"bg-[#314a60]"}
            />;
          })} */}
    </div>
  );
};

export default TableRight;
