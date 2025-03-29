/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Table, Button, Space, message, Tag, Tooltip } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import ProductsForm from "../Form/ProductsForm";

const ProductsTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockData = [
    {
      key: "1",
      title: "Luxury Downtown Apartment",
      category: "residential",
      subcategory: "apartment",
      location: "New York City",
      price: 750000,
      status: "available",
      amenities: ["lift", "parking", "gym"],
      createdAt: "2023-03-10T14:30:00Z",
    },
    {
      key: "2",
      title: "Modern Office Suite",
      category: "commercial",
      subcategory: "office",
      location: "San Francisco",
      price: 1200000,
      status: "sold",
      amenities: ["cctv", "security"],
      createdAt: "2023-08-15T09:15:00Z",
    },
    {
      key: "3",
      title: "Spacious Villa",
      category: "residential",
      subcategory: "villa",
      location: "Los Angeles",
      price: 2500000,
      status: "pending",
      amenities: ["pool", "parking", "cctv"],
      createdAt: "2024-01-20T11:45:00Z",
    },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "20%",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => (
        <Tooltip title="Click to view details">
          <span className="cursor-pointer hover:text-blue-500">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "15%",
      filters: [
        { text: "Residential", value: "residential" },
        { text: "Commercial", value: "commercial" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Location",
      dataIndex: "location",
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      render: (status) => {
        const colors = {
          available: "success",
          sold: "error",
          pending: "warning",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        { text: "Available", value: "available" },
        { text: "Sold", value: "sold" },
        { text: "Pending", value: "pending" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      width: "15%",
      render: (amenities) => (
        <Space size={[0, 4]} wrap>
          {amenities.map((amenity) => (
            <Tag key={amenity} color="blue">
              {amenity}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            className="transition-colors hover:text-blue-500"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="transition-colors hover:text-green-500"
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

  const handleView = (record) =>
    message.info(`Viewing details for ${record.title}`);

  const handleEdit = (record) => {
    setFormData(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Product deleted successfully");
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
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setFormData(null);
            setIsModalVisible(true);
          }}
          loading={loading}
        >
          Add Product
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
        scroll={{ x: 1200 }}
        size="middle"
        bordered
      />

      <ProductsForm
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

export default ProductsTable;
