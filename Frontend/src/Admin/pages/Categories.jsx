/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Table, Button, Space, message, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoriesForm from "../Form/CategoryForm";

const Categories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockData = [
    {
      key: "1",
      name: "Electronics",
      subcategory: "Mobile Phones",
      image: "https://source.unsplash.com/random/100x100?electronics",
      status: "active",
      createdAt: "2023-01-15T10:30:00Z",
    },
    {
      key: "2",
      name: "Clothing",
      subcategory: "Men's Wear",
      image: "https://source.unsplash.com/random/100x100?clothing",
      status: "inactive",
      createdAt: "2023-06-20T14:45:00Z",
    },
    {
      key: "3",
      name: "Furniture",
      subcategory: "Living Room",
      image: "https://source.unsplash.com/random/100x100?furniture",
      status: "active",
      createdAt: "2024-02-10T09:15:00Z",
    },
  ];

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "key",
      width: "10%",
      render: (text, _, index) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "name",
      width: "20%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      searchable: true,
    },
    {
      title: "Subcategory",
      dataIndex: "subcategory",
      width: "20%",
      sorter: (a, b) => a.subcategory.localeCompare(b.subcategory),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "error"}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      width: "15%",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "15%",
      render: (image) => (
        <img
          src={image}
          alt="category"
          className="object-cover w-16 h-16 transition-shadow rounded shadow-sm hover:shadow-md"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="transition-colors hover:text-blue-500"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            className="transition-colors hover:text-red-500"
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setFormData(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Category deleted successfully");
      setLoading(false);
    }, 500);
  };

  const handleFormFinish = () => {
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
          onClick={() => {
            setFormData(null);
            setIsModalVisible(true);
          }}
          loading={loading}
        >
          Add Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mockData}
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        pagination={{
          total: mockData.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        loading={loading}
        scroll={{ x: 1000 }}
        size="middle"
        bordered
      />

      <CategoriesForm
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
