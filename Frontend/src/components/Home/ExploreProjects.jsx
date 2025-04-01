import { useState } from "react";
import { motion } from "framer-motion";
import image1 from "/projects/P-1.jpg";
import image2 from "/projects/P-2.jpg";
import image3 from "/projects/P-3.jpg";
import image4 from "/projects/P-4.jpg";
import image5 from "/projects/P-5.jpg";
import image6 from "/projects/P-6.jpg";
import { Link } from "react-router-dom";

export default function ExploreProjects() {
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [
    {
      id: 1,
      image: `${image1}`,
      location: "HINJEWADI, PUNE",
      name: "The Greenfront at Godrej Park World",
      price: "INR 1.19 Cr. onwards",
      possession: "Mar 2030",
      configuration: "2, 3 & 4 BHK",
      isNewLaunch: true,
    },
    {
      id: 2,
      image: `${image2}`,
      location: "SECTOR 54, GURUGRAM",
      name: "Godrej Astra",
      price: "INR 10.34 Cr. onwards",
      possession: "Jan 2031",
      configuration: "3 & 4 BHK",
      isNewLaunch: true,
    },
    {
      id: 3,
      image: `${image3}`,
      location: "KOKAPET, HYDERABAD",
      name: "Godrej Madison Avenue",
      price: "INR 2.75 Cr. onwards",
      possession: "Dec 2029",
      configuration: "3 & 4+ BHK",
      isNewLaunch: true,
    },
    {
      id: 4,
      image: `${image4}`,
      location: "HINJEWADI, PUNE",
      name: "The Greenfront at Godrej Park World",
      price: "INR 1.19 Cr. onwards",
      possession: "Mar 2030",
      configuration: "2, 3 & 4 BHK",
      isNewLaunch: true,
    },
    {
      id: 5,
      image: `${image5}`,
      location: "SECTOR 54, GURUGRAM",
      name: "Godrej Astra",
      price: "INR 10.34 Cr. onwards",
      possession: "Jan 2031",
      configuration: "3 & 4 BHK",
      isNewLaunch: true,
    },
    {
      id: 6,
      image: `${image6}`,
      location: "KOKAPET, HYDERABAD",
      name: "Godrej Madison Avenue",
      price: "INR 2.75 Cr. onwards",
      possession: "Dec 2029",
      configuration: "3 & 4+ BHK",
      isNewLaunch: true,
    },
  ];

  return (
    <div className="w-full px-4 py-16 bg-white md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1460px]">
        <h1 className="mb-12 text-4xl font-bold text-black md:text-5xl">
          Explore Our Projects
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-sm hover:shadow-md"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="relative"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative h-[350px] w-full overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="object-cover transition-transform duration-500"
                    style={{
                      transform:
                        hoveredId === project.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-3xl"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between">
                  <div className="mb-1 text-sm font-medium text-gray-600">
                    {project.location}
                  </div>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="top-4 left-4"
                  >
                    {/* <Button
                      type="default"
                      shape="circle"
                      icon={<PlusOutlined />}
                      className="flex items-center justify-center bg-white border-2 border-gray-800 shadow-md"
                      size="medium"
                    /> */}
                  </motion.div>
                </div>
                <h3 className="mb-3 text-lg font-bold text-black">
                  {project.name}
                </h3>

                {project.isNewLaunch && (
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-5 h-5 mr-2 bg-blue-500 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-xs font-medium text-blue-500">
                        NEW LAUNCH
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-black">
                      {project.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Possession Date {project.possession}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {project.configuration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
