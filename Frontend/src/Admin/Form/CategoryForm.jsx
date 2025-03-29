/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Modal, Form, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Option } = Select;

const CategoryForm = ({ visible, onCancel, initialValues, onFinish }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState(
    initialValues?.image
      ? [{ uid: "-1", url: `http://localhost:6001/${initialValues.image}` }]
      : []
  );

  const uploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    // formData.append("status", values.status);
    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }
    formData.append(
      "subCategories",
      JSON.stringify(values.subCategories || [])
    );
    if (initialValues?._id) {
      formData.append("id", initialValues._id);
    }

    onFinish(formData);
    form.resetFields();
    setFileList([]);
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

        <Form.List name="subCategories">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    label="Subcategory Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input subcategory name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Upload
                    {...uploadProps}
                    name={`subCategories[${name}].image`}
                  >
                    <button>
                      <UploadOutlined /> Upload Subcategory Image
                    </button>
                  </Upload>
                  <Form.List name={[name, "subSubCategories"]}>
                    {(subFields, { add: addSub, remove: removeSub }) => (
                      <>
                        {subFields.map(
                          ({ key: subKey, name: subName, ...subRestField }) => (
                            <Form.Item
                              {...subRestField}
                              name={[subName, "name"]}
                              label="Sub-subcategory Name"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input sub-subcategory name!",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          )
                        )}
                        <button type="button" onClick={() => addSub()}>
                          Add Sub-subcategory
                        </button>
                      </>
                    )}
                  </Form.List>
                  <button type="button" onClick={() => remove(name)}>
                    Remove Subcategory
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => add()}>
                Add Subcategory
              </button>
            </>
          )}
        </Form.List>

        {/* <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item> */}

        <Form.Item
          name="image"
          label="Image"
          rules={[
            { required: !initialValues, message: "Please upload an image!" },
          ]}
        >
          <Upload {...uploadProps}>
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
