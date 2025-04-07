import { create } from "zustand";

// eslint-disable-next-line no-unused-vars
export const useZustandStateLogin = create((set, get) => ({
  //! -------------------------- loading ------------------------------------
  loading: false,
  setLoading: (value) => {
    set(() => {
      return { loading: value };
    });
  },
}));