/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { API_URL } from "../../services/api";

export default function SitePlanSection({ project }) {
  const hasSitePlans = project.sitePlan && project.sitePlan.length > 0;

  if (!hasSitePlans) return null;

  const sitePlans = project.sitePlan.map((sp, index) => ({
    src: `${API_URL}/${sp}`,
    alt: `Site Plan ${index + 1} for ${project.title}`,
  }));

  return (
    <section className="w-full max-w-6xl px-4 py-8 mx-auto md:py-16">
      <div className="mb-8 text-center md:mb-16">
        <h1 className="mb-4 text-3xl font-[400] text-gray-900 md:text-4xl">
          Site Plan
        </h1>
        <p className="text-gray-600">
          Layout overview of {project.title} in {project.location}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {sitePlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <img
              src={plan.src}
              alt={plan.alt}
              width={800}
              height={600}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
              {plan.alt}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
