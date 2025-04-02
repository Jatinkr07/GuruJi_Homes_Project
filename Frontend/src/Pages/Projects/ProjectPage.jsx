import { useState } from "react";
import { motion } from "framer-motion";
import { Input, Select, Pagination, Button } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, API_URL } from "../../services/api.js";
import ProjectCard from "./ProjectCard";

export default function ProjectPage() {
  const [searchValue, setSearchValue] = useState("");
  const [newLaunchesOnly, setNewLaunchesOnly] = useState(false);
  const [propertyType, setPropertyType] = useState(null);
  const [status, setStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const projectData =
    projects?.map((project) => ({
      id: project._id,
      image: project.bannerImage
        ? `${API_URL}/${project.bannerImage}`
        : "/placeholder.svg",
      name: project.title,
      price: project.price,
      location: project.location,
      type: project.type?.name || "Unknown",
      status: project.status?.text || "Unknown",
      isNewLaunch: project.status?.text === "available",
    })) || [];

  const filteredProjects = projectData.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const matchesNewLaunch = newLaunchesOnly ? project.isNewLaunch : true;
    const matchesType = propertyType ? project.type === propertyType : true;
    const matchesStatus = status ? project.status === status : true;
    return matchesSearch && matchesNewLaunch && matchesType && matchesStatus;
  });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleReset = () => {
    setSearchValue("");
    setNewLaunchesOnly(false);
    setPropertyType(null);
    setStatus(null);
    setCurrentPage(1);
  };

  return (
    <div className="container px-4 py-[136px] mx-auto lg:py-44 max-w-9xl">
      <div className="mb-6">
        <Input
          placeholder="Enter Project Name"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full px-4 py-3 rounded-full max-w-9xl"
          size="large"
        />
      </div>

      <div className="p-4 mb-6 bg-white lg:ml-[1000px]">
        <div className="grid items-center grid-cols-3 gap-4 md:grid-cols-3">
          <Select
            placeholder="Property Type"
            value={propertyType}
            onChange={setPropertyType}
            suffixIcon={<DownOutlined />}
            className="w-full"
            size="large"
            options={Array.from(new Set(projectData.map((p) => p.type))).map(
              (type) => ({
                value: type,
                label: type,
              })
            )}
            allowClear
            loading={isLoading}
          />
          <Select
            placeholder="Status"
            value={status}
            onChange={setStatus}
            suffixIcon={<DownOutlined />}
            className="w-full"
            size="large"
            options={Array.from(new Set(projectData.map((p) => p.status))).map(
              (status) => ({
                value: status,
                label: status,
              })
            )}
            allowClear
            loading={isLoading}
          />
          <Button
            type="primary"
            onClick={handleReset}
            className="w-full h-10 bg-gray-900 hover:bg-gray-800 md:w-auto"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="relative inline-block px-8 text-[26px] font-bold lg:text-2xl">
          <span className="relative z-10">EXPLORE HOMES</span>
          <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-300"></div>
        </h2>
      </motion.div>

      {isLoading ? (
        <div className="text-center">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      )}

      {filteredProjects.length > pageSize && (
        <div className="flex justify-center mt-10">
          <Pagination
            current={currentPage}
            onChange={setCurrentPage}
            total={filteredProjects.length}
            pageSize={pageSize}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
