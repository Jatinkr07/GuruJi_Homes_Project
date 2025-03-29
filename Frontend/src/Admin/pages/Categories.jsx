import { useState } from "react";
import { Table, Button, Space, message, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/api.js";
import CategoryForm from "../Form/CategoryForm.jsx";

const Categories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      message.success("Category created successfully");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to create category"
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      message.success("Category updated successfully");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to update category"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      message.success("Category deleted successfully");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to delete category"
      );
    },
  });

  const columns = [
    {
      title: "Serial No.",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Subcategories",
      dataIndex: "subCategories",
      render: (subCategories) => subCategories.map((sc) => sc.name).join(", "),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "error"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img
          src={`http://localhost:6001/${image}`}
          alt="category"
          className="object-cover w-16 h-16"
        />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setFormData(record);
              setIsModalVisible(true);
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteMutation.mutate(record._id)}
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
    setIsModalVisible(false);
    setFormData(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      <CategoryForm
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

export default Categories;
