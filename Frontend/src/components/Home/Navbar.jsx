import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 10);
    });
  }, [scrollY]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-3"
      animate={{
        backgroundColor: isScrolled ? "white" : "transparent",
        boxShadow: isScrolled ? "0 2px 5px rgba(0,0,0,0.1)" : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          <img
            src="/logo-05.png"
            alt="logo"
            className="object-contain w-16 h-16 scale-150"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden space-x-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium tracking-wider text-black transition-colors hover:text-gray-300"
          >
            HOME
          </Link>
          <Link
            to="/aboutus"
            className="text-sm font-medium tracking-wider text-black transition-colors hover:text-gray-300"
          >
            ABOUT
          </Link>
          <Link
            to="/projects"
            className="text-sm font-medium tracking-wider text-black transition-colors hover:text-gray-300"
          >
            PROJECTS
          </Link>
          <Link
            to="/contactus"
            className="text-sm font-medium tracking-wider text-black transition-colors hover:text-gray-300"
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-black md:hidden"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="py-6 mt-4 text-black bg-white md:hidden">
          <div className="flex flex-col items-center space-y-4">
            <Link
              to="/"
              className="text-sm font-medium tracking-wider transition-colors hover:text-gray-300"
              onClick={toggleMenu}
            >
              HOME
            </Link>
            <Link
              to="/aboutus"
              className="text-sm font-medium tracking-wider transition-colors hover:text-gray-300"
              onClick={toggleMenu}
            >
              ABOUT
            </Link>
            <Link
              to="/projects"
              className="text-sm font-medium tracking-wider transition-colors hover:text-gray-300"
              onClick={toggleMenu}
            >
              PROJECTS
            </Link>
            <Link
              to="/contactus"
              className="text-sm font-medium tracking-wider transition-colors hover:text-gray-300"
              onClick={toggleMenu}
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
