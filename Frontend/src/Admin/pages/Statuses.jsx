import { useState, useMemo } from "react";
import { Table, Button, Space, message, Popconfirm, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchStatuses,
  createStatus,
  updateStatus,
  deleteStatus,
} from "../../services/api.js";
import StatusForm from "../Form/StatusForm.jsx";

const Statuses = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const { data: statuses, isLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const createMutation = useMutation({
    mutationFn: createStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["statuses"]);
      message.success("Status created successfully");
      setIsModalVisible(false);
    },
    onError: (error) =>
      message.error(error.response?.data?.message || "Failed to create status"),
  });

  const updateMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["statuses"]);
      message.success("Status updated successfully");
      setIsModalVisible(false);
      setEditingStatus(null);
    },
    onError: (error) =>
      message.error(error.response?.data?.message || "Failed to update status"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["statuses"]);
      message.success("Status deleted successfully");
    },
    onError: (error) =>
      message.error(error.response?.data?.message || "Failed to delete status"),
  });

  const filteredStatuses = useMemo(
    () =>
      statuses?.filter((status) =>
        status.text.toLowerCase().includes(searchText.toLowerCase())
      ) || [],
    [statuses, searchText]
  );

  const columns = [
    { title: "S.No", render: (_, __, index) => index + 1, width: 70 },
    {
      title: "Text",
      dataIndex: "text",
      sorter: (a, b) => a.text?.localeCompare(b.text || "") || 0,
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
              setEditingStatus(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this status?"
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
        <h1 className="text-2xl font-bold text-gray-800">Status Management</h1>
        <Space>
          <Input
            placeholder="Search statuses..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingStatus(null);
              setIsModalVisible(true);
            }}
          >
            Add Status
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredStatuses}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
      />

      <StatusForm
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingStatus(null);
        }}
        initialValues={editingStatus}
        onFinish={handleFormFinish}
      />
    </div>
  );
};

export default Statuses;
