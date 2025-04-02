/* eslint-disable react/prop-types */
import { API_URL } from "../../services/api";

export default function UnitPlans({ project }) {
  const floorPlans =
    project.floorPlan?.length > 0
      ? project.floorPlan.map((fp, index) => ({
          src: `${API_URL}/${fp.image}`,
          alt: `Floor Plan ${index + 1}`,
          text: fp.text,
        }))
      : [
          {
            src: "/U-1.jpeg",
            alt: "Default Floor Plan 1",
            text: "Default 2 BHK",
          },
          {
            src: "/U-2.jpeg",
            alt: "Default Floor Plan 2",
            text: "Default 4 BHK",
          },
        ];

  return (
    <div className="w-full max-w-6xl px-4 py-8 mx-auto md:py-16">
      <div className="mb-8 text-center md:mb-16">
        <h1 className="mb-4 text-3xl font-[400] text-gray-900 md:text-4xl">
          Floor Plan
        </h1>
        <p className="text-gray-600">
          {project.title} in {project.location}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {floorPlans.map((plan, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <img
              src={plan.src}
              alt={plan.alt}
              width={800}
              height={600}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
              {plan.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
