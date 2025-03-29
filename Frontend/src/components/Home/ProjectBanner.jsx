// import { Link } from "react-router-dom";
// import { HiArrowLongRight } from "react-icons/hi2";

import { Link } from "react-router-dom";

const projects = [
  {
    title: "Commercial",
    description:
      "Unlock prime commercial real estate opportunities with modern office spaces, high-visibility retail locations, and spacious warehouses tailored for business success. Whether you need a corporate office, a storefront in a high-footfall area, or industrial storage solutions, we provide properties in strategic locations.",
    image: "/c-1.webp",
  },
  {
    title: "Residential",
    description:
      "Find your perfect residential property, from luxurious homes with top-tier amenities to affordable apartments and family-friendly neighborhoods. Enjoy modern designs, secure communities, and easy access to essential services. Whether you're buying, renting, or investing, our listings include high-value vacation homes and rental properties that offer comfort and strong ROI potential.",
    image: "/r-3.jpg",
  },
  // {
  //   title: "Desert Oasis",
  //   description:
  //     "Seamlessly blending with its natural surroundings, this project redefines luxury living in harmony with the desert landscape.",
  //   image: "/Project3.jpg",
  // },
  // {
  //   title: "Forest Retreat",
  //   description:
  //     "A contemporary interpretation of woodland living, this project creates a perfect balance between architecture and nature.",
  //   image: "Project4.jpg",
  // },
];

export default function ProjectBanner() {
  return (
    <section className="container w-full py-8 lg:px-44 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-sm tracking-widest uppercase lg:mb-4 text-muted-foreground">
          Projects
        </h2>
        <h1 className="mb-16 text-2xl font-[500] tracking-tight sm:text-5xl md:text-6xl">
          Make it with passion.
        </h1>
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`flex flex-col gap-4 lg:gap-8 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg lg:w-2/3 -mt-12 lg:mt-0">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="object-cover"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-center lg:w-1/3">
                <div className="space-y-6">
                  <div className="space-y-4">
                    {/* <p className="text-sm text-muted-foreground">
                      {project.year}
                    </p> */}
                    <h3 className="text-xl lg:text-3xl font-[500] tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  {/* <Link
                    to="#"
                    className="inline-flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                  >
                    <span>READ</span>
                    <HiArrowLongRight className="w-4 h-4" />
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 ">
          <Link to="/projects">
            {" "}
            <button className="px-3 py-2 text-white bg-black border-2 border-black hover:bg-white hover:text-black hover:border-2">
              View More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
