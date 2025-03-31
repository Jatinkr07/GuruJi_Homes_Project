/* eslint-disable react/prop-types */
import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

const StatusForm = ({ visible, onCancel, initialValues, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ text: initialValues.text });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("text", values.text);
    if (initialValues?._id) {
      formData.append("id", initialValues._id);
    }
    onFinish(formData);
  };

  return (
    <Modal
      title={initialValues ? "Edit Status" : "Add New Status"}
      open={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="text"
          label="Status Text"
          rules={[{ required: true, message: "Please enter status text" }]}
        >
          <Input placeholder="Enter status text" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StatusForm;
