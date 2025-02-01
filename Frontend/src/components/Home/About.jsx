/* eslint-disable no-irregular-whitespace */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <div
      id="about"
      className="container flex flex-col items-center justify-center px-4 lg:py-16 lg:flex-row lg:gap-28 md:px-8"
    >
      {/* Left Section */}
      <div className="relative mt-4 h-[180px] md:h-[420px] w-full lg:w-[380px]">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/About.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 h-full lg:mt-5 lg:h-[90%] w-full lg:w-[90%] lg:ml-5 bg-white/100 p-6 md:p-8 lg:p-12 mix-blend-lighten flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[80px] md:text-[120px] lg:text-[160px] font-bold font-sans leading-none text-[#1a365d]">
              14
            </span>
            <span className="mt-4 text-sm md:text-base lg:text-xl uppercase tracking-[0.1em] text-[#1a365d]">
              Years of Experience
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="max-w-full text-center lg:max-w-2xl lg:text-left">
        <h3 className="mb-4 text-xs tracking-wider text-gray-600 uppercase md:text-sm">
          About Us
        </h3>
        <h2 className="mb-6 text-2xl font-bold leading-tight md:mb-8 md:text-4xl lg:text-5xl">
          Unlocking Doors to Your Dream Home
          <br className="hidden md:inline" />
        </h2>
        <div className="space-y-4 text-sm text-gray-600 md:space-y-6 md:text-base">
          <p>
            At Guruji Homes, we take a client-centered approach, focused on
            transparency, integrity, and customer satisfaction. We understand
            that a home is not just a place—it’s a reflection of who you are,
            and we’re committed to helping you find the perfect fit.
          </p>
          <p className="hidden md:block">
            Let Guruji Homes guide you toward your next real estate success.
            Your dream home is waiting!
          </p>
        </div>

        {/* Count Section */}
        <div className="flex justify-center mt-8 space-x-8 lg:justify-start md:space-x-16 md:mt-12">
          <div className="text-center">
            <span className="block text-3xl md:text-4xl font-bold text-[#1a365d]">
              500+
            </span>
            <span className="text-sm text-gray-600 md:text-base">
              Happy Customers
            </span>
          </div>
          <div className="text-center">
            <span className="block text-3xl md:text-4xl font-bold text-[#1a365d]">
              1000+
            </span>
            <span className="text-sm text-gray-600 md:text-base">
              Successful Sales
            </span>
          </div>
        </div>

        <div className="mt-8 md:mt-12">
          <Link to="aboutus">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-2.5  hover:bg-black hover:text-white transition-colors duration-300 border-2 border-gray-900"
            >
              EXPLORE IT
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
