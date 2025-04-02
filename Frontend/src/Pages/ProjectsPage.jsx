import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "../services/api";
import AboutSection from "../components/Projects/AboutBanner";
import Banner from "../components/Projects/Banner";
import ContactSection from "../components/Projects/ContactSection";
import GallerySection from "../components/Projects/GallerySection";
import HighlighterBanner from "../components/Projects/HighlighterBanner";
import UnitPlans from "../components/Projects/UnitPlans";

const ProjectsPage = () => {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProjectById(id),
    enabled: !!id,
  });

  if (isLoading)
    return <div className="py-16 text-center">Loading project...</div>;
  if (!project)
    return <div className="py-16 text-center">Project not found</div>;

  return (
    <div>
      <Banner project={project} />
      <AboutSection project={project} />
      <HighlighterBanner project={project} />
      <UnitPlans project={project} />
      <GallerySection project={project} />
      <ContactSection project={project} />
    </div>
  );
};

export default ProjectsPage;
