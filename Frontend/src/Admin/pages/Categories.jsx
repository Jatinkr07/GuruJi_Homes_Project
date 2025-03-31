import { useState, useMemo } from "react";
import { Table, Button, Space, message, Popconfirm, Input, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  API_URL,
} from "../../services/api.js";
import CategoryForm from "../Form/CategoryForm.jsx";

const Categories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
      setIsModalVisible(false);
    },
    onError: (error) =>
      message.error(
        error.response?.data?.message || "Failed to create category"
      ),
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      message.success("Category updated successfully");
      setIsModalVisible(false);
      setEditingCategory(null);
    },
    onError: (error) =>
      message.error(
        error.response?.data?.message || "Failed to update category"
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      message.success("Category deleted successfully");
    },
    onError: (error) =>
      message.error(
        error.response?.data?.message || "Failed to delete category"
      ),
  });

  const filteredCategories = useMemo(() => {
    if (!categories) return [];

    return categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchText.toLowerCase()) ||
        category.subCategories.some(
          (sc) =>
            sc.name.toLowerCase().includes(searchText.toLowerCase()) ||
            sc.subSubCategories.some((ssc) =>
              ssc.name.toLowerCase().includes(searchText.toLowerCase())
            )
        );

      const matchesFilter =
        selectedCategories.length === 0 ||
        selectedCategories.includes(category.name);

      return matchesSearch && matchesFilter;
    });
  }, [categories, searchText, selectedCategories]);

  const categoryOptions = useMemo(() => {
    return (
      categories?.map((category) => ({
        label: category.name,
        value: category.name,
      })) || []
    );
  }, [categories]);

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: "Category",
      dataIndex: "name",
      sorter: (a, b) => a.name?.localeCompare(b.name || "") || 0,
      width: 200,
    },
    {
      title: "Subcategories",
      dataIndex: "subCategories",
      render: (subCategories) => (
        <div className="overflow-y-auto max-h-20">
          {subCategories?.map((sc, index) => (
            <div key={index}>
              <Space>
                {sc?.image && (
                  <img
                    src={`${API_URL}/${sc.image}`}
                    alt="subcategory"
                    className="object-cover w-8 h-8 rounded"
                  />
                )}
                <span>{sc?.name || "Unnamed Subcategory"}</span>
              </Space>
            </div>
          )) || "No subcategories"}
        </div>
      ),
      width: 250,
    },
    {
      title: "Sub-subcategories",
      dataIndex: "subCategories",
      render: (subCategories) => (
        <div className="overflow-y-auto max-h-20">
          {subCategories?.flatMap((sc) =>
            sc?.subSubCategories?.map((ssc, i) => (
              <div key={`${sc.name}-${i}`}>
                - {ssc?.name || "Unnamed Sub-subcategory"}
              </div>
            ))
          ) || "No sub-subcategories"}
        </div>
      ),
      width: 250,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) =>
        image ? (
          <img
            src={`${API_URL}/${image}`}
            alt="category"
            className="object-cover w-16 h-16 rounded"
            onError={(e) => {
              e.target.src = "/fallback-image.jpg";
            }}
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
      width: 120,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingCategory(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => deleteMutation.mutate(record._id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
      width: 100,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    type: "checkbox",
  };

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
            placeholder="Search categories..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            mode="multiple"
            allowClear
            style={{ width: 200 }}
            placeholder="Filter by category"
            options={categoryOptions}
            onChange={setSelectedCategories}
            value={selectedCategories}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              setEditingCategory(null);
              setIsModalVisible(true);
            }}
          >
            Add Category
          </Button>
        </Space>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredCategories}
        loading={isLoading}
        rowKey="_id"
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
        className="overflow-hidden "
      />

      <CategoryForm
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCategory(null);
        }}
        initialValues={editingCategory}
        onFinish={handleFormFinish}
      />
    </div>
  );
};

export default Categories;
