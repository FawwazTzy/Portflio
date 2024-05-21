import { useState, useCallback } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import MapPinBluePNG from "../../../assets/map_pin_blue.png";
import { useZustandState } from "../../../store/state";
import { findDeviceFromSensorBox, findIndexById } from "../function";
import Loading from "../../../components/Loading";
import "./CircleWave.css";

const mapboxToken =
  "pk.eyJ1IjoiemVyb2hhY2siLCJhIjoiY2t2MzR6NzYzOGUxcjJ2bnpydnYwM28yaSJ9._bUy8NIpXyzLkTELdT5qPA";

// eslint-disable-next-line react/prop-types
const MapComponent = ({ topNavigator }) => {
  const {
    viewport,
    setViewport,
    currentZoom,
    devices,
    setDevices,
    setIsDetailBoxShow,
    sensorBox,
    setDeviceDetail,
    setMarkerIndex,
    markerIndex,
  } = useZustandState((state) => state);

  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(true);

  const handleMapLoad = () => {
    // console.log("data handle map " + map);
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

  const onClickMarkerHandle = async (device) => {
    console.log(device);

    let long = 0.0;
    let lat = 0.0;

    long = parseFloat(device.long);
    lat = parseFloat(device.lat);

    const updateMap = {
      longitude: long + 0.015111111, //kanan kiri
      latitude: lat - 0.010111111, //atas bawah
      zoom: 14,
    };

    const temp = await findDeviceFromSensorBox(
      sensorBox,
      device.idGateway,
      device.idNode
    );

    //! data device lama isclicked di buat false semua
    if (markerIndex != -1) {
      devices[markerIndex].isClicked = false;
    }

    //! update data devices dengan isclicked baru
    const index = findIndexById(devices, device._id);
    devices[index].isClicked = true;
    const devicesUpdate = devices;
    setDevices(devicesUpdate);

    setDeviceDetail(temp);
    setViewport(updateMap);
    setIsDetailBoxShow(true);
    setMarkerIndex(index);
    console.log("index update ketika marker ditekan");
    console.log(index);

    console.log("deviceDetail");
    console.log(temp);
    console.log(index);
  };

  return (
    <div className="flex w-full h-full">
      {googleMapsLoaded ? (
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/zerohack/clvkahf6u006x01pcbjhm5ry9"
          // mapStyle="mapbox://styles/zerohack/ckytsd4jm000a15quoewi5nns"
          mapboxAccessToken={mapboxToken}
          // onViewportChange={(viewport) => setViewport(viewport)}
          onMove={onMove}
          onLoad={() => handleMapLoad}
        >
          {devices.length >= 1 &&
            devices.map((device) => (
              <Marker
                key={device._id}
                latitude={device.lat}
                longitude={device.long}
                anchor="bottom"
              >
                <div className="flex flex-col w-[48px] items-center relative ">
                  <div className="w-full flex-1 flex justify-center">
                    {currentZoom > 10 && (
                      <p className="text-[10px] text-white truncate">
                        {device.nameNode}
                      </p>
                    )}
                  </div>
                  <div
                    className=" flex w-[24px] h-[24px] cursor-pointer  "
                    onClick={() => onClickMarkerHandle(device)}
                  >
                    <img
                      src={MapPinBluePNG}
                      alt={`Marker x`}
                      className="w-8 h-8"
                    />
                  </div>
                  {device.isClicked && (
                    <div>
                      <div
                        style={{ bottom: currentZoom > 10 ? "-18px" : "-18px" }}
                        className="absolute  left-[12px] w-[24px] h-[24px] bg-green-500 rounded-full -z-10 ripple"
                      ></div>
                      <div
                        style={{ bottom: currentZoom > 10 ? "-18px" : "-18px" }}
                        className="absolute  left-[12px] w-[24px] h-[24px] bg-green-500 rounded-full -z-10 ripple delay-200"
                      ></div>
                      <div
                        style={{ bottom: currentZoom > 10 ? "-18px" : "-18px" }}
                        className="absolute  left-[12px] w-[24px] h-[24px] bg-green-500 rounded-full -z-10 ripple delay-400"
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
          <p className="text-white">...Loading Maps</p>
        </div>
      )}
      <div
        style={{ top: topNavigator }}
        className="absolute right-[320px] z-10"
      >
        <div className="w-[25px] h-[60px] flex flex-col space-y-2 ">
          <button
            className="w-full h-[20px] bg-secondary text-white text-[10px] rounded flex items-center justify-center"
            onClick={() => handleZoomIn()}
          >
            +
          </button>
          <button
            className="w-full h-[20px] bg-secondary text-white text-[10px] rounded flex items-center justify-center"
            onClick={() => handleZoomOut()}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
