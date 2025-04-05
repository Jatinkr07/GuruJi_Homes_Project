import { useState } from "react";
import { motion } from "framer-motion";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitContact } from "../../services/api";
import DetailCard from "./DetailCard";

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.3 } },
  blur: { scale: 1, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export default function ContactForm() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      message.success("Contact submitted successfully! Check your email.");
      setFormData({ name: "", number: "", email: "", message: "" });
      queryClient.invalidateQueries(["contacts"]);
    },
    onError: () => {
      message.error("Failed to submit contact or send email");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="w-full px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
      <div className="w-full mb-8">
        <DetailCard />
      </div>

      <div className="flex flex-col w-full gap-0 mb-12 md:flex-row">
        <motion.div
          className="w-full p-6 bg-gray-100 rounded-none md:w-1/2 "
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.input
              variants={inputVariants}
              whileFocus="focus"
              whileBlur="blur"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <motion.input
              variants={inputVariants}
              whileFocus="focus"
              whileBlur="blur"
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <motion.input
              variants={inputVariants}
              whileFocus="focus"
              whileBlur="blur"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <motion.textarea
              variants={inputVariants}
              whileFocus="focus"
              whileBlur="blur"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              required
            />
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={mutation.isLoading}
              className="px-4 py-2 font-semibold text-white bg-black border border-black hover:text-black hover:bg-white"
            >
              {mutation.isLoading ? "Submitting..." : "Submit"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="relative w-full h-64 md:h-auto md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.858645853316!2d77.3437462!3d28.3906555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjguMzkwNjU1LCA3Ny4zNDYzMjE!5e0!3m2!1sen!2sus!4v1620000000000"
            className="object-cover w-full h-full rounded-none"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}
