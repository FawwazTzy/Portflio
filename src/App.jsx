import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import "mapbox-gl/dist/mapbox-gl.css";
import { useZustandState } from "./store/state";

const App = () => {
  const { setWindowSize, initialWindowsSize } = useZustandState(
    (state) => state
  );
  useEffect(() => {
    function handleResize() {
      const screen = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setWindowSize(screen);
      console.log("screen");
      console.log(screen);
      console.log("initialWindowsSize");
      console.log(initialWindowsSize);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return <Dashboard />;
};

export default App;
