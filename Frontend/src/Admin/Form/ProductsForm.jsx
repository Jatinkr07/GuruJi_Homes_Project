/* eslint-disable react/prop-types */
import { Modal, Form, Input, Upload, Select, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

const ProductsForm = ({ visible, onCancel, initialValues, onFinish }) => {
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
      message.success("Product saved successfully");
      setLoading(false);
      onFinish();
    }, 500);
  };

  return (
    <Modal
      title="Product Form"
      open={visible}
      onOk={() => form.submit()}
      onCancel={() => {
        onCancel();
        form.resetFields();
        setFileList([]);
      }}
      width={800}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select placeholder="Select category">
            <Option value="residential">Residential</Option>
            <Option value="commercial">Commercial</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="subcategory"
          label="Subcategory"
          rules={[{ required: true, message: "Please select subcategory!" }]}
        >
          <Select placeholder="Select subcategory">
            <Option value="apartment">Apartment</Option>
            <Option value="villa">Villa</Option>
            <Option value="office">Office</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please input location!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input price!" }]}
        >
          <Input type="number" prefix="$" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select placeholder="Select status">
            <Option value="available">Available</Option>
            <Option value="sold">Sold</Option>
            <Option value="pending">Pending</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="amenities"
          label="Amenities"
          rules={[{ required: true, message: "Please select amenities!" }]}
        >
          <Select mode="multiple" placeholder="Select amenities">
            <Option value="lift">Lift</Option>
            <Option value="cctv">24/7 CCTV</Option>
            <Option value="parking">Parking</Option>
            <Option value="security">Security</Option>
            <Option value="gym">Gym</Option>
            <Option value="pool">Swimming Pool</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="images"
          label="Images"
          rules={[{ required: true, message: "Please upload images!" }]}
        >
          <Upload {...uploadProps} listType="picture-card" multiple>
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item name="floorPlan" label="Floor Plans">
          <Upload {...uploadProps} listType="picture-card">
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item name="sitePlan" label="Site Plan (Optional)">
          <Upload {...uploadProps} listType="picture-card">
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item name="brochure" label="Brochure (PDF)">
          <Upload {...uploadProps} accept=".pdf">
            <Button icon={<UploadOutlined />}>Upload PDF</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductsForm;
