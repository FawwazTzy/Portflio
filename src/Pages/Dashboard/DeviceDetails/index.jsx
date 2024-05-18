import {} from "react";
import HeaderDetails from "./HeaderDetails";
import DetailValue from "./DetailValue";
import { useZustandState } from "../../../store/state";

const DeviceDetails = () => {
  const { deviceDetail } = useZustandState((state) => state);
  return (
    <div className="flex flex-col w-[300px] h-[300px] bg-third border-2 border-secondary rounded-xl p-[10px]">
      <HeaderDetails title="12754 - T415" />
      <div className="w-full h-[150px] bg-primary rounded-xl mb-[10px]"></div>
      <div className="flex-1">
        <DetailValue
          lastUpdate={deviceDetail.createOn}
          a={deviceDetail.a}
          p={deviceDetail.p}
          r={deviceDetail.r}
          rh={deviceDetail.rh}
          t={deviceDetail.t}
          v={deviceDetail.v}
        />
      </div>
    </div>
  );
};

export default DeviceDetails;
