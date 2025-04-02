import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, API_URL } from "../../services/api";
import { Tag } from "antd";

export default function ExploreProjects() {
  const [hoveredId, setHoveredId] = useState(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const projectData =
    projects?.map((project) => ({
      id: project._id,
      bannerImage: project.bannerImage
        ? `${API_URL}/${project.bannerImage}`
        : "/placeholder.svg",
      title: project.title,
      price: `INR ${project.price.toLocaleString()} onwards`,
      status: project.status?.text || "N/A",
      location: project.location,
    })) || [];

  return (
    <div className="w-full px-4 py-16 bg-white md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1460px]">
        <h1 className="mb-12 text-4xl font-bold text-black md:text-5xl">
          Explore Properties
        </h1>
        {isLoading ? (
          <div className="text-center">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectData.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <motion.div
                  className="relative overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-sm hover:shadow-md"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative h-[350px] w-full overflow-hidden">
                    <img
                      src={project.bannerImage}
                      alt={project.title}
                      className="object-cover transition-transform duration-500"
                      style={{
                        transform:
                          hoveredId === project.id ? "scale(1.05)" : "scale(1)",
                      }}
                      onError={(e) => (e.target.src = "/placeholder.svg")}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-3xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-1 text-sm font-medium text-gray-600">
                      {project.location}
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-black">
                      {project.title}
                    </h3>
                    <div className="flex items-center mb-3">
                      <Tag
                        color={
                          project.status === "available" ? "success" : "warning"
                        }
                      >
                        {project.status.toUpperCase()}
                      </Tag>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium text-black">
                        {project.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-10">
          <Link to="/explore/projects">
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
    </div>
  );
}
