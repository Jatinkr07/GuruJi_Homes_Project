/* eslint-disable react/prop-types */

import { Modal, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { API_URL } from "../../services/api";

const BuilderForm = ({ visible, onCancel, initialValues, onFinish }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      if (initialValues.image) {
        setFileList([
          {
            uid: "-1",
            name: "image",
            status: "done",
            url: `${API_URL}/${initialValues.image}`,
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [initialValues, form]);

  const handleUploadChange = ({ fileList: newFileList }) =>
    setFileList(
      newFileList.map((file) => ({
        ...file,
        originFileObj: file.originFileObj || file,
      }))
    );

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }
    if (initialValues?._id) {
      formData.append("id", initialValues._id);
    }
    onFinish(formData);
  };

  return (
    <Modal
      title={initialValues ? "Edit Builder" : "Add New Builder"}
      open={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Builder Name"
          rules={[{ required: true, message: "Please enter builder name" }]}
        >
          <Input placeholder="Enter builder name" />
        </Form.Item>
        <Form.Item
          label="Builder Image"
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
                <div className="mt-2">Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BuilderForm;
