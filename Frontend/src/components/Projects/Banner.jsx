import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative w-full h-[45vh] lg:h-[600px] ">
      {/* Background Image */}
      <img
        src="/G-01.jpg"
        alt="Prima adore luxury apartments night view"
        className="absolute inset-0 object-cover w-full h-full"
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div> */}

      <div className="container relative flex items-end h-full px-4 pb-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md p-3 lg:p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8">
              {/* <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full text-amber-400"
              >
                <path
                  d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z"
                  fill="currentColor"
                />
              </svg> */}
            </div>
            <h1 className="text-xl font-[500] text-white md:text-2xl lg:-ml-8 ">
              adore PRIMA
              {/* <span className="block mt-1 text-2xl font-light md:text-3xl">
                adore
              </span> */}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-white/90 md:text-xl"
          >
            <p>Sector 72-73, Faridabad</p>
            <p className="mt-4 text-sm md:text-base text-white/70">
              Luxury Apartments with Modern Living
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
