import { useState, useCallback } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import MapPinBluePNG from "../../../assets/map_pin_blue.png";
import { useZustandState } from "../../../store/state";
import { findDeviceFromSensorBox } from "../function";

const mapboxToken =
  "pk.eyJ1IjoiemVyb2hhY2siLCJhIjoiY2t2MzR6NzYzOGUxcjJ2bnpydnYwM28yaSJ9._bUy8NIpXyzLkTELdT5qPA";

// eslint-disable-next-line react/prop-types
const MapComponent = ({ topNavigator }) => {
  const {
    viewport,
    setViewport,
    currentZoom,
    devices,
    setIsDetailBoxShow,
    sensorBox,
    setDeviceDetail,
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
    // console.log(device.long);

    const updateMap = {
      longitude: device.long, // + 0.48,
      latitude: device.lat, // + 0.97,
      zoom: 14,
    };

    const temp = await findDeviceFromSensorBox(
      sensorBox,
      device.idGateway,
      device.idNode
    );
    setDeviceDetail(temp);
    setViewport(updateMap);
    setIsDetailBoxShow(true);

    console.log("deviceDetail");
    console.log(temp);
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
                <div className="flex flex-col w-[50px]  justify-center items-center">
                  <div>
                    {currentZoom > 10 && (
                      <p className="text-[10px] text-white truncate">
                        {device.nameNode}
                      </p>
                    )}
                  </div>
                  <div
                    className=" w-[25px] h-[35px] cursor-pointer"
                    onClick={() => onClickMarkerHandle(device)}
                  >
                    <img
                      src={MapPinBluePNG}
                      alt={`Marker x`}
                      className="w-8 h-8"
                    />
                  </div>
                </div>
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
        className="absolute right-[440px] z-10"
      >
        <div className="w-[30px] h-[60px] flex flex-col space-y-2">
          <button
            className="w-full h-20px bg-secondary text-white rounded"
            onClick={() => handleZoomIn()}
          >
            +
          </button>
          <button
            className="w-full h-20px bg-secondary text-white rounded"
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
