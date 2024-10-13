import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
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
  DatePicker,
  notification,
  message,
  Spin,
} from 'antd';
import { UserOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import deleteIcon from '../../assets/delete.svg';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment';
import { useGetDepartmentsQuery } from '../../redux/api/services/DepartmentService';
import { useCreateFolderMutation } from '../../redux/api/services/FolderService';
export const folderValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  company: Yup.string(),
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
  company: '',
  comments: '',
  uploads: [],
  department: '',
  originalDepartment: {},
  startDate: Date.now(),
  endDate: Date.now(),
  milestone: [],
};
export default function NewProject() {
  const navigate = useNavigate();
  const [departmentList, setDepartments] = useState([]);
  const email = useSelector((data) => data.user.email);
  const myDepartments = useSelector((data) => data.user.department);
  const [uploads, setUploads] = useState([{ title: '', url: '' }]);
  const { data } = useGetDepartmentsQuery();
  const [uploading, setUploading] = useState(false);
  const [allMilestones, setAllMilestones] = useState(['']);
  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedUploads = [...uploads];
    updatedUploads[index].title = value;
    setUploads(updatedUploads);
  };
  const handleMilestoneChange = (index, event) => {
    const { value } = event.target;
    const newmilestone = [...allMilestones];
    newmilestone[index] = value;
    setAllMilestones(newmilestone);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [createFolder, { isLoading: creating }] = useCreateFolderMutation();
  const { Search, TextArea } = Input;
  const formik = useFormik({
    initialValues,
    validationSchema: folderValidationSchema,
    onSubmit: async (values) => {
      const newMilestone = allMilestones.map((milestone) => {
        if (milestone) {
          return {
            title: milestone,
            percentage: 0,
          };
        } else {
          return;
        }
      });
      if (newMilestone.length == 0) {
        notification.error({ message: 'Please add at least one milestone' });
        return;
      }
      const bodyData = {
        ...values,
        createdBy: email,
        comments: [
          {
            message: values.comments,
            email,
            department: departmentList.find((d) => d.value == values.department)
              .label,
          },
        ],
        originalDepartment: {
          name: departmentList.find((d) => d.value == values.department).label,
          id: values.department,
        },
        milestone: newMilestone,
      };

      try {
        const isCreated = await createFolder(bodyData);
        if (isCreated.error) {
          notification.error({ message: isCreated.error.data.message });
        } else {
          notification.success({ message: 'Created Project Successfully' });
          navigate('/projects');
        }
      } catch (error) {
        notification.error('Something went wrong');
      }
    },
  });
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const items = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
  ];
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
  const { title, company, comments } = formik.values;
  const { handleChange, handleSubmit } = formik;

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
              <Typography.Title level={4}>New Project</Typography.Title>
            </Flex>
          </div>
          <div>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={24}>
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
            </Row>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>Company</span>
                <Input
                  value={company}
                  onChange={handleChange}
                  name="company"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter company"
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
                <span style={{ fontSize: '14px' }}>Start Date</span>
                <DatePicker
                  onChange={(date, dateString) => {
                    formik.values.startDate = dateString;
                  }}
                  className="h-[38px] w-[100%] mb-3"
                />
              </Col>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>End Date</span>
                <DatePicker
                  onChange={(date, dateString) => {
                    formik.values.endDate = dateString;
                  }}
                  className="h-[38px] w-[100%] mb-3"
                />
              </Col>
            </Row>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>Comment</span>
                <TextArea
                  name="comments"
                  onChange={handleChange}
                  value={comments}
                  rows={3}
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Add comment.."
                />
              </Col>
            </Row>

            <Divider style={{ marginTop: '20px', marginBottom: '35px' }} />

            <Typography.Title level={5}>Milestones</Typography.Title>
            {allMilestones.map((milestone, ind) => (
              <Row key={ind} align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
                <Col span={12}>
                  <Input
                    onChange={(e) => handleMilestoneChange(ind, e)}
                    value={milestone}
                    className="h-[38px] w-[100%] mb-3"
                    variant="outlined"
                    placeholder="Enter a milestone"
                  />
                </Col>
                <Col>
                  <img
                    onClick={() => {
                      const filtered = [...allMilestones].filter(
                        (individualMilestone) =>
                          individualMilestone !== milestone
                      );
                      setAllMilestones(filtered);
                    }}
                    src={deleteIcon}
                    alt="delete"
                    className="mb-3 -ml-2"
                  />
                </Col>
              </Row>
            ))}

            <Row>
              <Col span={12} align="left">
                <Button
                  onClick={() => {
                    setAllMilestones((prev) => [...prev, '']);
                  }}
                  type="primary"
                  ghost
                  icon={<PlusOutlined />}
                  size="middle"
                  className="bg-PrimaryColor">
                  Add Milestone
                </Button>
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
                              updatedUploads[ind].url = data.secure_url;
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
                onClick={() => navigate('/projects')}>
                Back to Projects
              </Button>
            </div>
            <div>
              <Button
                loading={creating}
                onClick={() => {
                  const filteredUpload = uploads.filter(
                    (upload) => upload.title !== ''
                  );
                  formik.values.uploads = filteredUpload;
                  handleSubmit();
                }}
                type="primary"
                size="middle"
                block
                className="bg-PrimaryColor">
                Create Project
              </Button>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
