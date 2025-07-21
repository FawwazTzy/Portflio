import React, { useState } from "react";
import googleicon from '../../../assets/google.png';
import facebookicon from '../../../assets/facebook.png';

const CustomPasswordInput = ({ onChange }) => {
  const [realPassword, setRealPassword] = useState("");
  const [maskedPassword, setMaskedPassword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    let updatedRealPassword;
    if (value.length >= maskedPassword.length) {
      const newChar = value[value.length - 1];
      updatedRealPassword = realPassword + newChar;
    } else {
      updatedRealPassword = realPassword.slice(0, value.length);
    }

    setRealPassword(updatedRealPassword);
    setMaskedPassword("*".repeat(value.length));
    onChange(updatedRealPassword);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={maskedPassword}
        onChange={handleChange}
        className="w-full bg-transparent outline-none p-2 text-white"
      />
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#B0F952] via-white to-[#B0F952]" />
    </div>
  );
};

const Sideleft = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-screen bg-[#253c44] flex flex-col px-8 shadow-md pt-16">
      <div className="flex flex-col justify-between h-full">
        {/* Konten atas */}
        <div>
          <h2 className="text-3xl font-bold mb-10 text-[#E3ECE9] text-center">
            Selamat Datang
          </h2>

          <div className="mb-6 w-full">
            <label className="block text-[#E3ECE9] font-medium mb-2">
              Nama Pengguna
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent outline-none p-2 text-white"
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#B0F952] via-white to-[#B0F952]" />
            </div>
          </div>

          <div className="mb-6 w-full">
            <label className="block text-[#E3ECE9] font-medium mb-2">
              Kata Sandi
            </label>
            <CustomPasswordInput onChange={(val) => setPassword(val)} />
          </div>

          <button
            onClick
            className="bg-[#B0F952] mt-3 text-[#253c44] font-bold py-2 px-4 rounded w-full"
          >
            Masuk
          </button>
        </div>

        {/* Logo dan Footer */}
        <div className="flex flex-col items-center gap-2 mt-10 mb-2">
          <button
            onClick
            className="flex bg-[#a6bc95] mt-2 w-[230px] items-center text-sm gap-2 rounded-md px-12 py-1"
          >
            <img
              src={googleicon}
              alt="google"
              className="w-5 h-5 object-cover"
            />
            Login with Google
          </button>
          <button className="flex bg-[#a6bc95] w-[230px] items-center text-sm gap-2 rounded-md px-12 py-1">
            <img
              src={facebookicon}
              alt="facebook"
              className="w-5 h-5 object-cover"
            />
            Login with Facebook
          </button>
          <footer className="text-center">
            <p className="text-[#a6bc95] text-xs">@All Rights Deserved</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Sideleft;
