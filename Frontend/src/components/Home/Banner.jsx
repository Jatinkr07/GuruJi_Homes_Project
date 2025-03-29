import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cards = [
  {
    id: 1,
    title: "Residential",
    image: "/G-01.jpg",
    color: "bg-gradient-to-t from-gray-800 to-gray-50",
    description: "Innovative living spaces tailored to your lifestyle",
  },
  {
    id: 2,
    title: "Commercial",
    image: "/G-2.jpg",
    color: "bg-gradient-to-t from-gray-800 to-gray-50",
    description: "Dynamic business environments for success",
  },
  {
    id: 3,
    title: "Industrial",
    image: "/G-3.jpg",
    color: "bg-gradient-to-t from-gray-800 to-gray-50",
    description: "Robust solutions for industrial efficiency",
  },
  {
    id: 4,
    title: "Institutional",
    image: "/G-4.jpg",
    color: "bg-gradient-to-t from-gray-800 to-gray-50",
    description: "Purpose-built facilities for communities",
  },
  {
    id: 5,
    title: "Recreational",
    image: "/G-5.jpg",
    color: "bg-gradient-to-t from-gray-800 to-gray-50",
    description: "Spaces designed for leisure and enjoyment",
  },
];

export default function Banner() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="w-full py-12 overflow-hidden bg-gray-100">
      <div className="flex h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] shadow-xl">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`relative cursor-pointer overflow-hidden transition-all duration-500 ${
              expandedIndex === index ? "flex-[3]" : "flex-[0.7]"
            }`}
            onHoverStart={() => setExpandedIndex(index)}
            onHoverEnd={() => setExpandedIndex(0)} // Return to first card on hover end
            initial={{ flex: index === 0 ? 3 : 0.7 }}
            animate={{
              flex: expandedIndex === index ? 3 : 0.7,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ scale: 1.1 }}
              animate={{ scale: expandedIndex === index ? 1 : 1.1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: expandedIndex === index ? 0.3 : 0.6,
              }}
              transition={{ duration: 0.4 }}
            />

            <motion.div
              className={`absolute inset-0 ${card.color}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: expandedIndex === index ? 0.5 : 0,
              }}
              transition={{ duration: 0.4 }}
            />

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{
                opacity: expandedIndex === index ? 1 : 0,
                y: expandedIndex === index ? 0 : 20,
              }}
              transition={{
                duration: 0.5,
                delay: expandedIndex === index ? 0.2 : 0,
                ease: "easeOut",
              }}
            >
              <div className="px-4 text-center">
                <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">
                  {card.title}
                </h2>
                <motion.p
                  className="max-w-sm mt-3 text-sm sm:text-base md:text-lg text-white/90 drop-shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {card.description}
                </motion.p>
                <motion.button
                  className="px-6 py-2 mt-6 font-medium text-gray-900 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: expandedIndex === index ? 1 : 0,
                    y: expandedIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4"
              initial={{ opacity: 1 }}
              animate={{
                opacity: expandedIndex === index ? 0 : 1,
                y: expandedIndex === index ? 20 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xs font-semibold text-center text-white sm:text-sm md:text-lg lg:text-xl drop-shadow-md">
                {card.title}
              </h3>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/projects">
          <motion.button
            className="px-6 py-3 font-medium text-white bg-black border-2 border-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            View More
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
