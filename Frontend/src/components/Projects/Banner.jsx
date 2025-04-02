/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { API_URL } from "../../services/api";

export default function Banner({ project }) {
  return (
    <section className="relative w-full h-[45vh] lg:h-[600px]">
      <img
        src={
          project.bannerImage
            ? `${API_URL}/${project.bannerImage}`
            : "/G-01.jpg"
        }
        alt={`${project.title} banner`}
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="container relative flex items-end h-full px-4 pb-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md p-3 lg:p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm"
        >
          <div className="flex items-center mb-4">
            <h1 className="text-xl font-[500] text-white md:text-2xl">
              {project.title}
            </h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-white/90 md:text-xl"
          >
            <p>{project.location}</p>
            <p className="mt-4 text-sm md:text-base text-white/70">
              Luxury Apartments with Modern Living
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
