import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./UI/Layout";
import ProjectsPage from "./Pages/ProjectsPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import ScrollTop from "./components/hooks/ScrollTop";

const App = () => {
  ScrollTop();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/contactus" element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

export default App;
