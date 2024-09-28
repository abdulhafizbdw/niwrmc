import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Input,
  Flex,
  Col,
  Row,
  Select,
  Typography,
  Divider,
  Form,
  Upload,
  theme,
  message,
  Spin,
  notification,
} from 'antd';
import { UserOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { useGetDepartmentsQuery } from '../../redux/api/services/DepartmentService';
import { useSelector } from 'react-redux';
import { useCreateFileMutation } from '../../redux/api/services/FileService';
export const fileValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  type: Yup.string(),
  comments: Yup.string(),
  uploads: Yup.array().of(
    Yup.object({
      title: Yup.string(),
      url: Yup.string(),
    })
  ),
  department: Yup.string().required('Department is required'),
});

export const initialValues = {
  title: '',
  type: '',
  comments: '',
  uploads: [],
  department: '',
  originalDepartment: {},
};
export default function NewFile() {
  const navigate = useNavigate();
  const [departmentList, setDepartments] = useState([]);
  const email = useSelector((data) => data.user.email);
  const myDepartments = useSelector((data) => data.user.department);
  const [createFile, { isLoading: creating }] = useCreateFileMutation();
  const { data } = useGetDepartmentsQuery();
  const [uploads, setUploads] = useState([{ title: '', url: '' }]);
  const [uploading, setUploading] = useState(false);
  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedUploads = [...uploads];
    updatedUploads[index].title = value;
    setUploads(updatedUploads);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const formik = useFormik({
    initialValues,
    validationSchema: fileValidationSchema,
    onSubmit: async (values) => {
      const bodyData = {
        ...values,
        comments: [
          {
            message: values.comments,
            email,
          },
        ],
        originalDepartment: {
          name: departmentList.find((d) => d.value == values.department).label,
          id: values.department,
        },
      };

      try {
        const isCreated = await createFile(bodyData);
        if (isCreated.error) {
          notification.error({ message: isCreated.error.data.message });
        } else {
          notification.success({ message: 'Created File Successfully' });
          navigate('/files');
        }
      } catch (error) {
        notification.error('Something went wrong');
      }
    },
  });
  const { Search, TextArea } = Input;

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    name: 'file',
    multiple: false,
    action: 'https://api.cloudinary.com/v1_1/djlbovjlt/image/upload',
  };

  const { title, comments, type } = formik.values;
  const { handleChange, handleSubmit } = formik;

  useEffect(() => {
    if (data) {
      const newData = data.data.map((dp) => ({
        label: dp.name,
        value: dp._id,
      }));
      const result = newData.filter((item) =>
        myDepartments.includes(item.value)
      );
      setDepartments(result);
    }
  }, [data]);
  return (
    <div className="">
      <div
        style={{
          padding: 24,
          minHeight: 560,
          width: '70%',
          margin: '0 auto',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
        <Flex vertical gap="large">
          <div className="border-bottom">
            <Flex justify="space-between" align="center">
              <Typography.Title level={4}>New File</Typography.Title>
            </Flex>
          </div>
          <div>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>Title</span>
                <Input
                  value={title}
                  onChange={handleChange}
                  name="title"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter title"
                />
              </Col>
              <Col span={12}>
                {' '}
                <span style={{ fontSize: '14px' }}>Department</span>
                <Select
                  onChange={(e) => {
                    formik.values.department = e;
                  }}
                  className="h-[38px] w-[100%] mb-3"
                  options={departmentList}
                />
              </Col>
            </Row>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>Comment</span>
                <TextArea
                  onChange={handleChange}
                  title={comments}
                  rows={3}
                  name="comments"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Add comment.."
                />
              </Col>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>Type</span>
                <Input
                  value={type}
                  onChange={handleChange}
                  name="type"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter title"
                />
              </Col>
            </Row>

            <Divider style={{ marginTop: '20px', marginBottom: '35px' }} />

            <Typography.Title level={5}>Upload Document</Typography.Title>
            {uploads.map((upload, ind) => (
              <Row key={ind} align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
                <Col span={12}>
                  <span style={{ fontSize: '14px' }}>Title</span>
                  <Input
                    value={upload.title}
                    onChange={(e) => handleInputChange(ind, e)}
                    name={`uploads[${ind}].title`}
                    className="h-[38px] w-[100%] mb-3"
                    variant="outlined"
                    placeholder="Enter title"
                  />
                </Col>
                <Col span={6} offset={3}>
                  <Form.Item
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="upload your document here">
                    <Upload
                      beforeUpload={(file) => {
                        const uploadPreset = 'v4lnyqau'; // Replace with your Cloudinary upload preset name
                        setUploading(true); // Set uploading state to true

                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('upload_preset', uploadPreset);

                        // Upload the file
                        return fetch(
                          'https://api.cloudinary.com/v1_1/djlbovjlt/image/upload',
                          {
                            method: 'POST',
                            body: formData,
                          }
                        )
                          .then((response) => response.json())
                          .then((data) => {
                            // Handle the upload response
                            console.log('Upload response:', data);
                            if (data.error) {
                              message.error(
                                `${file.name} upload failed: ${data.error.message}`
                              );
                            } else {
                              message.success(
                                `${file.name} uploaded successfully.`
                              );
                              const updatedUploads = [...uploads];
                              updatedUploads[ind].url = data.url;
                            }
                          })
                          .catch((error) => {
                            console.error('Upload error:', error);
                            message.error(`${file.name} upload failed.`);
                          })
                          .finally(() => {
                            setUploading(false); // Set uploading state to false after the upload process is done
                          });

                        // Return false to prevent default upload behavior
                        // Returning the fetch Promise allows async handling
                        return false;
                      }}
                      {...props}
                      name="logo"
                      listType="picture">
                      {uploading && <Spin size="large" spinning />}
                      {!uploading && (
                        <Button icon={<UploadOutlined />}>
                          Click to upload
                        </Button>
                      )}
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            ))}

            <Divider style={{ marginTop: '20px', marginBottom: '35px' }} />

            <Row>
              <Col span={12} offset={6} align="middle">
                <Button
                  onClick={() => {
                    const new_value = {
                      title: '',
                      url: '',
                    };
                    setUploads((prev) => [...prev, new_value]);
                  }}
                  type="primary"
                  ghost
                  icon={<PlusOutlined />}
                  size="middle"
                  className="bg-PrimaryColor">
                  Add Document
                </Button>
              </Col>
            </Row>
          </div>

          <Flex justify="space-between">
            <div>
              <Button
                type="link"
                block
                className="text-PrimaryColor"
                onClick={() => navigate('/files')}>
                Back to Files
              </Button>
            </div>
            <div>
              <Button
                loading={creating}
                onClick={() => {
                  formik.values.uploads = uploads;
                  handleSubmit();
                }}
                type="primary"
                size="middle"
                block
                className="bg-PrimaryColor">
                Create File
              </Button>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
