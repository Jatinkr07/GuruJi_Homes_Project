/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Select, message } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProjects, submitEnquiry } from "../../services/api";
import { useState } from "react";

const { Option } = Select;

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.3 } },
  blur: { scale: 1, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export default function EnquiryForm({ project }) {
  const queryClient = useQueryClient();
  const initialProjectId = project?._id || "";
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
    projectId: initialProjectId,
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const mutation = useMutation({
    mutationFn: submitEnquiry,
    onSuccess: () => {
      message.success("Enquiry submitted successfully! Check your email.");
      setFormData({
        name: "",
        number: "",
        email: "",
        message: "",
        projectId: initialProjectId,
      });
      queryClient.invalidateQueries(["enquiries"]);
    },
    onError: () => {
      message.error("Failed to submit enquiry or send email");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (value) => {
    setFormData((prev) => ({ ...prev, projectId: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="flex flex-col items-stretch gap-6 mb-12 md:flex-row lg:px-44">
      <motion.div
        className="w-full p-6 bg-gray-100 rounded-lg shadow-md md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Enquiry</h2>
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
          <Select
            placeholder="Select Project"
            value={formData.projectId}
            onChange={handleProjectChange}
            className="w-full"
            size="large"
            allowClear
          >
            {projects?.map((proj) => (
              <Option key={proj._id} value={proj._id}>
                {proj.title}
              </Option>
            ))}
          </Select>
          <motion.textarea
            variants={inputVariants}
            whileFocus="focus"
            whileBlur="blur"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-4 py-2 font-semibold text-white bg-black border border-black hover:text-black hover:bg-white"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Submitting..." : "Submit"}
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        className="relative w-full h-64 md:w-1/2 md:h-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/projects/P-5.jpg"
          alt="Dream Home"
          className="object-cover w-full h-full rounded-lg md:rounded-l-none"
        />
      </motion.div>
    </div>
  );
}
