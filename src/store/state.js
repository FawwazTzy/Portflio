// src/store/state.js
import { create } from 'zustand';

export const useZustandState = create((set) => ({
  initialWindowsSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  setWindowSize: (size) =>
    set(() => ({
      initialWindowsSize: size,
    })),
}));
