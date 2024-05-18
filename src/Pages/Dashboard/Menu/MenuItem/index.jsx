import {} from "react";

// eslint-disable-next-line react/prop-types
const MenuItem = ({ textColor, iconColor, title, Icon }) => {
  return (
    <div className="w-full h-[24px] items-center flex group mt-[30px]">
      <div className="flex items-center w-[50px]">
        {/* <img src={iconSRC} alt="" /> */}
        <div className={`${iconColor} group-hover:stroke-secondary`}>
          {Icon}
        </div>
      </div>
      <div
        className={`${textColor} flex flex-1  group-hover:text-secondary text-[12px]`}
      >
        <p>{title}</p>
      </div>
    </div>
  );
};

export default MenuItem;
