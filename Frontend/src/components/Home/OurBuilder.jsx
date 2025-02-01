import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const builders = [
  { name: "Adore", logo: "/our1.png" },
  { name: "Amolik", logo: "/our2.png" },
  { name: "Omaxe", logo: "/our3.webp" },
  { name: "Navraj", logo: "/our.png" },
  { name: "RPS", logo: "/our3.png" },
  { name: "Adore", logo: "/our1.png" },
  { name: "Amolik", logo: "/our2.png" },
  { name: "Omaxe", logo: "/our3.webp" },
  { name: "Navraj", logo: "/our.png" },
  { name: "RPS", logo: "/our3.png" },
];

export default function OurBuilder() {
  return (
    <section className="py-6 bg-gray-100 lg:py-12">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">Our Builders</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="mySwiper"
        >
          {builders.map((builder, index) => (
            <SwiperSlide key={index}>
              {builder.name === "Adore" ? (
                <div className="flex items-center justify-center h-32 p-4 bg-red-500 rounded-lg shadow-md">
                  <img
                    src={builder.logo || "/placeholder.svg"}
                    alt={`${builder.name} logo`}
                    className="object-contain w-auto max-h-24"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 p-4 bg-white rounded-lg shadow-md">
                  <img
                    src={builder.logo || "/placeholder.svg"}
                    alt={`${builder.name} logo`}
                    className="object-contain w-auto max-h-24"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
