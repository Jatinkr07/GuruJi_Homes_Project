/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
import { getAmenityDetails } from "../../Pages/Projects/Amenities/Card";

export default function AmenitiesSection({ project }) {
  const selectedAmenities =
    project.amenities?.length > 0
      ? project.amenities.map((name) => getAmenityDetails(name))
      : [{ label: "No amenities available", icon: null, name: "none" }];

  return (
    <section className="w-full px-4 py-8 mx-auto max-w-7xl md:py-16">
      <div className="mb-8 text-center md:mb-16">
        <h1 className="mb-4 text-3xl font-[400] text-gray-900 md:text-4xl">
          Amenities
        </h1>
        <p className="text-gray-600">
          Discover the features that make {project.title} exceptional
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {selectedAmenities.map((amenity, index) => (
          <motion.div
            key={amenity.name || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center p-12 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            {amenity.icon ? (
              <span className="flex-shrink-0 mr-3 text-2xl text-green-500">
                {amenity.icon}
              </span>
            ) : (
              <span className="w-6 h-6 mr-3" />
            )}
            <span className="text-sm text-gray-800 md:text-base">
              {amenity.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
