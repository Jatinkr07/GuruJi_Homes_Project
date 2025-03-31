import { useState, useMemo } from "react";
import { Table, Button, Space, message, Popconfirm, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBuilders,
  createBuilder,
  updateBuilder,
  deleteBuilder,
  API_URL,
} from "../../services/api.js";
import BuilderForm from "../Form/BuilderForm.jsx";

const Builders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBuilder, setEditingBuilder] = useState(null);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const { data: builders, isLoading } = useQuery({
    queryKey: ["builders"],
    queryFn: fetchBuilders,
  });

  const createMutation = useMutation({
    mutationFn: createBuilder,
    onSuccess: () => {
      queryClient.invalidateQueries(["builders"]);
      message.success("Builder created successfully");
      setIsModalVisible(false);
    },
    onError: (error) =>
      message.error(
        error.response?.data?.message || "Failed to create builder"
      ),
  });

  const updateMutation = useMutation({
    mutationFn: updateBuilder,
    onSuccess: () => {
      queryClient.invalidateQueries(["builders"]);
      message.success("Builder updated successfully");
      setIsModalVisible(false);
      setEditingBuilder(null);
    },
    onError: (error) =>
      message.error(
        error.response?.data?.message || "Failed to update builder"
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBuilder,
    onSuccess: () => {
      queryClient.invalidateQueries(["builders"]);
      message.success("Builder deleted successfully");
    },
    onError: (error) =>
      message.error(
        error.response?.data?.message || "Failed to delete builder"
      ),
  });

  const filteredBuilders = useMemo(
    () =>
      builders?.filter((builder) =>
        builder.name.toLowerCase().includes(searchText.toLowerCase())
      ) || [],
    [builders, searchText]
  );

  const columns = [
    { title: "S.No", render: (_, __, index) => index + 1, width: 70 },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name?.localeCompare(b.name || "") || 0,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) =>
        image ? (
          <img
            src={`${API_URL}/${image}`}
            alt="builder"
            className="object-cover w-16 h-16 rounded"
          />
        ) : (
          "No image"
        ),
      width: 100,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
      sorter: (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingBuilder(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this builder?"
            onConfirm={() => deleteMutation.mutate(record._id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
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
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Builder Management</h1>
        <Space>
          <Input
            placeholder="Search builders..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingBuilder(null);
              setIsModalVisible(true);
            }}
          >
            Add Builder
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredBuilders}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
      />

      <BuilderForm
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingBuilder(null);
        }}
        initialValues={editingBuilder}
        onFinish={handleFormFinish}
      />
    </div>
  );
};

export default Builders;
