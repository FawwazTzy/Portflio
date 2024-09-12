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
import { fetchAdmins, searchInData } from "./function";

const AdminSetting = () => {
  const navigate = useNavigate();

  const {
    isMenuActive,
    setIsMenuActive,
    isPopDeleteVisible,
    setIsPopDeleteVisible,
  } = useZustandState((state) => state);
  const [localStorageUserToken, setLocalStorageUserToken] = useState("");

  const [userProfile, setUserProfile] = useState({
    username: "-",
    id: "-",
    email: "-",
    phone: "-",
    unit: "-",
    nodes_id: [],
  });
  const [search, setSearch] = useState("");
  const [dataAdmins, setDataAdmins] = useState([]);
  const [adminsFromServer, setAdminsFromServer] = useState([]);
  const [maxPagination, setMaxPagination] = useState(1);

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
      const res = await fetchAdmins();
      if (res.status == 200) {
        const message = res.data.message;
        console.log("dataUsers ", message);
        setAdminsFromServer(message);
        const length = message.length;
        if (length <= 10) {
          setDataAdmins(message);
        } else {
          let slicedArray = message.slice(0, 8);
          setDataAdmins(slicedArray);
          let d = length / 8;
          let pag = Math.floor(d) + 1;
          console.log("pag ", pag);
          setMaxPagination(pag);
        }
      }
    }
    getDataProfile();
    getDataUsers();
    // setMaxPagination(3);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNew = () => {
    console.log("tekan");
    navigate("/setting/admin/add");
  };

  const handleChangeSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue == "") {
      setDataAdmins(adminsFromServer);
    } else {
      const result = searchInData(adminsFromServer, searchValue);
      setDataAdmins(result);
    }
  };

  const handleCancelDelete = () => {
    const data = {
      status: false,
      message: {
        id: "",
        username: "",
      },
    };
    setIsPopDeleteVisible(data);
  };

  const handleDelete = async () => {
    const data = {
      status: false,
      message: {
        id: "",
        username: "",
      },
    };
    setIsPopDeleteVisible(data);
  };

  return (
    <div className="relative flex flex-col w-screen h-screen realtive bg-primary">
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

      {/*  */}
      {isPopDeleteVisible.status && (
        <div className="fixed flex z-50 top-0 left-0 w-screen h-screen   justify-center items-center ">
          <div className="flex flex-col w-[40%] h-[40%] min-w-[400px] min-h-[200px] ">
            <div className="w-full h-[50px] flex  place-content-between bg-[#1e1e2b] px-[20px] items-center">
              <p className="text-white font-bold">Confirmation!</p>
              <p className="text-white ">X</p>
            </div>
            <div className="flex-1 flex bg-[#444d59] items-center  justify-center">
              <p className="text-white">
                Are you sure want to delete{" "}
                <span className="font-bold text-red-500">{`${isPopDeleteVisible.message.username}`}</span>{" "}
                from the list?
              </p>
            </div>
            <div className="w-full h-[50px] flex bg-[#1e1e2b] items-center justify-end px-[20px]">
              <button
                type="button"
                className="text-white bg-[#444d59] w-[80px] h-[30px] rounded-md mr-[20px] hover:bg-secondary"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                type="button"
                className="text-white bg-[#444d59] w-[80px] h-[30px] rounded-md hover:bg-secondary"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/*  */}
      <div className="flex flex-col w-full h-full px-[15px] py-[45px] text-white">
        <p>Admin Setting</p>
        <div className="h-[80px] w-full flex items-center justify-between">
          <button
            className="flex items-center justify-center bg-[#98989d] w-[96px] h-[28px] min-h-[28px] rounded-md"
            onClick={handleAddNew}
          >
            <AddSVG />
            <p className="pl-[5px] text-[10px] text-white">Add admin</p>
          </button>
          {/* <div className="Relative w-[150px] h-[28px] min-h-[28px] rounded-md bg-[#333333] border-[1px] border-[#8a8a8a] flex items-center px-[4px]"> */}
          <div className="relative w-[150px] h-[28px] min-h-[28px] bg-[#333333]">
            <button type="button" className="absolute left-2 top-[5px] ">
              <SearchSVG />
            </button>
            <input
              type="text"
              placeholder="Search sensor"
              className="block w-full rounded border-0 py-[2px] pl-[30px] text-gray-400 bg-[#333333] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
              onChange={handleChangeSearch}
              value={search}
            />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <TableHeader />
          <div className="w-full h-[320px] ">
            {dataAdmins.map((d, index) => (
              <TableValue
                key={d.id}
                id={d.id}
                no={index + 1}
                username={d.username}
                email={d.email}
                phone={d.phone}
                unit={d.unit}
                action={d.isSuperAdmin}
              />
            ))}
          </div>
          <div className="w-full flex items-center justify-end">
            <Pagination maxPagination={maxPagination} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;
