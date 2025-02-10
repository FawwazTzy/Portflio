import { create } from "zustand";

// eslint-disable-next-line no-unused-vars
export const useZustandState = create((set, get) => ({
  //!===========================================
  constrainHeightScreen: 560,
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  initialWindowsSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  setWindowSize: (value) => {
    set(() => {
      return { windowSize: value };
    });
  },
  //!====================== INIT MAP =====================
  currentZoom: 5,
  viewport: {
    longitude: 115.58724216408724,
    latitude: -7.824328708769684,
    zoom: 5,
  },
  setViewport: (newViewport) => {
    set(() => {
      return { viewport: newViewport, currentZoom: newViewport.zoom };
    });
  },

  //!========================== Variable data fetch ================================
  dataSensor: [],
  setDataSensor: (value) => {
    set(() => {
      return { dataSensor: value };
    });
  },
  sensorClicked: {
    node_id: "err",
  },
  setSensorClicked: (value) => {
    set(() => {
      return { sensorClicked: value };
    });
  },

  //!=========================== variable sensor image =============
  isSensorImageVisible: false,
  setISensorImageVisible: (value) => {
    set(() => {
      return { isSensorImageVisible: value };
    });
  },

  //!========================== variable grafik ========================
  minY_Axis: -10,
  setMinY_Axis: (value) => {
    set(() => {
      return {
        minY_Axis: value,
      };
    });
  },

  maxY_Axis: 10,
  setMaxY_Axis: (value) => {
    set(() => {
      return {
        maxY_Axis: value,
      };
    });
  },
  
  dataChartXY: [],
  setDataChartXY: (value) => {
    set(() => {
      return {
        dataChartXY: value,
      };
    });
  },
  //!=========================================================
  
}));
