/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import HomePage from "./Pages/HomePage";
import Layout from "./UI/Layout";
import ProjectsPage from "./Pages/ProjectsPage.jsx";
import ProjectPage from "./Pages/Projects/ProjectPage";
import ParticularProjectsPage from "./Pages/Projects/ParticularProjectsPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import ScrollTop from "./components/hooks/ScrollTop";
import "./index.css";
import Login from "./Admin/Login";
import MainLayout from "./Admin/Layout/MainLayout";
import Dashboard from "./Admin/pages/Dashboard";
import Builders from "./Admin/pages/Builders.jsx";
import Types from "./Admin/pages/Types.jsx";
import Statuses from "./Admin/pages/Statuses.jsx";
import ProjectsTable from "./Admin/pages/ProjectsTable.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log("isAuth", isAuthenticated, isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

const App = () => {
  ScrollTop();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <AuthProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="builder" element={<Builders />} />
            <Route path="types" element={<Types />} />
            <Route path="status" element={<Statuses />} />
            <Route path="products" element={<ProjectsTable />} />
            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          </Route>

          {/* regular site routes for UI */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="/projects" element={<ProjectsPage />} /> */}
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/contactus" element={<ContactPage />} />
            <Route path="/explore/projects" element={<ProjectPage />} />
            <Route path="/projects/:id" element={<ProjectsPage />} />
            <Route
              path="/explore/projects/:id"
              element={<ParticularProjectsPage />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
