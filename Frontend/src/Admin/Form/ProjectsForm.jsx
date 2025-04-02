/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// src/Admin/Form/ProjectsForm.jsx
import { Modal, Form, Input, Upload, Select, Button, List, Space } from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
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
  const [bannerImageList, setBannerImageList] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");
  const [highlights, setHighlights] = useState([]);

  const { data: builders, isLoading: buildersLoading } = useQuery({
    queryKey: ["builders"],
    queryFn: fetchBuilders,
  });
  const { data: types, isLoading: typesLoading } = useQuery({
    queryKey: ["types"],
    queryFn: fetchTypes,
  });
  const { data: statuses, isLoading: statusesLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        title: initialValues.title,
        builder: initialValues.builder?._id || initialValues.builder,
        type: initialValues.type?._id || initialValues.type,
        status: initialValues.status?._id || initialValues.status,
        location: initialValues.location,
        price: initialValues.price,
        description: initialValues.description,
      });
      setSelectedAmenities(initialValues.amenities || []);
      setHighlights(initialValues.highlight || []);
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
      setBannerImageList(
        initialValues.bannerImage
          ? [
              {
                uid: "banner",
                name: "banner",
                status: "done",
                url: `${API_URL}/${initialValues.bannerImage}`,
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
      setBannerImageList([]);
      setSelectedAmenities([]);
      setHighlights([]);
      setHighlightInput("");
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

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setHighlights([...highlights, highlightInput.trim()]);
      setHighlightInput("");
    }
  };

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("builder", values.builder);
    formData.append("type", values.type);
    formData.append("status", values.status);
    formData.append("location", values.location);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("amenities", JSON.stringify(selectedAmenities));
    formData.append("highlight", JSON.stringify(highlights));

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
    if (bannerImageList[0]?.originFileObj)
      formData.append("bannerImage", bannerImageList[0].originFileObj);

    if (initialValues?._id) formData.append("id", initialValues._id);

    onFinish(formData);
  };

  return (
    <Modal
      title={initialValues ? "Edit Project" : "Add New Project"}
      open={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      width={800}
      confirmLoading={buildersLoading || typesLoading || statusesLoading}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="builder"
          label="Builder"
          rules={[{ required: true, message: "Please select a builder" }]}
        >
          <Select placeholder="Select a builder" loading={buildersLoading}>
            {builders?.map((b) => (
              <Option key={b._id} value={b._id}>
                {b.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: "Please select a type" }]}
        >
          <Select placeholder="Select a type" loading={typesLoading}>
            {types?.map((t) => (
              <Option key={t._id} value={t._id}>
                {t.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select a status" loading={statusesLoading}>
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
          rules={[{ required: true, message: "Please enter a location" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter a price" }]}
        >
          <Input type="number" prefix="₹" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
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
        <Form.Item label="Highlights">
          <Space style={{ width: "100%" }}>
            <Input
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              placeholder="Enter a highlight"
              onPressEnter={addHighlight} // Add on Enter key
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addHighlight}
            >
              Add
            </Button>
          </Space>
          {highlights.length > 0 && (
            <List
              size="small"
              dataSource={highlights}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeHighlight(index)}
                    />,
                  ]}
                >
                  {item}
                </List.Item>
              )}
              style={{ marginTop: 16 }}
            />
          )}
        </Form.Item>
        <Form.Item
          name="bannerImage"
          label="Banner Image"
          rules={[
            {
              required: !initialValues,
              message: "Please upload a banner image",
            },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={bannerImageList}
            onChange={handleFileChange(setBannerImageList)}
            beforeUpload={() => false}
            maxCount={1} // Single banner image
          >
            <div>
              <UploadOutlined />
              <div>Upload</div>
            </div>
          </Upload>
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
