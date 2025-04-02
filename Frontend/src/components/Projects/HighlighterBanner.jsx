/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { API_URL } from "../../services/api";

export default function HighlighterBanner({ project }) {
  const highlights = project.highlight || ["No highlights available."];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 sm:p-8 text-gray-800 rounded-lg shadow-lg max-w-[1340px] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: project.bannerImage
            ? `url('${API_URL}/${project.bannerImage}')`
            : "url('/Banner.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black opacity-60" />
      <div className="relative z-10">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 text-3xl font-semibold text-center text-white sm:text-4xl"
        >
          🏡 Key Highlights
        </motion.h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-lg shadow-md"
            >
              <motion.div
                className="flex flex-col h-full p-4 text-black transition-colors duration-300 ease-in-out bg-white bg-opacity-90"
                whileHover={{
                  backgroundColor: "rgba(41, 40, 40, 0.9)",
                  color: "#ffffff",
                }}
              >
                <motion.div className="flex items-start mb-2">
                  <CheckCircle className="flex-shrink-0 mr-3 text-xl text-green-500" />
                  <p className="text-sm">{highlight}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
