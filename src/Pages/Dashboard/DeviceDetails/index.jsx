import {} from "react";
import HeaderDetails from "./HeaderDetails";
import DetailValue from "./DetailValue";
import { useZustandState } from "../../../store/state";

const DeviceDetails = () => {
  const { deviceDetail } = useZustandState((state) => state);
  return (
    <div className="flex flex-col w-[200px] h-[230px] bg-third border-2 border-secondary rounded-xl p-[5px]">
      <HeaderDetails
        gateway={`${deviceDetail.nameGateway}`}
        node={`${deviceDetail.nameNode}`}
      />
      <div className="flex flex-1 w-full bg-primary rounded-xl mb-[3px]"></div>
      <div className="w-full h-[80px] ">
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
