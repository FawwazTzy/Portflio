import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";

import { useZustandState } from "../../../store/state";

const DataTop = () => {
  const { dataSensor } = useZustandState((state) => state);

  const [isOpenAwal, setIsOpenAwal] = useState(false);
  const [isOpenAkhir, setIsOpenAkhir] = useState(false);
  const [timeAwal, setTimeAwal] = useState("Time Awal");
  const [timeAkhir, setTimeAkhir] = useState("Time Akhir");

  const [selectedDateAwal, setSelectedDateAwal] = useState(null);
  const [isDateAwalClicked, setIsDateAwalClicked] = useState(true);
  const [dateAwal, setDateAwal] = useState("Tanggal Awal");
  const [dateAkhir, setDateAkhir] = useState("Tanggal Akhir");
  const [showCalendar, setShowCalendar] = useState(false);

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

  // let collectionDataGI = [];

  const onClickHandleAwal = (item) => {
    // console.log(item);
    //! tutup dropdown
    setIsOpenAwal(false);
    setTimeAwal(item.label);
  };

  const onClickHandleAkhir = (item) => {
    //! tutup dropdown
    setIsOpenAkhir(false);
    setTimeAkhir(item.label);
  };

  const dropdownRefTimeAwal = useRef(null); // Referensi untuk dropdown
  const dropdownRefTimeAkhir = useRef(null); // Referensi untuk dropdown

  // Efek untuk menutup dropdown saat klik di luar atau klik kanan
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefTimeAkhir.current &&
        !dropdownRefTimeAkhir.current.contains(event.target)
      ) {
        setIsOpenAkhir(false); // Tutup dropdown
      }
    };

    // Tambahkan event listener untuk klik dan klik kanan
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);

    return () => {
      // Bersihkan event listener saat komponen unmount
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [setIsOpenAkhir]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefTimeAwal.current &&
        !dropdownRefTimeAwal.current.contains(event.target)
      ) {
        setIsOpenAwal(false); // Tutup dropdown
      }
    };

    // Tambahkan event listener untuk klik dan klik kanan
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);

    return () => {
      // Bersihkan event listener saat komponen unmount
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [setIsOpenAwal]);

  const onDatePickerClicked = (date) => {
    setSelectedDateAwal(date);
    if (isDateAwalClicked) {
      setDateAwal(dayjs(date).format("DD-MM-YYYY"));
    } else {
      setDateAkhir(dayjs(date).format("DD-MM-YYYY"));
    }
  };

  async function getGataNode() {
    //! fetch data Nodes
    const result = await fetchNodesData();
    //! cek apakah ada sensor yang sudah di click
    const index = result.findIndex(
      (item) => item.node_id === sensorClicked.node_id
    );
    //! jika ada data yang sudah pernah di click
    if (index >= 0) {
      result[index].isClicked = sensorClicked.isClicked;
    }
    //! save to global variable
    setDataSensor(result);
    console.log(result);
    //! update center map ketika pertama kali fetchdata
    if (result[0].node_id != -1 && isFirstFetch) {
      console.log("update map pertama kali");

      const updateMap = {
        //!ikuti perhitungan function
        longitude: result[0].GPS_Koordinat[1] + 0.000211111, //kanan kiri
        latitude: result[0].GPS_Koordinat[0] - 0.0002111, //atas bawah
        zoom: 19,
      };
      setViewport(updateMap);
      setIsFirstFetch(false);
    }

    //   if (!result) {
    //     localStorage.removeItem("user");
    //     navigate("/login", { replace: true });
    //   }
    //   const user = await JSON.parse(localStorage.getItem("user"));
    //   setLocalStorageUserToken(user.token);
    //   const message = result["message"];
    //   console.log("message", message);
    //   setUserProfile(message);
    // }
  }

  return (
    <div className="flex w-full h-full ">
      <div className="flex flex-col w-[20%] h-full ">
        <div className="flex w-full h-[40px]  text-textColor">
          <p>Tanggal & Waktu Awal</p>
        </div>
        <div className="flex flex-1 w-full h-full justify-start items-center">
          <div className="flex w-[60%] h-full  items-center pr-[10px]">
            <div className="flex-1 relative">
              {" "}
              {/* Tambahkan relative */}
              {/* <div className="w-64"> */}
              <button
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  setIsDateAwalClicked(true);
                }}
                className="w-full flex h-[30px] justify-start items-center bg-textColor text-black  rounded-lg shadow-md"
              >
                <div className="flex flex-1 py-[8px] justify-center text-[14px] items-center">
                  <p>{dateAwal}</p>
                </div>

                <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                  <ChevronDown size={20} className="text-textColor" />
                </div>
              </button>
            </div>
          </div>
          <div className="flex w-[40%] h-full items-center ">
            <div className="flex-1 relative" ref={dropdownRefTimeAwal}>
              {" "}
              {/* Tambahkan relative */}
              {/* <div className="w-64"> */}
              <button
                onClick={() => setIsOpenAwal(!isOpenAwal)}
                className="w-full flex h-[30px] justify-start items-center bg-textColor text-black  rounded-lg shadow-md"
              >
                <div className="flex flex-1 py-[8px] justify-center text-[14px]">
                  {timeAwal}
                </div>
                {isOpenAwal ? (
                  <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                    <ChevronUp size={20} className="text-textColor" />
                  </div>
                ) : (
                  <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                    <ChevronDown size={20} className="text-textColor" />
                  </div>
                )}
              </button>
              {/* Dropdown dengan posisi absolute & z-index tinggi */}
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isOpenAwal ? "auto" : 0,
                  opacity: isOpenAwal ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-0 top-full z-50 w-full bg-textColor border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto"
              >
                {dropdownTime.map((item) => (
                  <li
                    key={item.id}
                    className="flex px-4 py-[8px] hover:bg-gray-100 cursor-pointer justify-center items-center"
                    onClick={() => onClickHandleAwal(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[30px] h-full  justify-center items-center">
        <div className="w-full h-[40px]"></div>
        <div className="flex flex-1 w-full h-full items-center justify-center px-[10px]">
          <div className="w-full h-[2px] bg-textColor"></div>
        </div>
      </div>
      <div className="flex  flex-col w-[20%]  h-full ">
        <div className="flex w-full h-[40px]  text-textColor">
          <p>Tanggal & Waktu Akhir</p>
        </div>
        <div className="flex flex-1 w-full h-full justify-start items-center">
          <div className="flex w-[60%] h-full  items-center pr-[10px]">
            <div className="flex-1 relative">
              {" "}
              {/* Tambahkan relative */}
              {/* <div className="w-64"> */}
              <button
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  setIsDateAwalClicked(false);
                }}
                className="w-full flex h-[30px] justify-start items-center bg-textColor text-black  rounded-lg shadow-md"
              >
                <div className="flex flex-1 py-[8px] justify-center items-center text-[14px]">
                  <p>{dateAkhir}</p>
                </div>

                <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                  <ChevronDown size={20} className="text-textColor" />
                </div>
              </button>
            </div>
          </div>
          <div className="flex w-[40%] h-full items-center ">
            <div className="flex-1 relative" ref={dropdownRefTimeAkhir}>
              {" "}
              {/* Tambahkan relative */}
              {/* <div className="w-64"> */}
              <button
                onClick={() => setIsOpenAkhir(!isOpenAkhir)}
                className="w-full flex h-[30px] justify-start items-center bg-textColor text-black  rounded-lg shadow-md"
              >
                <div className="flex flex-1 py-[8px] justify-center text-[14px]">
                  {timeAkhir}
                </div>
                {isOpenAkhir ? (
                  <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                    <ChevronUp size={20} className="text-textColor" />
                  </div>
                ) : (
                  <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                    <ChevronDown size={20} className="text-textColor" />
                  </div>
                )}
              </button>
              {/* Dropdown dengan posisi absolute & z-index tinggi */}
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isOpenAkhir ? "auto" : 0,
                  opacity: isOpenAkhir ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-0 top-full z-50 w-full bg-textColor border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto"
              >
                {dropdownTime.map((item) => (
                  <li
                    key={item.id}
                    className="flex px-4 py-[8px] hover:bg-gray-100 cursor-pointer justify-center items-center"
                    onClick={() => onClickHandleAkhir(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[30px] h-full  justify-center items-center py-[10px]">
        <div className="h-full w-[2px] bg-gradient-to-b from-[#314a60] via-white to-[#314a60]"></div>
      </div>
      <div className="flex flex-col w-[15%] h-full ">
        <div className="flex w-full h-[40px]  text-textColor">
          <p>Node</p>
        </div>
        <div className="flex flex-1 w-full h-full justify-start items-center">
          <div className="flex-1 relative" ref={dropdownRefTimeAwal}>
            {" "}
            {/* Tambahkan relative */}
            {/* <div className="w-64"> */}
            <button
              onClick={() => setIsOpenAwal(!isOpenAwal)}
              className="w-full flex h-[30px] justify-start items-center bg-textColor text-black  rounded-lg shadow-md"
            >
              <div className="flex flex-1 py-[8px] justify-center">
                {isOpenAwal}
              </div>
              {isOpenAwal ? (
                <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                  <ChevronUp size={20} className="text-textColor" />
                </div>
              ) : (
                <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                  <ChevronDown size={20} className="text-textColor" />
                </div>
              )}
            </button>
            {/* Dropdown dengan posisi absolute & z-index tinggi */}
            {/* <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isOpenULTG ? "auto" : 0,
                  opacity: isOpenULTG ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-0 top-full z-50 w-full bg-textColor border border-gray-200 rounded-lg shadow-md overflow-hidden"
              >
                {dropdownDataULTG.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-[8px] hover:bg-gray-100 cursor-pointer"
                    onClick={() => onClickHandleULTG(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </motion.ul> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[30px] h-full  justify-center items-center py-[10px]">
        <div className="h-full w-[2px] bg-gradient-to-b from-[#314a60] via-white to-[#314a60]"></div>
      </div>
      <div className="flex flex-col w-[15%] h-full ">
        <div className="flex w-full h-[40px]  text-textColor">
          <p>Status Kamera</p>
        </div>
        <div className="flex flex-1 w-full h-full justify-start items-center">
          <div className="flex-1 relative" ref={dropdownRefTimeAwal}>
            {" "}
            {/* Tambahkan relative */}
            {/* <div className="w-64"> */}
            <button
              onClick={() => setIsOpenAwal(!isOpenAwal)}
              className="w-full flex h-[30px] justify-start items-center bg-textColor text-black  rounded-lg shadow-md"
            >
              <div className="flex flex-1 py-[8px] justify-center">
                {isOpenAwal}
              </div>
              {isOpenAwal ? (
                <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                  <ChevronUp size={20} className="text-textColor" />
                </div>
              ) : (
                <div className="bg-dropDownArrow h-[30px] w-[20px] justify-center items-center flex rounded-lg">
                  <ChevronDown size={20} className="text-textColor" />
                </div>
              )}
            </button>
            {/* Dropdown dengan posisi absolute & z-index tinggi */}
            {/* <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isOpenULTG ? "auto" : 0,
                  opacity: isOpenULTG ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-0 top-full z-50 w-full bg-textColor border border-gray-200 rounded-lg shadow-md overflow-hidden"
              >
                {dropdownDataULTG.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-[8px] hover:bg-gray-100 cursor-pointer"
                    onClick={() => onClickHandleULTG(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </motion.ul> */}
          </div>
        </div>
      </div>
      <div className="flex flex-1 w-full h-full flex-col justify-center items-center">
        <div className="h-[40px] w-full"></div>
        <button
          // onClick={() => setIsOpenULTG(!isOpenULTG)}
          className="w-[80%] flex h-[35px] justify-center items-center bg-[#009959] text-textColor  rounded-lg shadow-md"
        >
          Lihat Tabel
        </button>
      </div>
      {/* //! komponen kalender */}
      {showCalendar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col p-6 bg-textColor text-black rounded-lg shadow-lg">
            <div className="flex w-full h-[45px] justify-center items-center">
              Pilih Tanggal
            </div>
            {/* <div className="flex w-full h-full"> */}
            <DatePicker
              selected={selectedDateAwal}
              onChange={(date) => {
                onDatePickerClicked(date);
                setShowCalendar(false); // Menutup popup setelah memilih tanggal
              }}
              inline
            />
            {/* </div> */}
            <button
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-textColor rounded-lg transition w-full"
              onClick={() => setShowCalendar(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTop;
