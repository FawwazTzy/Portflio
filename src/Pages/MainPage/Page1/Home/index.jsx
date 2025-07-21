import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import myPhoto from "../../../../assets/FAWWAZ.jpg";

const Home = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* KIRI - Teks dan konten */}
      <div className="md:w-3/3 w-full flex items-center justify-center bg-[url('https://i.pinimg.com/736x/88/cd/2f/88cd2f651957535ea2d5c25a674f19b6.jpg')] p-8">
        <motion.div
          className="mt-12 py-8 px-8 w-full text-left backdrop-blur-md p-9 rounded-xl shadow-lg"
          initial={{ x: "-100%" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <h3 className="text-yellow-200 text-2xl">Hello World, I'm 👋</h3>
          <p className="text-4xl md:text-6xl text-yellow-200">
            <sub>Muhammad Fawwaz Perdana</sub>
          </p>

          {/* ANIMASI KETIKAN */}

  
  <>
  <style>
    {`
      .rainbow-gradient-text {
        background: linear-gradient(
          270deg,
          red,
          orange,
          yellow,
          green,
          cyan,
          indigo,
          violet,
          red
        );
        background-size: 800% 800%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: rainbowGradient 8s ease infinite;
      }

      @keyframes rainbowGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}
  </style>

  <h3 className="mt-4 text-xl md:text-2xl">
    <TypeAnimation
      sequence={[
        "Full-Stack Engineer",
        2000,
        "React Enthusiast",
        2000,
        "Backend Developer",
        2000,
        "Creative Coder",
        2000,
      ]}
      wrapper="span"
      className="rainbow-gradient-text underline"
      speed={50}
      repeat={Infinity}
      cursor={true}
    />
  </h3>
</>




          <p className="mt-4 text-yellow-200 text-lg">
            <u>Welcome to My personal website</u>
          </p>

          {/* Tombol menuju situs eksternal */}
          <a
            href="https://muhammadiyah.or.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-full mt-6 hover:bg-yellow-400 transition text-center"
          >
            More about me!
          </a>

          {/* Sosial Media */}
          <motion.div
            className="flex gap-4 mt-7"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <a
              href="https://wa.me/62895705112267"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-500 p-2 rounded-full hover:bg-green-400 transition"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/bethoooven55"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-500 p-2 rounded-full hover:bg-pink-400 transition"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/Lucky Al - Fawz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-500 p-2 rounded-full hover:bg-blue-500 transition"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* KANAN - Foto */}
      <div className="md:w-1/3 w-full flex flex-col items-center justify-center bg-gray-900 p-6">
        <motion.div
          className="relative w-60 h-60 rounded-full flex items-center justify-center"
          initial={{ boxShadow: "0 0 20px #ffffff44" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          animate={{
            boxShadow: [
              "0 0 80px #ffffff44",
              "0 0 40px #00ffff88",
              "0 0 20px #ffffff44",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {/* Foto */}
          <motion.div
            className="w-full h-full rounded-full overflow-hidden border-4 border-white z-10"
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <img
              src={myPhoto}
              alt="Muhammad Fawwaz Perdana"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Glow belakang */}
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-400 blur-2xl opacity-30 z-0 animate-pulse"
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </motion.div>

        {/* Teks di bawah foto */}
        <p className="mt-4 text-white text-xl font-semibold">My Profile</p>
      </div>
    </div>
  );
};

export default Home;

