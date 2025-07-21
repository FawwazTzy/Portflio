import { useEffect } from "react";
import { useZustandState } from "./store/state";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Pages/Login";
import Mainpage from "./Pages/MainPage";
import Status404 from "./Pages/404";
// import Pengguna from "./Pages/Pengguna";
// import Pengguna2 from "./Pages/Pengguna2";
// import Proyek from "./Pages/Proyek";

const App = () => {
  const setWindowSize = useZustandState((state) => state.setWindowSize);
  // Jangan gunakan ini kalau tidak perlu trigger render:
  // const initialWindowsSize = useZustandState((state) => state.initialWindowsSize);

  useEffect(() => {
    const handleResize = () => {
      const screen = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setWindowSize(screen);
      console.log("screen:", screen);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowSize]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage" element={<Mainpage />} />
        {/* <Route path="/pengguna" element={<Pengguna />} /> */}
        {/* <Route path="/pengguna2" element={<Pengguna2 />} /> */}
        {/* <Route path="/proyek" element={<Proyek />} /> */}
        <Route path="*" element={<Status404 />} />
      </Routes>
    </Router>
  );
};

export default App;
