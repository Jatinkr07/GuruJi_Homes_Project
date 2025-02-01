/* eslint-disable no-irregular-whitespace */
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="px-6 py-8 lg:py-16 sm:px-12 md:px-24">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative flex items-center justify-center w-full max-w-[220px] mx-auto">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 rotate-[90deg] w-[1px] bg-gray-900 h-24 sm:h-32"></div>

          <div className="px-6 text-lg font-[500] text-center text-gray-800 sm:text-2xl">
            <h1>About</h1>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-[90deg] w-[1px] bg-gray-900 h-24 sm:h-32"></div>
        </div>

        <motion.div
          className="max-w-4xl text-sm text-center text-gray-600 lg:text-base lg:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>
            At Guruji Homes, we believe that finding your perfect home is more
            than just a transaction—it’s an important step toward creating the
            life you’ve always dreamed of. With years of experience in the real
            estate market, we pride ourselves on offering expert guidance,
            personalized service, and a deep understanding of the local
            property landscape.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
