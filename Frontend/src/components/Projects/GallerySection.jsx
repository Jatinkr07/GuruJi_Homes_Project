/* eslint-disable react/prop-types */
import { API_URL } from "../../services/api";

export default function GallerySection({ project }) {
  const galleryImages =
    project.images?.length > 0
      ? project.images.map((img, index) => ({
          src: `${API_URL}/${img}`,
          alt: `${project.title} Image ${index + 1}`,
        }))
      : [
          { src: "/G-1.jpg", alt: "Default Gallery Image 1" },
          { src: "/G-2.jpg", alt: "Default Gallery Image 2" },
        ];

  return (
    <section className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl font-[400] text-[#1a1b4b] mb-4">Gallery</h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-600">
          {project.title} in {project.location}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] overflow-hidden rounded-lg"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
