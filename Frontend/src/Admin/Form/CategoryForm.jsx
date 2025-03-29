/* eslint-disable react/prop-types */
import { Modal, Form, Input, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Option } = Select;

const CategoryForm = ({ visible, onCancel, initialValues, onFinish }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Success:", values);
      form.resetFields();
      setFileList([]);
      message.success("Category saved successfully");
      setLoading(false);
      onFinish();
    }, 500);
  };

  return (
    <Modal
      title="Category Form"
      open={visible}
      onOk={() => form.submit()}
      onCancel={() => {
        onCancel();
        form.resetFields();
        setFileList([]);
      }}
      width={600}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="subcategory"
          label="Subcategory"
          rules={[{ required: true, message: "Please input subcategory!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="image"
          label="Image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload {...uploadProps} listType="picture-card">
            {fileList.length >= 1 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
