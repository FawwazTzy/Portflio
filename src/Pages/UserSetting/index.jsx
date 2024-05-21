import {} from "react";
import Header from "./Header";
import AddSVG from "../../assets/add.svg";
import TableHeader from "./TableHeader";
import TableValue from "./TableValue";
import Pagination from "./Pagination";
import SearchSVG from "../../assets/search.svg";

const UserSetting = () => {
  const data = [
    {
      no: 1,
      username: "admin 1",
      email: "admin@admin.com",
      phone: "+6285865585451",
      unit: "server",
      isDeleteShow: true,
    },
    {
      no: 2,
      username: "admin 2",
      email: "admin@admin.com",
      phone: "+6285865585451",
      unit: "server",
      isDeleteShow: true,
    },
    {
      no: 3,
      username: "admin 3",
      email: "admin@admin.com",
      phone: "+6285865585451",
      unit: "server",
      isDeleteShow: false,
    },
    {
      no: 4,
      username: "admin 13",
      email: "admin@admin.com",
      phone: "+6285865585451",
      unit: "server",
      isDeleteShow: false,
    },
    {
      no: 5,
      username: "admin 14",
      email: "admin@admin.com",
      phone: "+6285865585451",
      unit: "server",
      isDeleteShow: false,
    },
    {
      no: 6,
      username: "admin 11",
      email: "admin@admin.com",
      phone: "+6285865585451",
      unit: "server",
      isDeleteShow: false,
    },
    {
      no: 7,
      username: "admin 15",
      email: "admin@admin.com",
      phone: "+6285865585451",
      unit: "server",
      isDeleteShow: false,
    },
    {
      no: 8,
      username: "admin 18",
      email: "admin@admin.com",
      phone: "+6285865585451",
      unit: "server",
      isDeleteShow: false,
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
          <button className="flex items-center justify-center bg-secondary w-[96px] h-[28px] min-h-[28px] rounded-md">
            <AddSVG />
            <p className="pl-[5px] text-[10px] text-white">Add admin</p>
          </button>
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
                key={d.no}
                no={d.no}
                username={d.username}
                email={d.email}
                phone={d.phone}
                unit={d.unit}
                action={d.isDeleteShow}
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

export default UserSetting;
