import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "../services/api";
import AboutSection from "../components/Projects/AboutBanner";
import Banner from "../components/Projects/Banner";
import ContactSection from "../components/Projects/ContactSection";
import GallerySection from "../components/Projects/GallerySection";
import HighlighterBanner from "../components/Projects/HighlighterBanner";
import UnitPlans from "../components/Projects/UnitPlans";
import { CircleLoader } from "react-spinners";
import AmenitiesSection from "../components/Projects/AmenitiesSection";
import BrochureSection from "../components/Projects/BrochureSection";
import SitePlanSection from "../components/Projects/SitePlanSections";

const ProjectsPage = () => {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProjectById(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-44">
        <CircleLoader />
      </div>
    );
  if (!project)
    return <div className="py-16 text-center">Project not found</div>;

  return (
    <div>
      <Banner project={project} />
      <AboutSection project={project} />
      <HighlighterBanner project={project} />
      <AmenitiesSection project={project} />
      <UnitPlans project={project} />
      <SitePlanSection project={project} />
      <BrochureSection project={project} />
      <GallerySection project={project} />
      <ContactSection project={project} />
    </div>
  );
};

export default ProjectsPage;
