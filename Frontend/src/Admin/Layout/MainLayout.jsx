import { useState } from "react";
import { Layout, Menu, Button, theme, Spin } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isLoading } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/builder",
      icon: <AppstoreOutlined />,
      label: "Builder",
    },
    {
      key: "/admin/types",
      icon: <AppstoreOutlined />,
      label: "Types",
    },
    {
      key: "/admin/status",
      icon: <AppstoreOutlined />,
      label: "Status",
    },
    { key: "/admin/products", icon: <ShoppingOutlined />, label: "Products" },
  ];

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <motion.div
          className="p-4 text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>
            Admin Panel
          </h1>
        </motion.div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
        <Menu
          theme="dark"
          mode="inline"
          className="absolute w-full"
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: handleLogout,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
