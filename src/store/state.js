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
  Initialviewport: {
    longitude: 115.58724216408724,
    latitude: -7.824328708769684,
    zoom: 5,
  },
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

  photo: "",
  setPhoto: (value) => {
    set(() => {
      return { photo: value };
    });
  },

  //!=========================== variable sensor image =============
  isSensorImageVisible: false,
  setISensorImageVisible: (value) => {
    set(() => {
      return { isSensorImageVisible: value };
    });
  },
  isFetchImageProductReady: false,
  setIsFetchImageProductReady: (value) => {
    set(() => {
      return { isFetchImageProductReady: value };
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
  //!===========================variable side menu ===========================
  indexOfMenuActivate: -1,
  setIndexOfMenuActivate: (value) => {
    set(() => {
      return {
        indexOfMenuActivate: value,
      };
    });
  },
  //! -------------------------- loading ------------------------------------
  loading: false,
  setLoading: (value) => {
    set(() => {
      return { loading: value };
    });
  },
  //! -------------------------- Unit ------------------------------------
  UPT: [],
  setUPT: (value) => {
    set(() => {
      return { UPT: value };
    });
  },
  ULTG: [],
  setULTG: (value) => {
    set(() => {
      return { ULTG: value };
    });
  },
  unit: [],
  setUnit: (value) => {
    set(() => {
      return { unit: value };
    });
  },
  dipilihULTG: "",
  setDipilihULTG: (value) => {
    set(() => {
      return { dipilihULTG: value };
    });
  },
  unitSelected: "",
  setUnitSelected: (value) => {
    set(() => {
      return { unitSelected: value };
    });
  },
  nodes: [],
  setNodes: (value) => {
    set(() => {
      return { nodes: value };
    });
  },
  nodesView: [],
  setNodesView: (value) => {
    set(() => {
      return { nodesView: value };
    });
  },
  nodeSelected: {
    nodeName: "-",
    UPT: "-",
    ULTG: "-",
    unit: "-",
    brand: "-",
    type: "-",
    gps_lat: "-",
    gps_long: "-",
    zonaInstallation: "-",
    isolasi: "-",
    statusGauge: "-",
    statusCam: "-",
    pressure: "-",
    dateTime: "-"
  },
  setNodeSelected: (value) => {
    set(() => {
      return { nodeSelected: value };
    });
  },
  imageUrl: "",
  setImageUrl: (value) => {
    set(() => {
      return { imageUrl: value };
    });
  },
  isChartReady: false,
  setIsChartReady: (value) => {
    set(() => {
      return { isChartReady: value };
    });
  },
  filterName: "Daily",
  setFilterName: (value) => {
    set(() => {
      return { filterName: value };
    });
  },
  userProfile: {
    username: "-",
    name: "-",
    wilayahKerja: "-"
  },
  setUserProfile: (value) => {
    set(() => {
      return { userProfile: value };
    });
  },
  isDropDownHeaderSelected: false,
  setIsDropDownHeaderSelected: (value) => {
    set(() => {
      return { isDropDownHeaderSelected: value };
    });
  },


}));
