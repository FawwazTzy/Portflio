import { create } from "zustand";

// eslint-disable-next-line no-unused-vars
export const useZustandStateDocumen = create((set, get) => ({
  //! -------------------------- loading ------------------------------------
  dataTable: [],
  setDataTable: (value) => {
    set(() => {
      return { dataTable: value };
    });
  },
  downloadType: "optionXLS",
  setDownloadType: (value) => {
    set(() => {
      return { downloadType: value };
    });
  },
}));