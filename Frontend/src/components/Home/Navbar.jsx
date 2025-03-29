import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 10);
    });
  }, [scrollY]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleProjects = () => {
    setProjectsOpen((prev) => !prev);
  };

  const projectItems = [
    { name: "Residential", path: "/projects/project1" },
    { name: "Commercial", path: "/projects/project2" },
    { name: "Industrial", path: "/projects/project3" },
    { name: "OnGoing", path: "/projects/project3" },
    { name: "Completed", path: "/projects/project3" },
  ];

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
            className="py-1 text-sm font-medium tracking-wider text-black transition-colors hover:text-gray-300 hover:border-gray-400"
          >
            HOME
          </Link>
          <Link
            to="/aboutus"
            className="py-1 text-sm font-medium tracking-wider text-black transition-colors hover:text-gray-300 hover:border-gray-400"
          >
            ABOUT
          </Link>
          <div className="relative group">
            <div className="flex items-center py-1 text-sm font-medium tracking-wider text-black transition-colors cursor-pointer hover:text-gray-300 hover:border-gray-400">
              PROJECTS
              <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
            </div>
            {/* Dropdown Menu */}
            <div className="absolute left-0 invisible w-48 mt-2 overflow-hidden transition-all duration-200 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible">
              {projectItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 text-sm text-black transition-all hover:bg-gray-100 hover:border-l-4 hover:border-gray-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <Link
            to="/contactus"
            className="py-1 text-sm font-medium tracking-wider text-black transition-colors hover:text-gray-300 hover:border-gray-400"
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
              className="w-full py-1 text-sm font-medium tracking-wider text-center transition-colors hover:text-gray-300 hover:border-r-4 hover:border-gray-400"
              onClick={toggleMenu}
            >
              HOME
            </Link>
            <Link
              to="/aboutus"
              className="w-full py-1 text-sm font-medium tracking-wider text-center transition-colors hover:text-gray-300 hover:border-r-4 hover:border-gray-400"
              onClick={toggleMenu}
            >
              ABOUT
            </Link>
            <div className="w-full text-center">
              <button
                onClick={toggleProjects}
                className="flex items-center justify-center w-full py-1 text-sm font-medium tracking-wider transition-colors hover:text-gray-300 hover:border-r-4 hover:border-gray-400"
              >
                PROJECTS
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    projectsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {projectsOpen && (
                <div className="flex flex-col mt-2 space-y-2">
                  {projectItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="w-full py-1 text-sm text-center text-black transition-all hover:text-gray-300 hover:border-r-4 hover:border-gray-400"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/contactus"
              className="w-full py-1 text-sm font-medium tracking-wider text-center transition-colors hover:text-gray-300 hover:border-r-4 hover:border-gray-400"
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
