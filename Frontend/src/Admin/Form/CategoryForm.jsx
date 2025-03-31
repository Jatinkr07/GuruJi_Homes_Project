/* eslint-disable react/prop-types */
import { Modal, Form, Input, Upload, Button, Space } from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { API_URL } from "../../services/api";

const CategoryForm = ({ visible, onCancel, initialValues, onFinish }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [subCatFiles, setSubCatFiles] = useState({});

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      if (initialValues.image) {
        setFileList([
          {
            uid: "-1",
            name: "category-image",
            status: "done",
            url: `${API_URL}/${initialValues.image}`,
          },
        ]);
      }
      const initialSubCatFiles = {};
      initialValues.subCategories?.forEach((subCat, index) => {
        if (subCat.image) {
          initialSubCatFiles[index] = [
            {
              uid: `${index}`,
              name: `subcat-${index}`,
              status: "done",
              url: `${API_URL}/${subCat.image}`,
            },
          ];
        }
      });
      setSubCatFiles(initialSubCatFiles);
    } else {
      form.resetFields();
      setFileList([]);
      setSubCatFiles({});
    }
  }, [initialValues, form]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.map((file) => ({
        ...file,
        originFileObj: file.originFileObj || file,
      }))
    );
  };

  const getSubCatUploadChange =
    (index) =>
    ({ fileList: newFileList }) => {
      setSubCatFiles((prev) => ({
        ...prev,
        [index]: newFileList.map((file) => ({
          ...file,
          originFileObj: file.originFileObj || file,
        })),
      }));
    };

  const handleFinish = (values) => {
    const formData = new FormData();

    formData.append("name", values.name);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("categoryImage", fileList[0].originFileObj);
    }

    const subCategories = values.subCategories || [];
    subCategories.forEach((subCat, index) => {
      if (subCatFiles[index]?.[0]?.originFileObj) {
        formData.append(
          `subCatImage${index}`,
          subCatFiles[index][0].originFileObj
        );
      }
    });

    formData.append("subCategories", JSON.stringify(subCategories));

    if (initialValues?._id) {
      formData.append("id", initialValues._id);
    }

    onFinish(formData);
  };

  return (
    <Modal
      title={initialValues ? "Edit Category" : "Add New Category"}
      open={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      width={800}
      style={{ top: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="p-4"
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input size="large" placeholder="Enter category name" />
        </Form.Item>

        <Form.List name="subCategories">
          {(fields, { add, remove }) => (
            <div className="space-y-4">
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="p-4 border rounded-lg">
                  <Space className="w-full mb-2">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Subcategory Name"
                      rules={[
                        { required: true, message: "Enter subcategory name" },
                      ]}
                      className="flex-1"
                    >
                      <Input placeholder="Subcategory Name" />
                    </Form.Item>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                    />
                  </Space>

                  <Form.Item label="Subcategory Image">
                    <Upload
                      onChange={getSubCatUploadChange(name)}
                      fileList={subCatFiles[name] || []}
                      beforeUpload={() => false}
                      listType="picture-card"
                      maxCount={1}
                    >
                      {(!subCatFiles[name] ||
                        subCatFiles[name].length === 0) && (
                        <div>
                          <UploadOutlined />
                          <div className="mt-2">Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>

                  <Form.List name={[name, "subSubCategories"]}>
                    {(subFields, { add: addSub, remove: removeSub }) => (
                      <div className="ml-4 space-y-2">
                        {subFields.map(
                          ({ key: subKey, name: subName, ...subRestField }) => (
                            <Space key={subKey} className="w-full">
                              <Form.Item
                                {...subRestField}
                                name={[subName, "name"]}
                                label="Sub-subcategory Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter sub-subcategory name",
                                  },
                                ]}
                              >
                                <Input placeholder="Sub-subcategory Name" />
                              </Form.Item>
                              <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => removeSub(subName)}
                              />
                            </Space>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addSub()}
                          icon={<PlusOutlined />}
                        >
                          Add Sub-subcategory
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Subcategory
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item
          label="Category Image"
          className="mt-4"
          rules={[
            { required: !initialValues, message: "Please upload an image" },
          ]}
        >
          <Upload
            onChange={handleUploadChange}
            fileList={fileList}
            beforeUpload={() => false}
            listType="picture-card"
            maxCount={1}
          >
            {fileList.length === 0 && (
              <div>
                <UploadOutlined />
                <div className="mt-2">Upload Image</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
