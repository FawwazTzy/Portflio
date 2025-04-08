import { useRef, useEffect, useState, useCallback } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import MapMarkerRed from "../../../assets/mapMarker_red.png";
import MapMarkerGreen from "../../../assets/mapMarker_green.png";
import MapMarkerYellow from "../../../assets/mapMarker_yellow.png";
import MapMarkerGray from "../../../assets/mapMarker_gray.png";
import { useZustandState } from "../../../store/state";
// import { findDeviceFromSensorBox, findIndexById } from "../function";
import "./CircleWave.css";
import {
  updateMap,
  convertToDataChart,
  fetchNodeImageProduct,
} from "../function";

const mapboxToken =
  "pk.eyJ1IjoiemVyb2hhY2siLCJhIjoiY2t2MzR6NzYzOGUxcjJ2bnpydnYwM28yaSJ9._bUy8NIpXyzLkTELdT5qPA";

const MapComponent = () => {
  const {
    viewport,
    setViewport,
    currentZoom,
    setISensorImageVisible,
    dataSensor,
    setDataSensor,
    setSensorClicked,
    setDataChartXY,
    setMaxY_Axis,
    setMinY_Axis,
    setPhoto,
    setIsFetchImageProductReady,
    nodesView,
  } = useZustandState((state) => state);

  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(true);
  const [time, setTime] = useState(new Date());
  const mapRef = useRef(null);
  const handleMapLoad = () => {
    // console.log("data handle map " + map);
    if (mapRef.current) {
      mapRef.current.resize();
    }
    setGoogleMapsLoaded(true);

    // Perform any other tasks after the Google Maps library is loaded and ready.
  };

  const handleZoomIn = () => {
    // console.log("zoom in");
    // console.log(viewport);
    const updateMap = {
      longitude: viewport.longitude,
      latitude: viewport.latitude,
      zoom: viewport.zoom + 1,
    };

    // if (mapRef.current) {
    //   mapRef.current.resize();
    // }

    setViewport(updateMap);
  };

  const handleZoomOut = () => {
    // console.log("zoom out");
    // console.log(viewport.zoom);
    const updateMap = {
      longitude: viewport.longitude,
      latitude: viewport.latitude,
      zoom: viewport.zoom - 1,
    };
    setViewport(updateMap);
  };

  const onMove = useCallback(({ viewState }) => {
    const newCenter = {
      longitude: viewState.longitude,
      latitude: viewState.latitude,
      zoom: viewState.zoom,
    };

    setViewport(newCenter);
    // console.log(viewState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickMarkerHandle = async ({ device, index }) => {
    //! update position map dan zoom
    setViewport(updateMap(device));

    // //! Mengubah semua isClicked menjadi false
    // const tempDataSensor = dataSensor.map((item) => ({
    //   ...item,
    //   isClicked: false,
    // }));
    // //! update flag isClicked
    // tempDataSensor[index].isClicked = true;
    // setDataSensor(tempDataSensor);
    // //! update flag ke variable backup ketika fetch data server
    // setSensorClicked(tempDataSensor[index]);
    // // console.log(tempDataSensor[index]);
    // //! flag untuk menampilkan sensor image
    // setISensorImageVisible(true);
    // //! get data chart
    // const d = convertToDataChart(
    //   dataSensor[index].Date_time,
    //   dataSensor[index].Pressure
    // );
    // setDataChartXY(d[0]);
    // setMaxY_Axis(d[1]);
    // setMinY_Axis(d[2]);




  };

  useEffect(() => {
    const update = () => {
      setTime(new Date());
      if (mapRef.current) {
        mapRef.current.resize();
      }
    };

    const intervalId = setTimeout(update, 500);
    //   //! Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    // <div className=" flex w-full h-full bg-red-500">
    <div className="w-full h-full">
      {googleMapsLoaded ? (
        <ReactMapGL
          {...viewport}
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/zerohack/ckxk54u6d22p315le1o00q03r"
          // mapStyle="mapbox://styles/zerohack/ckytsd4jm000a15quoewi5nns"
          mapboxAccessToken={mapboxToken}
          // onViewportChange={(viewport) => setViewport(viewport)}
          onMove={onMove}
          onLoad={() => handleMapLoad}
        >
          {nodesView.length >= 1 &&
            nodesView.map((device, index) => (
              <Marker
                key={index}
                latitude={device.gps_lat}
                longitude={device.gps_long}
                anchor="bottom"
              >
                <div className="flex flex-col w-[48px] items-center relative ">
                  <div className="w-full flex-1 flex justify-center">
                    {currentZoom > 10 && (
                      <p className="text-[10px] text-textColor truncate">
                        {device.nodeName}
                      </p>
                    )}
                  </div>
                  <div
                    className=" flex w-[24px] h-[24px] cursor-pointer  "
                    onClick={() => onClickMarkerHandle({ device, index })}
                  >
                    <img
                      src={
                        device.statusCam === "on" &&
                          device.statusGauge === "aman"
                          ? MapMarkerGreen
                          : device.statusCam === "on" &&
                            device.statusGauge === "waspada"
                            ? MapMarkerYellow
                            : device.statusCam === "on" &&
                              device.statusGauge === "bahaya"
                              ? MapMarkerRed
                              : MapMarkerGray
                      }
                      alt={`Marker x`}
                      className="w-8 h-8"
                    />
                  </div>
                  {device.isClicked && (
                    <div>
                      <div
                        style={{
                          bottom: currentZoom > 10 ? "-18px" : "-18px",
                        }}
                        className="absolute  left-[12px] w-[24px] h-[24px] bg-textColor rounded-full -z-10 ripple"
                      ></div>
                      <div
                        style={{
                          bottom: currentZoom > 10 ? "-18px" : "-18px",
                        }}
                        className="absolute  left-[12px] w-[24px] h-[24px] bg-textColor rounded-full -z-10 ripple delay-200"
                      ></div>
                      <div
                        style={{
                          bottom: currentZoom > 10 ? "-18px" : "-18px",
                        }}
                        className="absolute  left-[12px] w-[24px] h-[24px] bg-textColor rounded-full -z-10 ripple delay-400"
                      ></div>
                    </div>
                  )}
                </div>
                {/* <div className="bg-red-500 w-[50px] h-[50px]"></div> */}
              </Marker>
            ))}
        </ReactMapGL>
      ) : (
        <div className="w-full h-full bg-primary flex items-center justify-center">
          <p className="text-textColor">...Loading Maps</p>
        </div>
      )}
      {/* <div style={{ top: "150px" }} className="absolute right-[220px] z-40">
        <div className="w-[25px] h-[60px] flex flex-col space-y-2 ">
          <button
            className="w-full h-[20px] bg-secondary text-textColor text-[10px] rounded flex items-center justify-center"
            onClick={() => handleZoomIn()}
          >
            +
          </button>
          <button
            className="w-full h-[20px] bg-secondary text-textColor text-[10px] rounded flex items-center justify-center"
            onClick={() => handleZoomOut()}
          >
            -
          </button>
        </div>
      </div> */}
    </div>
    // </div>
  );
};

export default MapComponent;
