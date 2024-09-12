import { useRef, useEffect, useState } from "react";
import CircleSVG from "../../../src/assets/circle.svg";
import SegitigaSVG from "../../../src/assets/segitiga.svg";
import IconAddUserSVG from "../../../src/assets/Icon_add_user.svg";
import Avatar_face from "../../../src/assets/avatar_face.png";
import Header from "../AdminSetting/Header";
import Menu from "../Dashboard/Menu";
import { useZustandState } from "../../store/state";
import { addAdmin } from "./function";
import { useNavigate } from "react-router-dom";
import { cekCookie, cekTokenAdmin, fetchProfile } from "../../globalFunction";

const AddAdmin = () => {
  const navigate = useNavigate();
  const { windowSize, isMenuActive, setIsMenuActive } = useZustandState(
    (state) => state
  );

  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [imageBase64, setImageBase64] = useState("");
  const [localStorageUserToken, setLocalStorageUserToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [unit, setUnit] = useState("");
  const [note, setNote] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState(false);
  const [isNotifikasiVisible, setIsNotifikasiVisible] = useState(false);
  const [isRegistarsiSuccess, setIsRegistarsiSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userProfile, setUserProfile] = useState({
    username: "-",
    id: "-",
    email: "-",
    phone: "-",
    unit: "-",
    nodes_id: [],
  });

  useEffect(() => {
    console.log("width ", windowSize.width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const handleDivClick = () => {
    fileInputRef.current.click(); // Buka file manager saat div ditekan
  };

  const MessageNotification = (value, isSuccess) => {
    setErrorMessage(value);
    setIsRegistarsiSuccess(isSuccess);
    setIsNotifikasiVisible(true);
    setTimeout(() => {
      setIsNotifikasiVisible(false);
    }, 2000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; // Tambahkan tanda tanya untuk memastikan files ada
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!validImageTypes.includes(fileType)) {
        setError("Only .jpg, .jpeg, and .png formats are allowed.");
        setImageSrc(null);
        setImageBase64("");
        return;
      }

      if (file.size > maxSize) {
        setError("File size must be less than 2MB.");
        setImageSrc(null);
        setImageBase64("");
      } else {
        setError("");
        setImageSrc(null);
        setImageBase64("");
      }

      const reader = new FileReader();
      // console.log("reader ", reader);
      reader.onload = () => {
        setImageSrc(reader.result);
        setImageBase64(reader.result.split(",")[1]); // Ambil bagian Base64
        setError("");
      };
      reader.readAsDataURL(file);
    } else {
      setError("No file selected.");
    }
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSave = async () => {
    console.log("Save");
    console.log("username ", username);
    console.log("password ", password);
    console.log("email ", email);
    console.log("unit ", unit);
    console.log("confirm ", confirmPassword);
    console.log("note ", note);
    // console.log("imageBase64 ", imageBase64);

    const phone = "";
    let image = "";

    if (imageSrc) {
      image = imageSrc;
      // console.log("image ", image);
    }
    if (password !== confirmPassword) {
      MessageNotification("Password yang anda masukan tidak match", false);
      setIsRegistarsiSuccess(false);
      setIsNotifikasiVisible(true);
      setTimeout(() => {
        setIsNotifikasiVisible(false);
      }, 2000);
    } else {
      try {
        const res = await addAdmin(
          username,
          password,
          email,
          phone,
          unit,
          note,
          image
        );
        console.log("status ", res);

        if (res.status == 200) {
          if (res.data.success === true) {
            MessageNotification("Registrasi Berhasil dilakukan", true);
            navigate(-1);
          } else {
            const code = res.data.message;
            if (code === "0E001") {
              MessageNotification(
                "Username yang anda masukan sudah terdaftar/tidak sesuai",
                false
              );
            } else if (code === "0E002") {
              MessageNotification(
                "Email yang anda masukan sudah terdaftar/tidak sesuai",
                false
              );
            } else if (code === "0E003") {
              MessageNotification(
                "No handphone yang anda masukan sudah terdaftar/tidak sesuai",
                false
              );
            } else if (code === "0E004") {
              MessageNotification(
                "Username, email dan No Handphone yang anda masukan sudah terdaftar/tidak sesuai",
                false
              );
            } else if (code === "0E005") {
              MessageNotification(
                "Password yang anda masukan sudah terdaftar/tidak sesuai",
                false
              );
            } else if (code === "0E006") {
              MessageNotification(
                "Email yang anda masukan sudah terdaftar/tidak sesuai",
                false
              );
            } else {
              MessageNotification("Registrasi Gagal dilakukan - 0", false);
            }
          }
        } else {
          MessageNotification("Registrasi Gagal dilakukan1", false);
        }
      } catch (error) {
        console.error("Registrasi gagal", error);
        MessageNotification("Registrasi Gagal dilakukan2", false);
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

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

    getDataProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Relative flex flex-col h-screen w-screen">
      <div className="absolute z-10 top-0 left-0 w-screen">
        <Header setIsMenuActive={setIsMenuActive} />
      </div>
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
      {isNotifikasiVisible && (
        <div className="fixed z-50 top-0 left-0 w-full flex justify-center">
          <div
            className={`${
              isRegistarsiSuccess ? "bg-green-500" : "bg-red-500"
            }  text-white text-center p-4 rounded-lg shadow-lg m-4`}
          >
            {errorMessage}
          </div>
        </div>
      )}

      <div className="relative bg-secondary w-screen h-[250px] min-w-[1000px]">
        <CircleSVG className="absolute bottom-0 left-0" />
        <SegitigaSVG className="absolute top-0 right-0 h-[125px]" />
        <SegitigaSVG className="absolute top-0 right-[125px] h-[125px]" />
        <SegitigaSVG className="absolute bottom-0 right-0 h-[125px]" />
        <SegitigaSVG className="absolute bottom-0 right-[125px] h-[125px]" />
      </div>
      <div className="relative bg-primary w-full h-full flex-1 min-w-[1000px]"></div>

      <div className="absolute top-[35px] left-[75px] flex items-center">
        <div className="mr-[5px] ">
          <IconAddUserSVG />
        </div>
        <p className="text-[16px] text-white font-bold">Add Admin</p>
      </div>
      <div
        className="absolute flex flex-col bg-third top-[65px] left-[75px] min-w-[900px] min-h-[450px] h-[250px] border border-secondary "
        style={{
          width: `calc(${windowSize.width}px - 75px - 75px)`,
          height: `calc(${windowSize.height}px - 50px - 50px)`,
        }}
      >
        <div className="flex-1 px-[75px]">
          <div className="flex justify-around ">
            <div className="w-[250px] flex items-end justify-start mt-[35px] ">
              {/* <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              > */}
              <div
                className="Relative cursor-pointer w-[80px] h-[80px] rounded-full overflow-hidden border-white border-2"
                onClick={handleDivClick}
              >
                <img
                  src={imageSrc ? imageSrc : Avatar_face}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              {error && (
                <div className="pl-[10px]">
                  <p className="text-red-500 text-[10px]">{error}</p>
                </div>
              )}
            </div>

            <div className=" w-[250px]"></div>
          </div>
          <div className="flex justify-around">
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">Username</label>
              <input
                type="text"
                className="mb-4 block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter your username"
                id="add_username"
                name="add_username"
                // value={data.username}
                onChange={handleChangeUsername}
              />
            </div>
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">Password</label>
              <input
                type="text"
                className="block w-full rounded border-0  py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter your password"
                id="add_password"
                name="add_password"
                // value={data.password}
                onChange={handleChangePassword}
              />
            </div>
          </div>
          <div className="flex justify-around">
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">Email</label>
              <input
                type="text"
                className=" block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
                name="add_email"
                // value={data.username}
                onChange={handleChangeEmail}
              />
            </div>
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">
                Confirm Password
              </label>
              <input
                type="text"
                className="block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter your confirm password"
                name="add_password_2"
                // value={data.password}
                onChange={handleChangeConfirmPassword}
              />
            </div>
          </div>
          <div className="flex justify-around">
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">Unit</label>
              <input
                type="text"
                className="mb-4 block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter your unit"
                name="add_unit"
                // value={data.username}
                onChange={handleChangeUnit}
              />
            </div>
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">Note</label>
              <textarea
                type="text"
                className="block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter a note..."
                name="add_password"
                rows="3"
                // value={data.password}
                onChange={handleChangeNote}
              />
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full bg-[#686871]"></div>
        <div className=" h-[75px] items-center flex justify-end px-[75px]">
          <button
            className="bg-[#686871] w-[100px] h-[35px] rounded-md text-white"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-[#686871] w-[100px] h-[35px] rounded-md text-white ml-[25px]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
