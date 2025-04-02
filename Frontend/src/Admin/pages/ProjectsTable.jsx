// src/Admin/pages/Projects.jsx
import { useState } from "react";
import { Table, Button, Space, message, Tag, Tooltip } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  fetchStatuses,
  API_URL, // Add this import for image URL
} from "../../services/api";
import ProjectsForm from "../Form/ProjectsForm";
// import AmenitiesCards from "../../Pages/Projects/Amenities/Card";

const ProjectsTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const queryClient = useQueryClient();

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const { data: statuses, isLoading: statusesLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      message.success("Project created successfully");
      setIsModalVisible(false);
    },
    onError: (error) =>
      message.error(
        error.response?.data?.message || "Failed to create project"
      ),
  });

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      message.success("Project updated successfully");
      setIsModalVisible(false);
      setFormData(null);
    },
    onError: (error) =>
      message.error(
        error.response?.data?.message || "Failed to update project"
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      message.success("Project deleted successfully");
    },
    onError: (error) =>
      message.error(
        error.response?.data?.message || "Failed to delete project"
      ),
  });

  const columns = [
    {
      title: "S.No", // Serial Number column
      width: "5%",
      render: (_, __, index) => index + 1, // Display row number starting from 1
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "15%", // Adjusted width to fit new columns
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => (
        <Tooltip title="Click to view details">
          <span className="cursor-pointer hover:text-blue-500">{text}</span>
        </Tooltip>
      ),
    },
    { title: "Builder", dataIndex: ["builder", "name"], width: "10%" },
    { title: "Type", dataIndex: ["type", "name"], width: "10%" },
    { title: "Location", dataIndex: "location", width: "10%" },
    {
      title: "Price",
      dataIndex: "price",
      width: "10%",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `₹${price.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: ["status", "text"],
      width: "10%",
      render: (text) => {
        const colors = {
          available: "success",
          sold: "error",
          pending: "warning",
        };
        return (
          <Tag color={colors[text] || "default"}>{text.toUpperCase()}</Tag>
        );
      },
      filters:
        statuses?.map((status) => ({ text: status.text, value: status._id })) ||
        [],
      onFilter: (value, record) => record.status._id === value,
    },
    // {
    //   title: "Amenities",
    //   dataIndex: "amenities",
    //   width: "20%",
    //   render: (amenities) => <AmenitiesCards amenities={amenities} />,
    // },
    {
      title: "Banner Image", // New column for banner image preview
      dataIndex: "bannerImage",
      width: "10%",
      render: (bannerImage) =>
        bannerImage ? (
          <img
            src={`${API_URL}/${bannerImage}`}
            alt="Banner"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Action",
      key: "action",
      width: "15%", // Adjusted width
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => message.info(`Viewing details for ${record.title}`)}
            className="transition-colors hover:text-blue-500"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setFormData(record);
              setIsModalVisible(true);
            }}
            className="transition-colors hover:text-green-500"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteMutation.mutate(record._id)}
            className="transition-colors hover:text-red-500"
          />
        </Space>
      ),
    },
  ];

  const handleFormFinish = (formData) => {
    if (formData.get("id")) {
      updateMutation.mutate({ id: formData.get("id"), formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setFormData(null);
            setIsModalVisible(true);
          }}
          loading={projectsLoading || statusesLoading}
        >
          Add Project
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={projects}
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        pagination={{
          total: projects?.length || 0,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        loading={projectsLoading || statusesLoading}
        scroll={{ x: 1400 }} // Increased scroll width to accommodate new columns
        size="middle"
        bordered
        rowKey="_id"
      />

      <ProjectsForm
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setFormData(null);
        }}
        initialValues={formData}
        onFinish={handleFormFinish}
      />
    </div>
  );
};

export default ProjectsTable;
