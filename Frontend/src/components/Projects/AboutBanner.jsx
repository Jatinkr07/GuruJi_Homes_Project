/* eslint-disable react/no-unescaped-entities */
export default function AboutSection() {
  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl md:py-16">
      <h2 className="text-3xl font-[450] tracking-tight md:text-4xl text-center lg:mb-8 border-b-4 border-gray-900 lg:mx-[540px] pb-2">
        About
      </h2>

      <div className="flex flex-col lg:gap-8 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="relative -mt-16 lg:mt-0">
            <img
              src="/A-2.jpg"
              alt="Modern"
              className="object-contain h-[60vh] w-full hover:scale-105 transition-transform rounded-lg"
            />
          </div>
        </div>

        <div className="-mt-20 space-y-6 lg:mt-0 lg:w-1/2">
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="text-base leading-relaxed lg:text-lg text-muted-foreground">
              Adore Prima is a RERA Approved Adore housing project in
              Faridabad's sector 72-73 that offers 2 - 4 Bhk homes for sale. The
              main road is 45 metres wide, while the internal roads are 15 and 6
              metres wide. These apartments have four sides that are open,
              allowing for plenty of fresh air. The property is located in a
              gated community, and all of the flats are corner units with no
              shared walls, which is another highlight of the development. A
              huge area of 1000 to 1600 sq. ft. was used to construct the
              building. The faridabad flat price at Rs 31.20 lacs as a starting
              point (All inclusive). Both municipal companies and bore
              wells/tanks provide water to the flats.
            </p>
          </div>

          <div className="space-y-4 text-base lg:text-lg font-[400]">
            <p className="flex gap-2">
              <span>🏢</span>
              <span className="font-[400]">Project:</span>
              <span className="font-[300]">Adore Prima! 🎉</span>
            </p>
            <p className="flex gap-2">
              <span>📍</span>
              <span className="font-[400]">Location:</span>
              <span className="font-[300]">Sector 72-73, Faridabad</span>
            </p>
            <p className="flex gap-2">
              <span>🌐</span>
              <span className="font-[300]">
                Online Applications Opening Soon!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
