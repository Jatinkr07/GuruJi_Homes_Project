export default function UnitPlans() {
  return (
    <div className="w-full max-w-6xl px-4 py-8 mx-auto md:py-16">
      <div className="mb-8 text-center md:mb-16">
        <h1 className="mb-4 text-3xl font-[400] text-gray-900 md:text-4xl">
          Floor Plan
        </h1>
        <p className="text-gray-600">
          Adore prima is a Luxury housing project by Adore in sector 72-73
          Faridabad.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {/* <div className="bg-gray-200 rounded-lg shadow-lg "> */}
        {/* <h2 className="mb-6 text-xl font-bold text-center text-gray-900 md:text-2xl">
            PROPOSED 2 BHK UNIT PLAN
          </h2> */}
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <div className="transition-transform duration-300 hover:scale-105">
            <img
              src="/U-1.jpeg"
              alt="2 BHK Floor Plan"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
          {/* </div> */}
          {/* <div className="mt-4 text-center text-gray-600">
            <p>Super Area: 1000 Sqft.</p>
          </div> */}
        </div>

        {/* <div className="bg-gray-100 rounded-lg shadow-lg "> */}
        {/* <h2 className="mb-6 text-xl font-bold text-center text-gray-900 md:text-2xl">
            PROPOSED 4 BHK UNIT PLAN
          </h2> */}
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <div className="transition-transform duration-300 hover:scale-105">
            <img
              src="/U-2.jpeg"
              alt="4 BHK Floor Plan"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
          {/* </div>
          <div className="mt-4 text-center text-gray-600">
            <p>Super Area: 1600 Sqft.</p>
            <p>Carpet Area: 968 Sqft.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
