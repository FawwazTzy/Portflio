import { useState } from "react";
import carPng from "../../assets/Logo_PLN.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useZustandState } from "../../store/state";
import { useNavigate } from "react-router-dom";

import { generateKey } from "../../globalFunction";

const Login = () => {
  const navigate = useNavigate();
  const { setAdminToken } = useZustandState((state) => state);

  // const [response, setResponse] = useState(null);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [isLoginSuccess, setIsLoginSuccess] = useState(true);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:1945/api/1/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        // setResponse(res.data);
        if (res.status === 200) {
          //! login sukses
          const authToken = res.data.authorization;
          if (authToken) {
            //! extraxt authToken
            const decodedToken = jwtDecode(authToken);
            console.log("Decoded JWT:", decodedToken);
            if (decodedToken.user === false && decodedToken.role === "admin") {
              //! jika role admin maka save data ke local storage
              const token = "fr45st-hghjkl-snhb87";
              const user = {
                id: 1,
                user: false,
                role: "admin",
                token: token,
              };
              setAdminToken(token);
              // Konversi objek ke string dan simpan di Local Storage
              localStorage.setItem("user", JSON.stringify(user));
            } else {
              const token = generateKey();
              const user = {
                id: 1,
                user: true,
                role: "user",
                token: token,
              };
              // Konversi objek ke string dan simpan di Local Storage
              localStorage.setItem("user", JSON.stringify(user));
            }

            navigate("/dashboard", { replace: true }); // Menggunakan replace agar tidak bisa kembali ke login
          } else {
            console.log("FE, gagal login");
            setIsLoginSuccess(false);
          }
        }
      })
      .catch(() => {
        console.error("fatal error");
      });
  };

  return (
    <div className="w-screen h-screen bg-[#15202f] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className=" box-border bg-[#1e1e2b] h-[370px] w-[300px] px-6 py-10 border rounded-lg border-[#4b4b55] flex flex-col  items-center ">
          <div className="flex flex-col items-center justify-center">
            <img src={carPng} alt="" className="w-10 h-10" />
            <p className="text-white text-sm font-bold">VENOM PLN</p>
            <p className="text-white text-[10px]">
              Verticality Online Monitoring
            </p>
          </div>

          <div className=" w-full">
            <label className=" text-white text-sm  leading-6">Username</label>
            <label className=" text-red-800 text-sm  leading-6">*</label>
            <input
              type="text"
              className="mb-4 block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
              placeholder="Enter your username"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div className=" w-full">
            <label className=" text-white text-sm  leading-6">Password</label>
            <label className=" text-red-800 text-sm  leading-6">*</label>
            <input
              type="password"
              className="block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
              placeholder="Enter your password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full h-[15px]">
            <p className="mt-[10px] text-red-500 text-[10px]">
              {!isLoginSuccess ? "username atau password salah" : ""}
            </p>
          </div>
          <button
            type="submit"
            className="bg-secondary text-white py-2 px-4 text-sm rounded mt-5 w-full"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
