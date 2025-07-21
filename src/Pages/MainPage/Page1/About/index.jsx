import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs } from "react-icons/fa";
import { SiVite, SiTailwindcss, SiLaravel } from "react-icons/si";
import myPhoto from "../../../../assets/FAWWAZ.jpg";
import Cube3D from "../../../../components/Cube3D";

const About = () => {
  return (
    <div className="bg-slate-500 bg-cover bg-center py-[100px] items-center min-h-screen text-white px-12">
      {/* Section About Me */}
      <div className="bg-black/40 w-full h-auto backdrop-blur-md p-6 rounded-xl shadow-lg">
        <h3 className="text-yellow-200 text-3xl mb-8">About Me ________</h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Foto dengan efek cahaya */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="relative w-[250px] h-[250px] md:w-60 md:h-60 rounded-full flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white z-10">
                <img
                  src={myPhoto}
                  alt="Muhammad Fawwaz Perdana"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-cyan-400 blur-2xl opacity-30 z-0 animate-pulse" />
            </motion.div>
          </div>

          {/* Deskripsi */}
          <motion.div
            className="bg-black/20 w-full h-auto backdrop-blur-md p-6 rounded-xl shadow-lg text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="text-md text-yellow-200">
              Hi everyone! My name is Muhammad Fawwaz Perdana, I'm a web developer from Lampung,
              Metro. I have 1 year of experience in back-end web development. I really enjoy what I
              do right now, in my opinion, creating programs is not just a job, but also an art
              that has aesthetic value and a hobby.
              <br />
              <br />
              My job is to build your website to be functional and user-friendly yet still
              attractive. In addition, I provide a personal touch to your product and ensure that
              the website catches attention and is easy to use. My goal is to convey your message
              and identity in the most creative way. If you are interested in hiring me, please
              contact the listed contact.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section Skill + Cube3D */}
      <motion.div
        className="mt-9 w-full h-auto flex flex-col md:flex-row gap-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 40, damping: 12, duration: 1.2 }}
      >
        {/* Skill box */}
        <div className="flex-1 bg-black/40 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h3 className="text-yellow-200 text-xl font-semibold mb-6">My skills ________</h3>
          <div className="flex flex-wrap gap-6 items-start">
            {[
              { icon: <FaHtml5 className="text-orange-500 text-4xl" />, label: "HTML5" },
              { icon: <FaCss3Alt className="text-blue-500 text-4xl" />, label: "CSS3" },
              { icon: <FaJsSquare className="text-yellow-300 text-4xl" />, label: "JavaScript" },
              { icon: <FaReact className="text-cyan-400 text-4xl animate-spin-slow" />, label: "React.js" },
              { icon: <FaNodeJs className="text-green-500 text-4xl" />, label: "Node.js" },
              { icon: <SiVite className="text-purple-400 text-4xl" />, label: "Vite" },
              { icon: <SiTailwindcss className="text-sky-400 text-4xl" />, label: "Tailwind CSS" },
              { icon: <SiLaravel className="text-red-400 text-4xl" />, label: "Laravel" },
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 border-4 border-yellow-300 rounded-md px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.6, ease: "easeOut" }}
              >
                {skill.icon}
                <span className="text-white text-md font-medium">{skill.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cube3D di kanan, di luar box skill */}
        <div className="hidden md:flex justify-center items-center flex-1">
          <Cube3D />
        </div>
      </motion.div>
    </div>
  );
};

export default About;
