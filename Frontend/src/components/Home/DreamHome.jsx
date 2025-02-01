/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DreamHome() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const values = [
    {
      title: "QUALITY",
      image: "/1.webp",
      position: "0 0",
    },
    {
      title: "THRIVING COMMUNITIES",
      image: "/2.webp",
      position: "33.33% 0",
    },
    {
      title: "THOUGHTFUL DESIGN",
      image: "/3.webp",
      position: "66.66% 0",
    },
    {
      title: "SUSTAINABILITY",
      image: "/4.webp",
      position: "100% 0",
    },
  ];

  return (
    <section className="px-4 py-2 mx-auto max-w-7xl md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="lg:mb-6 text-2xl font-[500] md:text-3xl">
          VALUES WE PRESERVE
        </h2>
        <p className="max-w-3xl mx-auto text-[16px] text-gray-700 md:text-xl">
          We create spaces that enable Everyday Joys; one community, one family,
          and one home at a time.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            variants={itemVariants}
            className="relative group"
          >
            <div
              className="aspect-[4/5] rounded-lg overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${value.image})` }}
            >
              <div className="absolute inset-0 transition-opacity bg-black/30 group-hover:opacity-40" />
              {/* <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="absolute text-xl font-medium text-white bottom-6 left-6"
              >
                {value.title}
              </motion.h3> */}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-4 mb-2 lg:mt-12">
        <Link to="/projects">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:px-8 lg:py-2.5 px-4 py-1.5  hover:bg-black hover:text-white transition-colors duration-300 border-2 border-gray-900"
          >
            EXPLORE IT
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
