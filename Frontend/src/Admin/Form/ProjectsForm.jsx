/* eslint-disable react/prop-types */

import { Modal, Form, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import {
  API_URL,
  fetchBuilders,
  fetchTypes,
  fetchStatuses,
} from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { amenitiesList } from "../../Pages/Projects/Amenities/Card";
const { TextArea } = Input;
const { Option } = Select;

const ProjectsForm = ({ visible, onCancel, initialValues, onFinish }) => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const [floorPlanList, setFloorPlanList] = useState([]);
  const [sitePlanList, setSitePlanList] = useState([]);
  const [brochureList, setBrochureList] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { data: builders } = useQuery({
    queryKey: ["builders"],
    queryFn: fetchBuilders,
  });
  const { data: types } = useQuery({
    queryKey: ["types"],
    queryFn: fetchTypes,
  });
  const { data: statuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setSelectedAmenities(initialValues.amenities || []);
      setImageList(
        initialValues.images?.map((img, i) => ({
          uid: `img-${i}`,
          name: `image-${i}`,
          status: "done",
          url: `${API_URL}/${img}`,
        })) || []
      );
      setFloorPlanList(
        initialValues.floorPlan?.map((fp, i) => ({
          uid: `fp-${i}`,
          name: `floorPlan-${i}`,
          status: "done",
          url: `${API_URL}/${fp}`,
        })) || []
      );
      setSitePlanList(
        initialValues.sitePlan?.map((sp, i) => ({
          uid: `sp-${i}`,
          name: `sitePlan-${i}`,
          status: "done",
          url: `${API_URL}/${sp}`,
        })) || []
      );
      setBrochureList(
        initialValues.brochure
          ? [
              {
                uid: "brochure",
                name: "brochure",
                status: "done",
                url: `${API_URL}/${initialValues.brochure}`,
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setImageList([]);
      setFloorPlanList([]);
      setSitePlanList([]);
      setBrochureList([]);
      setSelectedAmenities([]);
    }
  }, [initialValues, form]);

  const handleFileChange =
    (setList) =>
    ({ fileList: newFileList }) =>
      setList(
        newFileList.map((file) => ({
          ...file,
          originFileObj: file.originFileObj || file,
        }))
      );

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("builder", values.builder);
    formData.append("type", values.type);
    formData.append("status", values.status);
    formData.append("location", values.location);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("amenities", JSON.stringify(selectedAmenities)); // Send only names

    imageList.forEach(
      (file) =>
        file.originFileObj && formData.append("images", file.originFileObj)
    );
    floorPlanList.forEach(
      (file) =>
        file.originFileObj && formData.append("floorPlan", file.originFileObj)
    );
    sitePlanList.forEach(
      (file) =>
        file.originFileObj && formData.append("sitePlan", file.originFileObj)
    );
    if (brochureList[0]?.originFileObj)
      formData.append("brochure", brochureList[0].originFileObj);

    onFinish(formData);
  };

  return (
    <Modal
      title={initialValues ? "Edit Project" : "Add New Project"}
      open={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="builder" label="Builder" rules={[{ required: true }]}>
          <Select>
            {builders?.map((b) => (
              <Option key={b._id} value={b._id}>
                {b.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select>
            {types?.map((t) => (
              <Option key={t._id} value={t._id}>
                {t.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            {statuses?.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.text}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input type="number" prefix="$" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Amenities"
          rules={[{ required: true, message: "Select at least one amenity" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select amenities"
            value={selectedAmenities}
            onChange={setSelectedAmenities}
          >
            {amenitiesList.map((amenity) => (
              <Option key={amenity.name} value={amenity.name}>
                {amenity.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="images"
          label="Images"
          rules={[
            { required: !initialValues, message: "Upload at least one image" },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={imageList}
            onChange={handleFileChange(setImageList)}
            beforeUpload={() => false}
            multiple
          >
            <div>
              <UploadOutlined />
              <div>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item name="floorPlan" label="Floor Plans">
          <Upload
            listType="picture-card"
            fileList={floorPlanList}
            onChange={handleFileChange(setFloorPlanList)}
            beforeUpload={() => false}
            multiple
          >
            <div>
              <UploadOutlined />
              <div>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item name="sitePlan" label="Site Plans">
          <Upload
            listType="picture-card"
            fileList={sitePlanList}
            onChange={handleFileChange(setSitePlanList)}
            beforeUpload={() => false}
            multiple
          >
            <div>
              <UploadOutlined />
              <div>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item name="brochure" label="Brochure (PDF)">
          <Upload
            listType="picture-card"
            fileList={brochureList}
            onChange={handleFileChange(setBrochureList)}
            beforeUpload={() => false}
            accept=".pdf"
            maxCount={1}
          >
            <div>
              <UploadOutlined />
              <div>Upload PDF</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectsForm;
