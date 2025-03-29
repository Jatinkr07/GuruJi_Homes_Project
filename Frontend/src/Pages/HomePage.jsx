import About from "../components/Home/About";
import Banner from "../components/Home/Banner";
import DreamHome from "../components/Home/DreamHome";
import ExploreProjects from "../components/Home/ExploreProjects";
import Hero from "../components/Home/Hero";
import OurBuilder from "../components/Home/OurBuilder";
// import ProjectBanner from "../components/Home/ProjectBanner";
import Testimonials from "../components/Home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      {/* <ProjectBanner /> */}
      <Banner />
      <ExploreProjects />
      <DreamHome />
      <OurBuilder />
      <Testimonials />
    </div>
  );
};

export default HomePage;
