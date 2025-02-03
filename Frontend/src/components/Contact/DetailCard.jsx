/* eslint-disable no-irregular-whitespace */
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 500, delay: 0.2 },
  },
};

export default function DetailCard() {
  return (
    <div className="relative max-w-7xl container mx-auto  h-[230px] sm:h-[400px] lg:h-[200px] lg:mt-16">
      <div className="absolute inset-0 grid grid-cols-1 gap-2 p-6 lg:gap-8 sm:grid-cols-2">
        <motion.div
          className="p-4 text-white transition-all duration-300 bg-black bg-opacity-75 rounded-lg cursor-pointer lg:p-6 backdrop-blur-md hover:bg-opacity-90"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center px-8 space-x-4">
            <motion.div variants={iconVariants}>
              <MapPin className="w-8 h-8 mb-12 text-blue-400" />
            </motion.div>
            <div>
              <h3 className="mb-2 text-xl font-[500]">Location</h3>
              <p>Avenue 64, BPTP Park -81, </p>
              <p>Sector-81,Greater Faridabad</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          className="p-4 text-white transition-all duration-300 bg-black bg-opacity-75 rounded-lg cursor-pointer lg:p-6 backdrop-blur-md hover:bg-opacity-90"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center px-8 space-x-4">
            <motion.div variants={iconVariants}>
              <Phone className="w-8 h-8 mb-12 text-green-400" />
            </motion.div>
            <div>
              <h3 className="mb-2 text-xl font-[500]">Contact</h3>
              <p>+91 9540274407</p>
              <p>Info.gurujihomes@gmail.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
