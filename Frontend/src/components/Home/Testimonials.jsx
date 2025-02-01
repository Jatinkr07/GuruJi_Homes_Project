/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    text: "Working with Guruji Homes was an absolute pleasure.The moment we contacted them, they guided us through the entire buying process with patience and professionalism.",
    name: "Amit",
    role: "",
    image: "/Project1.jpg",
  },
  {
    id: 2,
    text: "We had been searching for months, but it wasn't until we worked with Guruji Homes that we truly felt supported. Their team is knowledgeable and professional.",
    name: "Manish",
    role: "SELLING AGENTING",
    image: "/Project2.jpg",
  },
  {
    id: 3,
    text: "What really sets Guruji Homes apart is their genuine care for their clients. From start to finish, they made sure we were informed and comfortable with every decision we made.  ",
    name: "Neha",
    role: "SELLING AGENTING",
    image: "/Project3.jpg",
  },
  {
    id: 4,
    text: "As real estate investors, we've worked with many agencies, but Guruji Homes stands out. Their market knowledge, attention to detail, and personalized approach.",
    name: "Ravi",
    role: "SELLING AGENTING",
    image: "/Project4.jpg",
  },
  {
    id: 5,
    text: "As first-time homebuyers, we were nervous and overwhelmed by the entire process. But the Guruji Homes was patient and supportive throughout. They helped us in every detail.",
    name: "Simran",
    role: "SELLING AGENTING",
    image: "/Project1.jpg",
  },
  {
    id: 6,
    text: "Guruji Homes wasn't just a real estate company to us—they became our trusted partner in this journey. They understood our needs, provided expert advice.",
    name: "Divya",
    role: "SELLING AGENTING",
    image: "/Project2.jpg",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="px-4 py-8 mx-auto lg:py-16 max-w-7xl">
      <div className="mb-12 text-center">
        <span className="inline-block px-4 py-1 mb-4 text-sm text-red-400 rounded-full bg-red-50">
          Our Testimonial
        </span>
        <h2 className="text-4xl font-[550]">Clients Feedback</h2>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="px-4"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col h-full p-8 mb-12 bg-white border rounded-lg shadow-lg">
                <blockquote className="flex-grow mb-6 overflow-y-auto text-gray-600">
                  <p className="line-clamp-6">{testimonial.text}</p>
                </blockquote>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    {/* <p className="text-sm text-gray-500">{testimonial.role}</p> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevRef}
          className="absolute left-0 lg:-left-[50px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border-2 border-orange-400 rounded-full shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          ref={nextRef}
          className="absolute lg:-right-[50px] border-2 border-orange-400 right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
