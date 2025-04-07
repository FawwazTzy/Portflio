/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useZustandStateLogin } from "../../../store/stateLogin";

export const FormLogin = ({ heightScreen }) => {
  const navigate = useNavigate();
  const { setLoading } = useZustandStateLogin((state) => state);

  const [showPassword, setShowPassword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onClickHandleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/login`,
        // `/api/v1/login`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setLoading(false);
        navigate("/map", { replace: true });
      }
    } catch (error) {
      console.error("Error login", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: heightScreen,
      }}
      className="flex flex-col w-full  bg-[#00975c] p-[50px]"
    >
      <div className="flex h-[75px] w-full text-textColor justify-center items-center text-[36px] ">
        <p>Selamat datang</p>
      </div>
      <div className="flex flex-col h-[500px] w-full  items-center justify-center">
        <div className="flex w-full h-[35px] justify-start items-center text-textColor text-[18px]">
          <p>Nama Pengguna</p>
        </div>
        <div className="flex w-full h-[35px] font-bold text-textColor text-[18px] items-center">
          <input
            className="w-full h-full ring-primary outline-none bg-primary"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-full h-[2px] bg-gradient-to-r from-primary via-white to-primary mb-[50px]"></div>
        <div className="flex w-full h-[35px] justify-start items-center text-textColor text-[18px]">
          <p>Kata Sandi</p>
        </div>
        <div className="relative flex w-full h-[35px] font-bold text-textColor text-[18px] items-center">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full h-full ring-primary outline-none bg-primary"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-textColor"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="w-full h-[2px] bg-gradient-to-r from-primary via-white to-primary mb-[50px]"></div>
        <button
          className="w-full h-[50px] bg-textColor font-bold rounded-xl mb-[50px"
          onClick={() => onClickHandleLogin(username, password)}
        >
          Masuk
        </button>
      </div>
      <div className={`relative flex-1 h-full w-full `}>
        <div className="absolute flex-col w-full h-[80px]  bottom-0 left-0 content-end">
          <div className="h-[50px] w-full flex  justify-center">
            <div className="w-[50px] h-full bg-red-500 mr-[10px]"></div>
            <div className="w-[50px] h-full bg-blue-500"></div>
          </div>
          <div className="flex  justify-center items-center text-[10px] text-white mt-[10px]">
            <p>all right reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};
