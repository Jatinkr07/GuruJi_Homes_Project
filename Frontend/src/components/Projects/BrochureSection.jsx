/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { API_URL } from "../../services/api";

export default function BrochureSection({ project }) {
  const brochureUrl = project.brochure
    ? `${API_URL}/${project.brochure}`
    : null;

  return (
    <section className="w-full max-w-6xl px-4 py-8 mx-auto md:py-16">
      <div className="flex justify-start">
        {brochureUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
          >
            <div className="flex flex-col items-center">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                {project.title} Brochure
              </h3>
              {/* Optional: Embed a PDF preview */}
              {/* <iframe
                src={brochureUrl}
                title="Project Brochure"
                className="w-full h-64 mb-4 border rounded"
              /> */}
              <a
                href={brochureUrl}
                download={`${project.title}-Brochure.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-white transition-colors duration-300 bg-blue-600 rounded hover:bg-blue-700"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </a>
            </div>
          </motion.div>
        ) : (
          <p className="text-center text-gray-600">
            No brochure available for this project.
          </p>
        )}
      </div>
    </section>
  );
}
