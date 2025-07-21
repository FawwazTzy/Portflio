// Header.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="bg-slate-200 text-purple-500 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-3">
        <motion.h3
          className="text-sm font-bold text-black h-1 mt-2 mb-4"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          Muhammad Fawwaz Perdana
        </motion.h3>

        <nav>
          <motion.ul
            className="text-[#000080] flex space-x-2 right-0"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <li>
              <Link to="/" className="hover:text-gray-700 px-4 py-3">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-700 px-4 py-3">About</Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-gray-700 px-4 py-3">Portfolio</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-gray-700 px-4 py-3">Blog</Link>
            </li>
          </motion.ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
