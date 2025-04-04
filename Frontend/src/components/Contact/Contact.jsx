import { useState } from "react";
import { motion } from "framer-motion";
import DetailCard from "./DetailCard";

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.3 } },
  blur: { scale: 1, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto overflow-hidden">
      <DetailCard />
      <div className="mx-auto mt-16 mb-16 overflow-hidden bg-gray-100 rounded-lg shadow-sm max-w-7xl">
        <div className="flex flex-col md:flex-row">
          <motion.div
            className="w-full p-8 md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileBlur="blur"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </motion.div>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileBlur="blur"
              >
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </motion.div>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileBlur="blur"
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </motion.div>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileBlur="blur"
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full h-32 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </motion.div>
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 py-2 text-white transition duration-300 bg-black border-2 border-black hover:bg-white hover:text-black"
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </motion.div>

          <motion.div
            className="relative w-full h-64 md:w-1/2 md:h-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.858645853316!2d77.3437462!3d28.3906555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjguMzkwNjU1LCA3Ny4zNDYzMjE!5e0!3m2!1sen!2sus!4v1620000000000"
              className="object-cover w-full h-full rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
