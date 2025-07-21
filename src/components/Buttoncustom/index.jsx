import React from 'react';

const Buttoncustom = ({ name, onClick, isSelected, logo }) => {
  return (
    <button
      onClick={onClick}
      className={`w-[200px] py-1 flex items-center gap-5 pl-[4px] rounded-xl border-2 transition-colors duration-200
        ${isSelected 
          ? 'bg-[#364b54] text-[#b7c0c2] border-[#5e7b88]' 
          : 'bg-transparent text-[#b7c0c2] border-[#5e7b88] hover:bg-[#364c55]'}`}
    >
      {/* Logo Container tetap, biar teks nggak geser */}
      <div className="w-10 h-10 flex items-center justify-center">
        {isSelected && logo && (
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
        )}
      </div>
      {name}
    </button>
  );
};

export default Buttoncustom;
