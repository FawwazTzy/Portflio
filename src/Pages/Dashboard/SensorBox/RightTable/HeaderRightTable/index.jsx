import {} from "react";
import DropDownFilter from "../DropDownFilter";
// import DropdownDatePicker from "../DropdownDatePicker";
import { useZustandState } from "../../../../../store/state";
import {
  downloadDaily,
  downloadWeekly,
  downloadMonthly,
  downloadOther,
} from "../../../function";

// eslint-disable-next-line react/prop-types
const HeaderSensor = () => {
  const {
    isSensorSelect,
    timeFilter,
    dataSensorSelect,
    isOtherSelected,
    setIsCalenderStartOpen,
    setIsCalenderEndOpen,
    startDate,
    endDate,
  } = useZustandState((state) => state);

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
        // eslint-disable-next-line no-unused-vars
        const temp1 = startDate.split("-");
        const temp2 = endDate.split("-");
        const tempStartYear = temp1[2].split("");
        const tempEndYear = temp2[2].split("");
        const startYear = `${tempStartYear[2]}${tempStartYear[3]}`;
        const endYear = `${tempEndYear[2]}${tempEndYear[3]}`;
        const start = `${temp1[0]}${temp1[1]}${startYear}`;
        const end = `${temp2[0]}${temp2[1]}${endYear}`;

        // eslint-disable-next-line no-unused-vars
        const day = await downloadOther(idGateway, idNode, start, end);
      }
    }
  };
  return (
    <div className=" w-full ">
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
      </div>
      {isOtherSelected && (
        <div>
          <div className="flex flex-col mt-[10px]">
            <div className="w-full flex justify-between  items-center">
              <div className="flex">
                <p className="text-white text-[12px] mr-[10px]">Periode:</p>
                <div className="relative  inline-block text-left ">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="w-[100px] h-[20px] items-center justify-between inline-flex rounded bg-secondary px-3  "
                      id="menu-button"
                      // aria-expanded="true"
                      // aria-haspopup="true"
                      onClick={() => setIsCalenderStartOpen(true)}
                    >
                      <p className="text-[10px]  text-white">{startDate}</p>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex">
                <p className="text-white text-[12px] mr-[10px]">-</p>
                <div className="relative  inline-block text-left ">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="w-[100px] h-[20px] items-center justify-between inline-flex rounded bg-secondary px-3  "
                      id="menu-button"
                      // aria-expanded="true"
                      // aria-haspopup="true"
                      onClick={() => setIsCalenderEndOpen(true)}
                    >
                      <p className="text-[10px]  text-white">{endDate}</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSensor;
