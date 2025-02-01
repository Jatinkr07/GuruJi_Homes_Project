/* eslint-disable no-irregular-whitespace */
import { motion } from "framer-motion";
import { Link } from "react-scroll";

export default function Hero() {
  return (
    <section
      className="relative w-full lg:h-[600px] bg-center h-[60vh] bg-cover"
      style={{
        backgroundImage: `url('/Home.webp')`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.3em] mb-6"
        >
          Find, Love, Move In
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mb-8 text-4xl font-bold md:text-6xl"
        >
          GURUJI HOMES
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-lg max-w-3xl mb-12 text-gray-200 lg:leading-[2.5rem]"
        >
          Invest in Your Future. Live Your Dream.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="about"
            smooth={true}
            duration={800}
            className="cursor-pointer px-8 py-2.5 border-2 border-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            EXPLORE IT
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
