import {} from "react";
import DropDownFilter from "../DropDownFilter";
import { useZustandState } from "../../../../../store/state";
import {
  downloadDaily,
  downloadWeekly,
  downloadMonthly,
} from "../../../function";

// eslint-disable-next-line react/prop-types
const HeaderSensor = () => {
  const { isSensorSelect, timeFilter, dataSensorSelect } = useZustandState(
    (state) => state
  );

  const onCLickHandle = async () => {
    if (isSensorSelect) {
      const idGateway = dataSensorSelect.idGateway;
      const idNode = dataSensorSelect.idNode;
      if (timeFilter === "Daily") {
        // eslint-disable-next-line no-unused-vars
        const day = await downloadDaily(idGateway, idNode);
      } else if (timeFilter === "Weekly") {
        // eslint-disable-next-line no-unused-vars
        const day = await downloadWeekly(idGateway, idNode);
      } else if (timeFilter === "Monthly") {
        // eslint-disable-next-line no-unused-vars
        const day = await downloadMonthly(idGateway, idNode);
      } else {
        // const other = await fetchChartDataDay(3, 1);
        // setDataChartSelect(other);
      }
    }
  };
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between  items-center">
        <div className="flex">
          <p className="text-white text-[12px] mr-[10px]">Filter:</p>
          <DropDownFilter />
        </div>

        <div className="flex">
          <button
            className="bg-secondary  w-[90px] h-[20px] rounded-lg text-white text-[10px]"
            onClick={() => onCLickHandle()}
          >
            Download
          </button>
        </div>
      </div>
      {/* <div className=" mt-[5px] w-full h-[8px] border-b-2 border-secondary"></div> */}
    </div>
  );
};

export default HeaderSensor;
