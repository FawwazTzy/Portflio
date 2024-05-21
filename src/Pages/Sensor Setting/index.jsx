import {} from "react";
import Header from "./Header";
import TableHeader from "./TableHeader";
import TableValue from "./TableValue";
import Pagination from "./Pagination";
import SearchSVG from "../../assets/search.svg";

const SensorSetting = () => {
  const data = [
    {
      key: 1,
      id: 1,
      sensorName: "admin 1",
      userName: "admin@admin.com",
      initPitch: "+6285865585451",
      initRoll: "server",
      thresPitch: "true",
      thresRoll: "true",
      tinggiTower: "true",
      tinggiPemasangan: "true",
      nomorM2M: "true",
      lastUpdate: "true",
    },
    {
      key: 2,
      id: 2,
      sensorName: "admin 1",
      userName: "admin@admin.com",
      initPitch: "+6285865585451",
      initRoll: "server",
      thresPitch: "true",
      thresRoll: "true",
      tinggiTower: "true",
      tinggiPemasangan: "true",
      nomorM2M: "true",
      lastUpdate: "true",
    },
    {
      key: 3,
      id: 3,
      sensorName: "admin 1",
      userName: "admin@admin.com",
      initPitch: "+6285865585451",
      initRoll: "server",
      thresPitch: "true",
      thresRoll: "true",
      tinggiTower: "true",
      tinggiPemasangan: "true",
      nomorM2M: "true",
      lastUpdate: "true",
    },
    {
      key: 4,
      id: 4,
      sensorName: "admin 1",
      userName: "admin@admin.com",
      initPitch: "+6285865585451",
      initRoll: "server",
      thresPitch: "true",
      thresRoll: "true",
      tinggiTower: "true",
      tinggiPemasangan: "true",
      nomorM2M: "true",
      lastUpdate: "true",
    },
    {
      key: 5,
      id: 5,
      sensorName: "admin 1",
      userName: "admin@admin.com",
      initPitch: "+6285865585451",
      initRoll: "server",
      thresPitch: "true",
      thresRoll: "true",
      tinggiTower: "true",
      tinggiPemasangan: "true",
      nomorM2M: "true",
      lastUpdate: "true",
    },
    {
      key: 6,
      id: 6,
      sensorName: "admin 1",
      userName: "admin@admin.com",
      initPitch: "+6285865585451",
      initRoll: "server",
      thresPitch: "true",
      thresRoll: "true",
      tinggiTower: "true",
      tinggiPemasangan: "true",
      nomorM2M: "true",
      lastUpdate: "true",
    },
    {
      key: 7,
      id: 7,
      sensorName: "admin 1",
      userName: "admin@admin.com",
      initPitch: "+6285865585451",
      initRoll: "server",
      thresPitch: "true",
      thresRoll: "true",
      tinggiTower: "true",
      tinggiPemasangan: "true",
      nomorM2M: "true",
      lastUpdate: "true",
    },
    {
      key: 8,
      id: 8,
      sensorName: "admin 1",
      userName: "admin@admin.com",
      initPitch: "+6285865585451",
      initRoll: "server",
      thresPitch: "true",
      thresRoll: "true",
      tinggiTower: "true",
      tinggiPemasangan: "true",
      nomorM2M: "true",
      lastUpdate: "true",
    },
    // {
    //   no: 9,
    //   username: "admin 2",
    //   email: "admin@admin.com",
    //   phone: "+6285865585451",
    //   unit: "server",
    //   isDeleteShow: false,
    // },
    // {
    //   no: 10,
    //   username: "admin 10",
    //   email: "admin@admin.com",
    //   phone: "+6285865585451",
    //   unit: "server",
    //   isDeleteShow: false,
    // },
  ];
  return (
    <div className="flex flex-col w-screen h-screen realtive bg-primary">
      <Header />
      <div className="flex flex-col w-full h-full px-[15px] py-[45px] text-white">
        <p>User Setting</p>
        <div className="h-[80px] w-full flex items-center justify-between">
          <div className="w-[96px] h-[28px] min-h-[28px]"></div>
          <div className="w-[150px] h-[28px] min-h-[28px] rounded-md bg-[#333333] border-[1px] border-[#8a8a8a] flex items-center px-[4px]">
            <div className="flex mr-[5px]">
              <SearchSVG />
            </div>
            <div className="flex-1 text-[10px] text-[#8a8a8a]">
              Search sensor
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <TableHeader />
          <div className="w-full h-[320px] ">
            {data.map((d) => (
              <TableValue
                key={d.key}
                id={d.id}
                sensorName={d.sensorName}
                username={d.userName}
                initPitch={d.initPitch}
                initRoll={d.initRoll}
                thresPitch={d.thresPitch}
                thresRoll={d.thresRoll}
                tinggiTower={d.tinggiTower}
                tinggiPemasangan={d.tinggiPemasangan}
                nomorM2M={d.nomorM2M}
                lastUpdate={d.lastUpdate}
              />
            ))}
          </div>
          <div className="w-full flex items-center justify-end">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorSetting;
