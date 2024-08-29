import { create } from "zustand";

// eslint-disable-next-line no-unused-vars
export const useZustandState = create((set, get) => ({
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
  responsiveHeightSensorBox: "100px",
  setResponsiveHeightSensorBox: (value) => {
    set(() => {
      return { responsiveHeightSensorBox: value };
    });
  },
  heightChartBox: "300px",
  setHeightChartBox: (value) => {
    set(() => {
      return { heightChartBox: value };
    });
  },
  heightMinMaxBox: "300px",
  setHeightMinMaxBox: (value) => {
    set(() => {
      return { heightMinMaxBox: value };
    });
  },

  dashboardFilter: "Show all sensors",

  currentZoom: 5,
  setDashboardFilter: (value) => {
    set(() => {
      return { dashboardFilter: value };
    });
  },

  timeFilter: "Daily",
  setTimeFilter: (value) => {
    set(() => {
      return { timeFilter: value };
    });
  },

  isOtherSelected: false,
  setIsOtherSelected: (value) => {
    set(() => {
      return { isOtherSelected: value };
    });
  },

  isCalenderStartOpen: false,
  setIsCalenderStartOpen: (value) => {
    set(() => {
      return { isCalenderStartOpen: value };
    });
  },

  isCalenderEndOpen: false,
  setIsCalenderEndOpen: (value) => {
    set(() => {
      return { isCalenderEndOpen: value };
    });
  },

  startDate: "Start",
  setStartDate: (value) => {
    set(() => {
      return { startDate: value };
    });
  },

  endDate: "End",
  setEndDate: (value) => {
    set(() => {
      return { endDate: value };
    });
  },

  // isOtherDateFillComplete: false,

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

  isDetailBoxShow: false,
  setIsDetailBoxShow: (value) => {
    set(() => {
      return {
        isDetailBoxShow: value,
      };
    });
  },

  markerIndex: -1,
  setMarkerIndex: (value) => {
    set(() => {
      return {
        markerIndex: value,
      };
    });
  },

  devices: [],
  setDevices: (value) => {
    set(() => {
      return { devices: value };
    });
  },

  sensorBox: [],
  setSensorBox: (value) => {
    set(() => {
      return { sensorBox: value };
    });
  },

  isSensorSelect: false,
  setIsSensorSelect: (value) => {
    set(() => {
      return { isSensorSelect: value };
    });
  },

  isMarkerShowRipple: false,
  setIsMarkerShowRipple: (value) => {
    set(() => {
      return { isMarkerShowRipple: value };
    });
  },

  deviceDetail: {},
  setDeviceDetail: (value) => {
    set(() => {
      return { deviceDetail: value };
    });
  },

  dataChartAllSensor: {},
  setDataChartAllSensor: (value) => {
    set(() => {
      return { dataChartAllSensor: value };
    });
  },

  // data diterima ketika devicebox di select
  dataSensorSelect: {},
  setDataSensorSelect: (value) => {
    set(() => {
      return { dataSensorSelect: value };
    });
  },

  // untuk data chart
  dataChartXY: [],
  setDataChartXY: (value) => {
    set(() => {
      return {
        dataChartXY: value,
      };
    });
  },
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

  isSelectMenu: [true, false, false, false, false, false],
  setSelectMenu: (value) => {
    set(() => {
      return {
        isSelectMenu: value,
      };
    });
  },
  clearSelectMenu: () => {
    set(() => {
      return {
        isSelectMenu: [true, false, false, false, false, false],
      };
    });
  },

  isMenuActive: false,
  setIsMenuActive: (value) => {
    set(() => {
      return {
        isMenuActive: value,
      };
    });
  },

  dataUsers: [],
  setDataUsers: (value) => {
    set(() => {
      return {
        dataUsers: value,
      };
    });
  },

  //
}));
