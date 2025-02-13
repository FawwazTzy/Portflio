import { create } from "zustand";

// eslint-disable-next-line no-unused-vars
export const useZustandStateHome = create((set, get) => ({
  dataSensorHomePage: [],
  setDataSensorHomePage: (value) => {
    set(() => {
      return { dataSensorHomePage: value };
    });
  },
  dataSensorKameraOn: [],
  setDataSensorKameraOn: (value) => {
    set(() => {
      return { dataSensorKameraOn: value };
    });
  },
  dataSensorKameraOff: [],
  setDataSensorKameraOff: (value) => {
    set(() => {
      return { dataSensorKameraOff: value };
    });
  },
  dataSensorGaugeNormal: [],
  setDataSensorGaugeNormal: (value) => {
    set(() => {
      return { dataSensorGaugeNormal: value };
    });
  },
  dataSensorGaugeAnomali: [],
  setDataSensorGaugeAnomali: (value) => {
    set(() => {
      return { dataSensorGaugeAnomali: value };
    });
  },
  isBoxClick: "kameraOn",
  setIsBoxClick: (value) => {
    set(() => {
      return { isBoxClick: value };
    });
  },
  fetchDataError: false,
  setFetchDataError: (value) => {
    set(() => {
      return { fetchDataError: value };
    });
  },
  percentageKameraOn: 0,
  setPercentageKameraOn: (value) => {
    set(() => {
      return { percentageKameraOn: value };
    });
  },
  percentageKameraOff: 0,
  setpercentageKameraOff: (value) => {
    set(() => {
      return { percentageKameraOff: value };
    });
  },
  percentageGaugeNormal: 0,
  setPercentageGaugeNormal: (value) => {
    set(() => {
      return { percentageGaugeNormal: value };
    });
  },
  percentageGaugeAnomali: 0,
  setpercentageGaugeAnomali: (value) => {
    set(() => {
      return { percentageGaugeAnomali: value };
    });
  },
}));
