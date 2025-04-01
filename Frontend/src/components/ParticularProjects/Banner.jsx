const Banner = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200 ">
      <section className="relative w-full h-[450px] md:h-[400px] lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-black blur-[2px] bg-opacity-20 backdrop-blur-lg">
          <img
            src="/projects/P-3.jpg"
            alt="Banner"
            className="object-cover w-full h-full mix-blend-overlay"
          />
        </div>
      </section>
    </div>
  );
};

export default Banner;
