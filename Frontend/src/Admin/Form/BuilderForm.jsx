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
        const fileName = initialValues.image.split("/").pop();
        setFileList([
          {
            uid: "-1",
            name: fileName,
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

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // Keep only the latest file
    console.log("Updated fileList:", newFileList); // Debug log
  };

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    } else if (!initialValues) {
      console.log("No image selected for new builder"); // Debug log
    }

    // Debug: Log FormData contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    if (initialValues?._id) {
      onFinish(formData, initialValues._id);
    } else {
      onFinish(formData);
    }
  };

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => onSuccess("ok"), 0);
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
          name="image"
          label="Builder Image"
          rules={[
            {
              required: !initialValues, // Required only for new builders
              message: "Please upload an image",
            },
          ]}
        >
          <Upload
            customRequest={customRequest}
            onChange={handleUploadChange}
            fileList={fileList}
            listType="picture-card"
            maxCount={1}
            accept="image/*"
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
