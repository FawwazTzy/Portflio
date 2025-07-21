import React, { useEffect, useRef } from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const Cube3D = () => {
  const cubeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[200px] h-[200px] perspective-800">
      <div
        ref={cubeRef}
        className="relative w-full h-full transform-style-preserve-3d transition-transform duration-[2000ms] ease-in-out"
      >
        {[
          { icon: <FaHtml5 className="text-orange-500 text-6xl" />, face: "front" },
          { icon: <FaCss3Alt className="text-blue-500 text-6xl" />, face: "back" },
          { icon: <FaJsSquare className="text-yellow-300 text-6xl" />, face: "right" },
          { icon: <FaReact className="text-cyan-400 text-6xl" />, face: "left" },
          { icon: <FaNodeJs className="text-green-500 text-6xl" />, face: "top" },
          { icon: <SiTailwindcss className="text-sky-400 text-6xl" />, face: "bottom" },
        ].map(({ icon, face }, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex items-center justify-center bg-black/70 border border-yellow-200 rounded-xl text-white ${face}`}
          >
            {icon}
          </div>
        ))}
      </div>

      <style>{`
  .perspective-800 { perspective: 800px; }
  .transform-style-preserve-3d { transform-style: preserve-3d; }
  .front { transform: rotateY(0deg) translateZ(100px); }
  .back { transform: rotateY(180deg) translateZ(100px); }
  .right { transform: rotateY(90deg) translateZ(100px); }
  .left { transform: rotateY(-90deg) translateZ(100px); }
  .top { transform: rotateX(90deg) translateZ(100px); }
  .bottom { transform: rotateX(-90deg) translateZ(100px); }
`}</style>

    </div>
  );
};

export default Cube3D;
