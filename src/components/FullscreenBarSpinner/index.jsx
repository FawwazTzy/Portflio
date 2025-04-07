// components/FullscreenBarSpinner.jsx
import React from "react";

const FullscreenBarSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-48 h-2 bg-gray-300 rounded overflow-hidden">
        <div className="h-full bg-white animate-loadingBar"></div>
      </div>
    </div>
  );
};

export default FullscreenBarSpinner;
