/* eslint-disable no-unused-vars */
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
  const [floorPlanText, setFloorPlanText] = useState([]);
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
          path: img,
        })) || []
      );
      setFloorPlanList(
        initialValues.floorPlan?.map((fp, i) => ({
          uid: `fp-${i}`,
          name: `floorPlan-${i}`,
          status: "done",
          url: `${API_URL}/${fp.image}`,
          path: fp.image,
          text: fp.text,
        })) || []
      );
      setFloorPlanText(initialValues.floorPlan?.map((fp) => fp.text) || []);
      setSitePlanList(
        initialValues.sitePlan?.map((sp, i) => ({
          uid: `sp-${i}`,
          name: `sitePlan-${i}`,
          status: "done",
          url: `${API_URL}/${sp}`,
          path: sp,
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
                path: initialValues.brochure,
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
                path: initialValues.bannerImage,
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setImageList([]);
      setFloorPlanList([]);
      setFloorPlanText([]);
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
    ({ fileList: newFileList }) => {
      setList(
        newFileList.map((file) => ({
          ...file,
          originFileObj: file.originFileObj || undefined,
          path: file.path || undefined,
          text: file.text || "",
        }))
      );
    };

  const handleFloorPlanTextChange = (index, value) => {
    const newFloorPlanText = [...floorPlanText];
    newFloorPlanText[index] = value;
    setFloorPlanText(newFloorPlanText);
    setFloorPlanList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, text: value } : item))
    );
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setHighlights([...highlights, highlightInput.trim()]);
      setHighlightInput("");
    }
  };

  const removeHighlight = (index) =>
    setHighlights(highlights.filter((_, i) => i !== index));

  // src/Admin/Form/ProjectsForm.jsx (only showing handleFinish for brevity)
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
    formData.append("floorPlanText", JSON.stringify(floorPlanText));

    // Images
    const existingImages = imageList
      .filter((file) => !file.originFileObj)
      .map((file) => file.path);
    formData.append("existingImages", JSON.stringify(existingImages));
    const newImages = imageList.filter((file) => file.originFileObj);
    newImages.forEach((file, index) => {
      formData.append("images", file.originFileObj);
      console.log(`Appending image ${index}: ${file.originFileObj.name}`);
    });

    // Floor Plans
    const existingFloorPlans = floorPlanList
      .filter((file) => !file.originFileObj)
      .map((file) => ({ image: file.path, text: file.text }));
    formData.append("existingFloorPlan", JSON.stringify(existingFloorPlans));
    const newFloorPlans = floorPlanList.filter((file) => file.originFileObj);
    newFloorPlans.forEach((file, index) => {
      formData.append("floorPlan", file.originFileObj);
      console.log(`Appending floorPlan ${index}: ${file.originFileObj.name}`);
    });

    // Site Plans
    const existingSitePlans = sitePlanList
      .filter((file) => !file.originFileObj)
      .map((file) => file.path);
    formData.append("existingSitePlan", JSON.stringify(existingSitePlans));
    const newSitePlans = sitePlanList.filter((file) => file.originFileObj);
    newSitePlans.forEach((file, index) => {
      formData.append("sitePlan", file.originFileObj);
      console.log(`Appending sitePlan ${index}: ${file.originFileObj.name}`);
    });

    // Brochure
    const existingBrochure = brochureList[0]?.path;
    const newBrochure = brochureList.filter((file) => file.originFileObj);
    if (newBrochure.length > 0) {
      formData.append("brochure", newBrochure[0].originFileObj);
      console.log(`Appending brochure: ${newBrochure[0].originFileObj.name}`);
    }
    if (existingBrochure) {
      formData.append("existingBrochure", existingBrochure);
    }

    // Banner Image
    const existingBannerImage = bannerImageList[0]?.path;
    const newBannerImage = bannerImageList.filter((file) => file.originFileObj);
    if (newBannerImage.length > 0) {
      formData.append("bannerImage", newBannerImage[0].originFileObj);
      console.log(
        `Appending bannerImage: ${newBannerImage[0].originFileObj.name}`
      );
    }
    if (existingBannerImage) {
      formData.append("existingBannerImage", existingBannerImage);
    }

    if (initialValues?._id) formData.append("id", initialValues._id);

    // Debug FormData
    for (let [key, value] of formData.entries()) {
      console.log(
        `FormData ${key}:`,
        value instanceof File ? value.name : value
      );
    }

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
          <Input type="number" prefix="$" />
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
              onPressEnter={addHighlight}
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
            maxCount={1}
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
          {floorPlanList.length > 0 && (
            <List
              size="small"
              dataSource={floorPlanList}
              renderItem={(item, index) => (
                <List.Item>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <img
                      src={item.url || URL.createObjectURL(item.originFileObj)}
                      alt="Floor Plan"
                      style={{ width: 50, height: 50 }}
                    />
                    <Input
                      value={item.text || floorPlanText[index] || ""}
                      onChange={(e) =>
                        handleFloorPlanTextChange(index, e.target.value)
                      }
                      placeholder={`Caption for Floor Plan ${index + 1}`}
                    />
                  </Space>
                </List.Item>
              )}
              style={{ marginTop: 16 }}
            />
          )}
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
