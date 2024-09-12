import {} from "react";
import DeleteSVG from "../../../assets/delete.svg";
import { fetchDeleteAdmin } from "../function";
import { useZustandState } from "../../../store/state";

// eslint-disable-next-line react/prop-types
const TableValue = ({ no, username, email, phone, unit, action, id }) => {
  const { setIsPopDeleteVisible } = useZustandState((state) => state);

  const handleDelete = async (id) => {
    const data = {
      status: true,
      message: {
        id: id,
        username: username,
      },
    };
    setIsPopDeleteVisible(data);
    // console.log("handle ", id);
    // const res = await fetchDeleteAdmin(id);
    // console.log(res);
    // if (res.status == 200) {
    //   const message = res.data.message;
    //   if (message.status) {
    //     const data = {
    //       status: true,
    //       message : "Berhasil "
    //     }
    //   }
    // }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="grid grid-cols-6 h-[36px] text-[10px] w-full bg-third">
        <div className="flex justify-center items-center   ">
          <p className="text-white ">{no}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{username}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{email}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{phone}</p>
        </div>
        <div className="flex justify-center items-center  ">
          <p className="text-white ">{unit}</p>
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => handleDelete(id)}
        >
          {!action && <DeleteSVG />}
        </div>
      </div>
      <div className="w-full h-[1px] bg-[rgba(150,84,244,0.4)]"></div>
    </div>
  );
};

export default TableValue;
