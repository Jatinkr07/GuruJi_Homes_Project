export default function GallerySection() {
  const galleryImages = [
    {
      src: "/G-1.jpg",
      alt: "Night view of Adore prima luxury apartments",
    },
    {
      src: "/G-2.jpg",
      alt: "Furnished balcony with city view",
    },
    {
      src: "/G-3.jpg",
      alt: "Highway light trails at dusk",
    },
    {
      src: "/G-4.jpg",
      alt: "Modern lounge area",
    },
    {
      src: "/G-5.jpg",
      alt: "Balcony seating area with plants",
    },
    {
      src: "/G-6.jpg",
      alt: "Fully equipped gym",
    },
  ];

  return (
    <section className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl font-[400] text-[#1a1b4b] mb-4">Gallery</h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-600">
          Adore prima is a Luxury housing project by Adore in sector 72-73
          Faridabad.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] overflow-hidden rounded-lg"
          >
            <img
              src={image.src || "/placeholder.svg"}
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
