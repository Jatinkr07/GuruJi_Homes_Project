/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "antd";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col h-full overflow-hidden border border-gray-200 rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[300px] overflow-hidden">
        <Link to="/explore/projects/:id">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.name}
              className="object-cover"
            />
          </motion.div>
        </Link>
        <div className="absolute px-3 py-1 text-xs font-medium uppercase bg-white bottom-4 left-4">
          {project.feature}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="mb-1 text-sm text-gray-600 uppercase">
              {project.location}
            </div>
            <h3 className="text-lg font-bold">{project.name}</h3>
          </div>
          {/* <div className="transition-colors bg-white border-2 border-gray-800 rounded-full cursor-pointer hover:bg-gray-50">
            <PlusOutlined className="m-1 " />
          </div> */}
        </div>

        {project.isNewLaunch && (
          <div className="mb-4">
            <Badge
              count="NEW LAUNCH"
              style={{
                backgroundColor: "#fff",
                color: "#1890ff",
                borderColor: "#1890ff",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
          </div>
        )}

        <div className="pt-4 mt-auto border-t border-gray-200">
          <div className="flex justify-between mb-2 text-sm">
            <div>
              <span className="font-medium">
                INR {project.price} Cr. onwards
              </span>
            </div>
            <div>
              <span className="text-gray-600">Possession Date</span>{" "}
              <span className="font-medium">{project.possessionDate}</span>
            </div>
          </div>
          <div className="text-sm font-medium">{project.configuration}</div>
        </div>
      </div>
    </div>
  );
}
