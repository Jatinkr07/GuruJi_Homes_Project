/* eslint-disable react/prop-types */
export default function AboutBanner({ project }) {
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
              {project.description || "No description available."}
            </p>
          </div>
          <div className="space-y-4 text-base lg:text-lg font-[400]">
            <p className="flex gap-2">
              <span>🏢</span>
              <span className="font-[400]">Project:</span>
              <span className="font-[300]">{project.title}</span>
            </p>
            <p className="flex gap-2">
              <span>📍</span>
              <span className="font-[400]">Location:</span>
              <span className="font-[300]">{project.location}</span>
            </p>
            <p className="flex gap-2">
              <span>💰</span>
              <span className="font-[400]">Price:</span>
              <span className="font-[300]">
                INR {project.price.toLocaleString()} onwards
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
