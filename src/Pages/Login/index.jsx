import { useEffect, useState } from "react";
import LoginBackground from "../../assets/login_background.png";
import LoginBrand from "../../assets/logo_brand.png";
import LoginBrandCircle from "../../assets/logo_brand_cricle.png";
import { FormLogin } from "./Form";
import FullscreenSpinner from "../../components/FullscreenSpinner";
import { useZustandState } from "../../store/state";
import { useZustandStateLogin } from "../../store/stateLogin";

const Login = () => {
  const { windowSize } = useZustandState((state) => state);
  const { loading } = useZustandStateLogin((state) => state);
  const [responsiveHeightScreen, setResponsiveHeightScreen] = useState("100%");
  const [responsiveWidthScreen, setResponsiveWidthScreen] = useState("100%");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (windowSize.height < 650) {
      setResponsiveHeightScreen("680px");
      console.log("680px");
    } else {
      setResponsiveHeightScreen(`${windowSize.height}px`);
    }

    if (windowSize.width < 1260) {
      setResponsiveWidthScreen(`1260px`);
    } else {
      setResponsiveWidthScreen(`${windowSize.width}px`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 100); // 100ms

    return () => clearTimeout(timeout); // cleanup jika unmount
  }, []);

  return (
    <div>
      {showContent && (
        <div
          style={{
            height: responsiveHeightScreen,
            width: responsiveWidthScreen,
          }}
          className={`flex fixed `}
        >
          {loading && <FullscreenSpinner />}
          <div className="flex-1">
            <FormLogin heightScreen={responsiveHeightScreen} />
          </div>
          <div className="relative flex w-[70%] h-full overflow-hidden">
            <img src={LoginBackground} alt="" />
            <div className="absolute z-50 top-[80px] left-[80px] ">
              <img src={LoginBrand} alt="" />
            </div>
            <div className="absolute z-50 bottom-[-200px] right-[-200px]">
              <img src={LoginBrandCircle} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
