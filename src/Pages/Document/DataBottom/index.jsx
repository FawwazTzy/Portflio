/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TableTitle from "./TableTitle";
import TableValue from "./TableValue";
import DownloadBox from "./DownloadBox";

const dropdownTime = [
  { id: 1, label: "00:00" },
  { id: 2, label: "01:00" },
  { id: 3, label: "02:00" },
  { id: 4, label: "03:00" },
  { id: 5, label: "04:00" },
  { id: 6, label: "05:00" },
  { id: 7, label: "06:00" },
  { id: 8, label: "07:00" },
  { id: 9, label: "08:00" },
  { id: 10, label: "09:00" },
  { id: 11, label: "10:00" },
  { id: 12, label: "11:00" },
  { id: 13, label: "12:00" },
  { id: 14, label: "13:00" },
  { id: 15, label: "14:00" },
  { id: 16, label: "15:00" },
  { id: 17, label: "16:00" },
  { id: 18, label: "17:00" },
  { id: 19, label: "18:00" },
  { id: 20, label: "19:00" },
  { id: 21, label: "20:00" },
  { id: 22, label: "21:00" },
  { id: 23, label: "22:00" },
  { id: 24, label: "23:00" },
];

const DataBottom = ({ dataTable, onClickDownloadLaporan }) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(dropdownTime.length);
  }, []);

  return (
        <div className="flex flex-col w-full h-full ">
      <div className="w-full flex-1 flex flex-col overflow-x-auto">
        {/* wrapper untuk sync scroll horizontal */}
        <div className="min-w-max">
          {/* TableTitle STICKY (tidak ikut scroll Y) */}
          <div className="sticky top-0 z-1 ">
            <TableTitle isMore={length} />
          </div>

          {/* Scroll Y hanya di bagian ini */}
          <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
            {Array.isArray(dataTable) && dataTable.map((item, index) => (
              <TableValue key={index}
                dateTime={item.dateTime}
                nodeName={item.nodeName}
                pressure={item.pressure}
                ultgName={item.ULTG}
                garduInduk={item.unit}
                statusCam={item.statusCam}
                statusGauge={item.statusGauge}
                brand={item.brand}
                isolasi={item.isolasi}
                zona={item.zonaInstallation}

              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full h-[80px] ">
        <DownloadBox onClickDownloadLaporan={onClickDownloadLaporan} />
      </div>
    </div>
  )
};

export default DataBottom;
