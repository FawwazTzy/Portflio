import React from "react";
import { motion } from "framer-motion";
import ktpPhoto from "../../../Assets/KTP.jpg";
import portfolioPhoto from "../../../Assets/Portfolio.jpg";

const Portfolio = () => {
  const openPage = (path) => {
    window.location.href = path;
  };

  return (
    <div className="bg-cyan-500 bg-cover bg-center py-[70px] min-h-screen text-white px-12">
      <motion.h3
      className="text-yellow-200 text-2xl text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        Past Project Experience
      </motion.h3>

      <motion.p
      className="text-sm text-center mb-9"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        Explore the projects that I've worked on so far
      </motion.p>

      <motion.div
        className="flex flex-row gap-6 overflow-x-auto pb-4"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.3 }}
      >
        {/* Scout Legion */}
        <div className="w-[400px] bg-white/20 h-auto backdrop-blur-md p-6 rounded-lg shadow-lg">
          <img
            src="https://i.pinimg.com/474x/cf/5c/73/cf5c736d989ff4bfcff042746dcac7be.jpg"
            alt="Scout Legion"
            className="w-23 h-48 object-cover rounded-lg"
          />
          <h3 className="mt-4 text-yellow-200 text-xl font-semibold">Wiki Web Attack on Titan</h3>
          <p>This is my first project in the world of information technology after learning the React combination and I immediately made a website about Attack on Titan and hosted it.</p>
        </div>

        {/* Garrison Regiment */}
        <div className="w-[400px] bg-white/30 backdrop-blur-md h-auto  p-6 rounded-lg shadow-lg">
          <img
            src={ktpPhoto} // <-- gunakan gambar yang di-import
            alt="KTP"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="mt-4 text-yellow-200 text-xl font-semibold">Imputing KTP for Village</h3>
          <p>So, after I made the Attack on Titan website, I made a website to input the Tempuran 12A, Center Lampung KTP given to me by my uncle.</p>
        </div>

        {/* Military Police */}
        <div className="w-[400px] bg-white/30 h-auto backdrop-blur-md p-6 rounded-lg shadow-lg">
          <img
            src={portfolioPhoto}
            alt="Portfolio"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="mt-4 text-yellow-200 text-xl font-semibold">My Portfolio</h3>
          <p>For now, I am making my own portfolio to find any job in the field of information technology.</p>
        </div>
      </motion.div>

      <div className="w-[370px] bg-white/30 h-auto backdrop-blur-md p-6 rounded-lg shadow-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQkuHkr6UPHMxKBvDeGLFWw2xHvcuZI_VOPg&s"
            alt="Portfolio"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="mt-4 text-yellow-200 text-xl font-semibold">PPK ORMAWA 2025 (SOON)</h3>
          <p>So I intend to accept my friend's invitation to join PPK ORMAWA 2025 to improve my abilities and more experience in the web section.</p>
      </div>
    </div>
  );
};

export default Portfolio;