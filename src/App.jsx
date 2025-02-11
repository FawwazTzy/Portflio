import { useEffect } from "react";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Status404 from "./Pages/404";
// import "mapbox-gl/dist/mapbox-gl.css";
import { useZustandState } from "./store/state";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

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
  // return <Dashboard />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/map" />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/dashboard" element={<Login />} /> */}
        <Route path="/map" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/setting/admin" element={<AdminSetting />} /> */}
        {/* <Route path="/setting/admin/add" element={<AddAdmin />} /> */}
        {/* <Route path="/setting/user" element={<UserSetting />} /> */}
        {/* <Route path="/setting/user/add" element={<AddUser />} /> */}
        {/* <Route path="/setting/user/add/sensor/:id" element={<AddSensor />} /> */}
        {/* <Route path="/setting/user/detail" element={<UserDetail />} /> */}
        {/* <Route path="/analytics" element={<Dashboard />} /> */}
        {/* <Route path="/setting/sensor" element={<Dashboard />} /> */}

        <Route path="/error" element={<Status404 />} />
        {/* Catch all unmatched routes and redirect to /error */}
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Router>
  );
};

export default App;
