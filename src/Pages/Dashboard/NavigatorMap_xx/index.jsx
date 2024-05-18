import {} from "react";
// import useStore from "../../../store/state";

const NavigatorMap = () => {
  // const { zoomOut, zoomIn } = useStore((state) => state);

  // const zoomInHandler = () => {

  // }
  // const zoomOutHandler = () => {};

  return (
    <div className="w-[30px] h-[60px] flex flex-col space-y-2">
      <button
        className="w-full h-20px bg-secondary text-white rounded"
        // onClick={() => zoomIn}
      >
        +
      </button>
      <button
        className="w-full h-20px bg-secondary text-white rounded"
        // onClick={() => zoomOut}
      >
        -
      </button>
    </div>
  );
};

export default NavigatorMap;
