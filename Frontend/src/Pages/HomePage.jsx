import About from "../components/Home/About";
import DreamHome from "../components/Home/DreamHome";
import Hero from "../components/Home/Hero";
import OurBuilder from "../components/Home/OurBuilder";
import ProjectBanner from "../components/Home/ProjectBanner";
import Testimonials from "../components/Home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <ProjectBanner />
      <DreamHome />
      <OurBuilder />
      <Testimonials />
    </div>
  );
};

export default HomePage;
