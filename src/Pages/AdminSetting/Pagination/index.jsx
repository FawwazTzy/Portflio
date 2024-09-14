import { useEffect, useState } from "react";
import NextSVG from "../../../assets/next.svg";
import PreviewSVG from "../../../assets/preview.svg";
import { useZustandState } from "../../../store/state";

// eslint-disable-next-line react/prop-types
const Pagination = ({ maxPagination }) => {
  const { setPaginationSelected } = useZustandState((state) => state);
  const [paginationValue, setPaginationValue] = useState([]);

  useEffect(() => {
    let data;
    data = [];
    for (let i = 1; i <= maxPagination; i++) {
      data.push(i);
    }
    console.log("pagination ", data);

    setPaginationValue(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPagination]);

  const handlePagination = (value) => {
    setPaginationSelected(value);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        disabled
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <NextSVG />
      </button>
      <div className="flex items-center gap-1">
        {paginationValue.map((p, index) => (
          <button
            key={index}
            className="relative h-[24px] max-h-[24px] w-[24px] max-w-[24px] select-none rounded-lg bg-secondary text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => handlePagination(p)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-[10px]">
              {p}
            </span>
          </button>
        ))}

        {/* <button
          className="relative h-[24px] max-h-[24px] w-[24px] max-w-[24px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-[#363f4c] active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-[10px] ">
            2
          </span>
        </button>
        <button
          className="relative h-[24px] max-h-[24px] w-[24px] max-w-[24px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-[#363f4c] active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-[10px] ">
            3
          </span>
        </button>
        <button
          className="relative h-[24px] max-h-[24px] w-[24px] max-w-[24px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-[#363f4c] active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-[10px] ">
            4
          </span>
        </button>
        <button
          className="relative h-[24px] max-h-[24px] w-[24px] max-w-[24px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-[#363f4c] active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-[10px] ">
            ...
          </span>
        </button> */}
      </div>
      <button
        disabled
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <PreviewSVG />
      </button>
    </div>
  );
};

export default Pagination;
