import React from "react";
import carPng from "../../assets/car.png";

const Login = () => {
  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center">
      <div className=" box-border h-[400px] w-[300px] p-4 border rounded flex flex-col  items-center ">
        <div className="flex flex-col items-center justify-center">
          <img src={carPng} alt="" className="w-20 h-20" />
          <p className="text-white text-xl">VENOM PLN</p>
          <p className="text-white text-xs">Verticality Online Monitoring</p>
        </div>

        <div className=" w-full">
          <label className=" text-white text-xs font-medium leading-6">
            Username
          </label>
          <input
            type="text"
            className="block w-full rounded border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
          />
        </div>

        <div className=" w-full">
          <label className=" text-white text-xs font-medium leading-6">
            Password
          </label>
          <input
            type="text"
            className="block w-full rounded border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
          />
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-10 w-full">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
