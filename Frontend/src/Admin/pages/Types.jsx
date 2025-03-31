import { useState, useMemo } from "react";
import { Table, Button, Space, message, Popconfirm, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTypes,
  createType,
  updateType,
  deleteType,
  API_URL,
} from "../../services/api.js";
import TypeForm from "../Form/TypeForm.jsx";

const Types = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const { data: types, isLoading } = useQuery({
    queryKey: ["types"],
    queryFn: fetchTypes,
  });

  const createMutation = useMutation({
    mutationFn: createType,
    onSuccess: () => {
      queryClient.invalidateQueries(["types"]);
      message.success("Type created successfully");
      setIsModalVisible(false);
    },
    onError: (error) =>
      message.error(error.response?.data?.message || "Failed to create type"),
  });

  const updateMutation = useMutation({
    mutationFn: updateType,
    onSuccess: () => {
      queryClient.invalidateQueries(["types"]);
      message.success("Type updated successfully");
      setIsModalVisible(false);
      setEditingType(null);
    },
    onError: (error) =>
      message.error(error.response?.data?.message || "Failed to update type"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteType,
    onSuccess: () => {
      queryClient.invalidateQueries(["types"]);
      message.success("Type deleted successfully");
    },
    onError: (error) =>
      message.error(error.response?.data?.message || "Failed to delete type"),
  });

  const filteredTypes = useMemo(
    () =>
      types?.filter((type) =>
        type.name.toLowerCase().includes(searchText.toLowerCase())
      ) || [],
    [types, searchText]
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
            alt="type"
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
              setEditingType(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this type?"
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
        <h1 className="text-2xl font-bold text-gray-800">Type Management</h1>
        <Space>
          <Input
            placeholder="Search types..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingType(null);
              setIsModalVisible(true);
            }}
          >
            Add Type
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredTypes}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
      />

      <TypeForm
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingType(null);
        }}
        initialValues={editingType}
        onFinish={handleFormFinish}
      />
    </div>
  );
};

export default Types;
