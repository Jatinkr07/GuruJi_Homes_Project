import { Outlet } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const Layout = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1, padding: "0px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
