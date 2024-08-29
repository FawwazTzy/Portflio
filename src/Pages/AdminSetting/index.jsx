import { useState, useEffect } from "react";
import Header from "./Header";
import AddSVG from "../../assets/add.svg";
import TableHeader from "./TableHeader";
import TableValue from "./TableValue";
import Pagination from "./Pagination";
import SearchSVG from "../../assets/search.svg";
import { useZustandState } from "../../store/state";
import Menu from "../Dashboard/Menu";
import { cekCookie, cekTokenAdmin, fetchProfile } from "../../globalFunction";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "./function";

const AdminSetting = () => {
  const navigate = useNavigate();
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

  const { isMenuActive, setIsMenuActive, setDataUsers, dataUsers } =
    useZustandState((state) => state);
  const [localStorageUserToken, setLocalStorageUserToken] = useState("");

  const [userProfile, setUserProfile] = useState({
    username: "-",
    id: "-",
    email: "-",
    phone: "-",
    unit: "-",
    nodes_id: [],
  });

  useEffect(() => {
    async function getDataProfile() {
      //! cek ada token di cookie ada atau tidak
      setIsMenuActive(false);
      const statusCookie = await cekCookie();

      //! jika tidak ada direct ke error page
      if (!statusCookie) {
        // Hapus data dari Local Storage dan update state
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      } else {
        //! jika ada get profile
        const result = await fetchProfile();
        if (!result) {
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
        }
        const user = await JSON.parse(localStorage.getItem("user"));
        setLocalStorageUserToken(user.token);
        const message = result["message"];
        // console.log("message", message);
        setUserProfile(message);
      }
    }

    async function getDataUsers() {
      //! cek ada token di cookie ada atau tidak
      console.log("get data users");
      const dataUsers = await fetchUsers();
      console.log("dataUsers ", dataUsers);
      setDataUsers(dataUsers);
    }
    getDataProfile();
    getDataUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen realtive bg-primary">
      <Header setIsMenuActive={setIsMenuActive} />
      {isMenuActive && (
        <div
          className="absolute top-0 left-0 z-20 w-full h-full "
          onClick={() => setIsMenuActive(false)}
        ></div>
      )}
      {/* icon menu */}
      <Menu
        className={`${
          isMenuActive ? "left-0 " : "-left-[500px]"
        } fixed top-0  z-30  w-[240px] h-full bg-primary transition-all duration-300 flex flex-col p-[15px]`}
        profile_email={`${userProfile.email}`}
        profile_name={`${userProfile.username}`}
        token={`${localStorageUserToken}`}
        cekTokenAdmin={`${cekTokenAdmin}`}
      />
      {/* =========== */}
      <div className="flex flex-col w-full h-full px-[15px] py-[45px] text-white">
        <p>Admin Setting</p>
        <div className="h-[80px] w-full flex items-center justify-between">
          <button className="flex items-center justify-center bg-[#98989d] w-[96px] h-[28px] min-h-[28px] rounded-md">
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
            {dataUsers.map((d, index) => (
              <TableValue
                key={d.id}
                no={index}
                username={d.username}
                email={d.email}
                phone={d.phone}
                unit={d.unit}
                action={d.isSuperAdmin}
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

export default AdminSetting;
