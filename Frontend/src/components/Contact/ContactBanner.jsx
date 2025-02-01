import { motion } from "framer-motion";

const ContactBanner = () => {
  return (
    <section
      className="relative w-full h-[40vh] lg:h-[600px] bg-cover bg-center flex items-center justify-start px-6 sm:px-12 md:px-16 lg:px-24"
      style={{ backgroundImage: "url(/about-2.jpg)" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-[2px]"></div>

      <motion.div
        className="relative z-10 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-white ">
          <h1 className="mb-4 text-3xl font-semibold sm:text-4xl md:text-5xl ">
            Contact
          </h1>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactBanner;
