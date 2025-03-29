/* eslint-disable no-irregular-whitespace */

import { motion } from "framer-motion";

export default function VisionSection() {
  return (
    <div className="container min-h-screen bg-white">
      <div className="container px-4 py-12 mx-auto max-w-7xl md:py-24">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-[2px]">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-blue-600 rounded-full" />
                  ))}
                </div>
                <h2 className="text-2xl font-[500] tracking-wider">VISION</h2>
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-800">
                  Our vision is to{" "}
                  {/* <span className="font-semibold">Guruji Homes</span>, become */}
                  become the most trusted and innovative company, known for
                  transforming the way people buy, sell, and invest in
                  properties. We aspire to lead with integrity, customer-first
                  service, and a deep commitment to excellence, helping
                  individuals achieve their real estate dreams with ease and
                  confidence. At Guruji Homes, we envision a future where every
                  client’s journey to homeownership is made simple,
                  fulfilling, and rewarding.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-[2px]">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-blue-600 rounded-full" />
                  ))}
                </div>
                <h2 className="text-2xl font-[500] tracking-wider">MISSION</h2>
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-800">
                  At <span className="font-semibold">Guruji Homes</span>, our
                  mission is to provide an exceptional experience by offering
                  personalized, honest, and expert guidance to our clients. We
                  are dedicated to simplifying the real estate process, ensuring
                  that every transaction is seamless, transparent, and aligned
                  with our clients’ best interests. We strive to help
                  individuals and families find homes that truly reflect their
                  needs and aspirations, fostering trust and long-term
                  relationships along the way.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-full rounded-lg shadow-2xl"
          >
            <img
              src="/Vision.jpg"
              alt="Modern "
              className="h-full transition-transform lg:max-w-4xl rounded-xl hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
