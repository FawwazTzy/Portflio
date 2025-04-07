import { useState, useEffect, useRef } from "react";
import UserPNG from "../../../assets/user.png";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useZustandState } from "../../../store/state";

const Header = () => {
  const { ULTG, unit, setUnitSelected, setDipilihULTG, nodes, setNodesView, dipilihULTG } = useZustandState((state) => state);

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenULTG, setIsOpenULTG] = useState(false);
  const [dropdownDataGI, setDropdownDataGI] = useState(["Semua Gardu Induk"]);
  const [ULTGName, setULTGName] = useState("Semua ULTG");
  const [GIName, setGIName] = useState("Semua Gardu Induk");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      // eslint-disable-next-line no-unused-vars
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // const dayOfWeek = daysOfWeek[now.getDay()];
      const dayOfMonth = now.getDate();
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      const formattedTime = `${hours}:${minutes}:${seconds}`;
      const formattedDate = `${dayOfMonth} ${month} ${year}`;
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const onClickHandleULTG = (item) => {
    setIsOpenULTG(!isOpenULTG)
    setULTGName(item)
    const index = ULTG.indexOf(item);
    const unitArray = ["Semua Gardu Induk", ...unit[index]];
    setDropdownDataGI(unitArray)
    setGIName("Semua Gardu Induk");
    console.log("ULTGSelected handle", item)
    setDipilihULTG(item)
    setUnitSelected("Semua Gardu Induk")
    if (index === 0) {
      setNodesView(nodes)
      // console.log(nodes)
    } else {
      const filterByULTG = nodes.filter(i => i.ULTG === item);
      setNodesView(filterByULTG)
      // console.log(filterByULTG)
    }



    // console.log(unitArray);
  };

  

  const onClickHandleGI = (item) => {
    console.log("unitSelected handle", dipilihULTG)
    //! tutup dropdown
    setIsOpen(false);
    setGIName(item);
    setUnitSelected(item)
  };

  const dropdownRefGI = useRef(null); // Referensi untuk dropdown
  const dropdownRefULTG = useRef(null); // Referensi untuk dropdown

  // Efek untuk menutup dropdown saat klik di luar atau klik kanan
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefGI.current &&
        !dropdownRefGI.current.contains(event.target)
      ) {
        setIsOpen(false); // Tutup dropdown
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
  }, [setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefULTG.current &&
        !dropdownRefULTG.current.contains(event.target)
      ) {
        setIsOpenULTG(false); // Tutup dropdown
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
  }, [setIsOpenULTG]);

  return (
    <div className="w-full h-full flex ">
      <div className="flex w-[30%] h-full place-content-center place-items-center">
        <div className="w-[80px] h-[80px] ml-[10px]">
          <img src={UserPNG} alt="" />
        </div>
        <div className="flex-1 flex-col text-textColor ml-[10px]">
          <p className="text-[20px] font-bold">Name</p>
          <p className="text-[16px]">ID</p>
          <p className="text-[16px]">Wilayah Kerja</p>
        </div>
      </div>
      <div className="flex-1 "></div>
      <div className="flex-col min-w-[300px] h-full pr-[10px]">
        <div className="flex w-full h-[50%] pb-[10px] pt-[10px]"></div>
        <div className="flex-1 relative" ref={dropdownRefULTG}>
          <button
            onClick={() => setIsOpenULTG(!isOpenULTG)}
            className="w-full flex justify-between items-center bg-textColor text-black  rounded-lg shadow-md"
          >
            <span className="px-4 py-[8px]">{ULTGName}</span>
            {isOpenULTG ? (
              <div className="bg-dropDownArrow h-[40px] w-[20px] justify-center items-center flex rounded-lg">
                <ChevronUp size={20} className="text-textColor" />
              </div>
            ) : (
              <div className="bg-dropDownArrow h-[40px] w-[20px] justify-center items-center flex rounded-lg">
                <ChevronDown size={20} className="text-textColor" />
              </div>
            )}
          </button>
          {/* Dropdown dengan posisi absolute & z-index tinggi */}
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isOpenULTG ? "auto" : 0,
              opacity: isOpenULTG ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-full z-50 w-full bg-textColor border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            {ULTG.map((item, index) => (
              <li
                key={index}
                className="px-4 py-[8px] hover:bg-gray-100 cursor-pointer"
                onClick={() => onClickHandleULTG(item)}
              >
                {item}
              </li>
            ))}
          </motion.ul>
          {/* </div> */}
        </div>
      </div>
      <div className="flex-col min-w-[300px] h-full pr-[10px]">
        <div className="flex w-full h-[50%] pb-[10px] pt-[10px]">
          <div className=" flex bg-textColor w-[60%] rounded-lg mr-[10px] items-center justify-center">
            <p className="text-[16px]"> {currentDate}</p>
          </div>
          <div className="flex bg-textColor w-[40%] rounded-lg place-content-center place-items-center">
            <p className="text-[16px]"> {currentTime}</p>
          </div>
        </div>
        <div className="flex-1 relative " ref={dropdownRefGI}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center bg-textColor text-black h-full rounded-lg shadow-md 0"
          >
            <span className="px-4 py-[8px]">{GIName}</span>
            {isOpen ? (
              <div className="bg-dropDownArrow h-[40px] w-[20px] justify-center items-center flex rounded-lg">
                <ChevronUp size={20} className="text-textColor" />
              </div>
            ) : (
              <div className="bg-dropDownArrow h-[40px] w-[20px] justify-center items-center flex rounded-lg">
                <ChevronDown size={20} className="text-textColor" />
              </div>
            )}
          </button>
          {/* Dropdown dengan posisi absolute & z-index tinggi */}
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-full z-50 w-full bg-textColor border border-gray-200 rounded-lg shadow-md 
             max-h-[300px] overflow-y-auto"
          >
            {dropdownDataGI.map((item, index) => (
              <li
                key={index}
                className="px-4 py-[8px] hover:bg-gray-100 cursor-pointer"
                onClick={() => onClickHandleGI(item)}
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
