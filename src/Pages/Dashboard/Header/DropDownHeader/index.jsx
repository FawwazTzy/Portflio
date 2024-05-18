import { useState } from "react";
import { useZustandState } from "../../../../store/state";

const DropDownHeader = () => {
  const { dashboardFilter, setDashboardFilter } = useZustandState(
    (state) => state
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropDownValue = [
    {
      key: "1",
      title: "Show all sensors",
    },
    {
      key: "2",
      title: "Show updated sensor",
    },
  ];

  const onClickHandle = (value) => {
    setDashboardFilter(value);
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="w-[200px] h-[30px] items-center justify-between inline-flex rounded bg-secondary px-3 py-2  "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-xs  text-white">{dashboardFilter}</p>
          <svg
            className="-mr-1 h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1 px-2">
            {dropDownValue.map((data) => (
              <button
                key={data.key}
                className="text-white text-xs"
                onClick={() => onClickHandle(data.title)}
              >
                {data.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownHeader;
