import AboutBanner from "../components/Projects/AboutBanner";
import Banner from "../components/Projects/Banner";
import ContactSection from "../components/Projects/ContactSection";
import GallerySection from "../components/Projects/GallerySection";
import HighlighterBanner from "../components/Projects/HighlighterBanner";
import UnitPlans from "../components/Projects/UnitPlans";

const ProjectsPage = () => {
  return (
    <div>
      <Banner />
      <AboutBanner />
      <HighlighterBanner />
      <UnitPlans />
      <GallerySection />
      <ContactSection />
    </div>
  );
};

export default ProjectsPage;
