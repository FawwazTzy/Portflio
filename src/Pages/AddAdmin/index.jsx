import { useRef, useEffect, useState } from "react";
import CircleSVG from "../../../src/assets/circle.svg";
import SegitigaSVG from "../../../src/assets/segitiga.svg";
import IconAddUserSVG from "../../../src/assets/Icon_add_user.svg";
import Avatar_face from "../../../src/assets/avatar_face.png";
import Header from "../AdminSetting/Header";
import Menu from "../Dashboard/Menu";
import { useZustandState } from "../../store/state";

const AddAdmin = () => {
  const { windowSize, isMenuActive, setIsMenuActive, setDataUsers, dataUsers } =
    useZustandState((state) => state);

  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    console.log("width ", windowSize.width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const handleDivClick = () => {
    fileInputRef.current.click(); // Buka file manager saat div ditekan
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

  const handleSave = async () => {
    if (!imageBase64) {
      setError("No image selected to upload.");
      return;
    }

    try {
      const response = await fetch("https://your-server-url.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageBase64,
        }),
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
      } else {
        console.log("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="absolute top-0 left-0 w-screen">
        <Header setIsMenuActive={setIsMenuActive} />
      </div>

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
            <div className="w-[250px] flex items-end justify-start mt-[10px]">
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
              {error && <p className="text-red-500 mt-2">{error}</p>}
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
                // onChange={handleChange}
              />
            </div>
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">Password</label>
              <input
                type="password"
                className="block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter your password"
                id="add_password"
                name="add_password"
                // value={data.password}
                // onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-around">
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">Email</label>
              <input
                type="text"
                className="mb-4 block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
                name="add_email"
                // value={data.username}
                // onChange={handleChange}
              />
            </div>
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">
                Confirm Password
              </label>
              <input
                type="password"
                className="block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter your confirm password"
                name="add_password_2"
                // value={data.password}
                // onChange={handleChange}
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
                // onChange={handleChange}
              />
            </div>
            <div className=" w-[250px]">
              <label className=" text-white text-sm  leading-6">Note</label>
              <textarea
                type="text"
                className="block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                placeholder="Enter a note..."
                name="add_password"
                rows="4"
                // value={data.password}
                // onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full bg-[#686871]"></div>
        <div className=" h-[75px] items-center flex justify-end px-[75px]">
          <button className="bg-[#686871] w-[100px] h-[35px] rounded-md text-white">
            Save
          </button>
          <button className="bg-[#686871] w-[100px] h-[35px] rounded-md text-white ml-[25px]">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
