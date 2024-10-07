import React, { useEffect, useState } from 'react';
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
  Space,
  Spin,
  message,
  notification,
} from 'antd';
import {
  UserOutlined,
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,
  SendOutlined,
} from '@ant-design/icons';
import deleteIcon from '../../assets/delete.svg';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useGetDepartmentsQuery } from '../../redux/api/services/DepartmentService';
import { useEditFolderMutation } from '../../redux/api/services/FolderService';

export default function ViewProject() {
  const navigate = useNavigate();
  const currentProject = useSelector((data) => data.currentProject);
  const email = useSelector((data) => data.user.email);
  const [newUpload, setUploads] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [newComment, setNewCooment] = useState();
  const [additionalMilestone, setAdditionalMilestone] = useState(['']);
  const [departmentList, setDepartments] = useState([]);
  const [editProject, { isLoading: editing }] = useEditFolderMutation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { Search, TextArea } = Input;
  const myDepartments = useSelector((data) => data.user.department);
  const [edit, setEdit] = useState(false);
  const { data } = useGetDepartmentsQuery();
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const {
    title,
    company,
    creation_date,
    comments,
    uploads,
    department,
    projectDone,
    originalDepartment,
    startDate,
    endDate,
    milestone,
    _id,
  } = currentProject;

  const initialValues = {
    title,
    company,
    creation_date,
    comments,
    uploads,
    department,
    projectDone,
    originalDepartment,
    startDate,
    endDate,
    milestone,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const newMilestones = additionalMilestone
        .filter((mile) => mile !== '')
        .map((milestone) => ({
          title: milestone,
          percentage: 0,
        }));

      if (newComment) {
        values.comments = [
          ...values.comments,
          {
            message: newComment,
            email,
            department: departmentList.find((d) => d.value == myDepartments[0])
              .label,
          },
        ];
      }
      values.uploads = [...values.uploads, ...newUpload];
      values.milestone = [...values.milestone, ...newMilestones];

      const isCreated = await editProject({ folderId: _id, newFolder: values });
      if (isCreated.error) {
        notification.error({ message: isCreated.error.data.message });
      } else {
        notification.success({ message: 'Edited Project Successfully' });
        navigate('/projects');
      }
    },
  });
  const downloadFile = async (url, filename) => {
    try {
      // Fetch the file from the given URL
      const response = await fetch(url);
      const blob = await response.blob(); // Convert the response to a Blob (binary data)

      // Create a temporary URL for the Blob and initiate the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', filename || 'file'); // Provide a default filename if needed
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up after download
    } catch (error) {
      console.error('File download failed:', error);
    }
  };
  const { handleChange, handleSubmit } = formik;
  const totalPercentage = [...milestone].reduce(
    (acc, curr) => acc + curr.percentage,
    0
  );

  // Calculate the percentage in relation to 100%
  const currentPercentage = (totalPercentage / milestone.length / 100) * 100;

  const handleMilestoneChange = (index, event) => {
    const { value } = event.target;
    const newmilestone = [...additionalMilestone];
    newmilestone[index] = value;
    setAdditionalMilestone(newmilestone);
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedUploads = [...newUpload];
    updatedUploads[index].title = value;
    setUploads(updatedUploads);
  };

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
              <Typography.Title level={4}>{title}</Typography.Title>
              <div>
                <div className="w-[120px] h-[120px] leading-[120px] rounded-[100px] bg-PrimaryColor text-center text-[#fff] text-[48px]">
                  {Math.round(currentPercentage)}%
                </div>
                <span className="font-semibold">Completion Status</span>
              </div>
            </Flex>
          </div>
          <div>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={24}>
                <span style={{ fontSize: '14px' }}>Title</span>
                <Input
                  disabled={!edit}
                  value={formik.values.title}
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
                  disabled={!edit}
                  value={formik.values.company}
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
                <Input
                  disabled
                  value={originalDepartment.name}
                  name="department"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter company"
                />
              </Col>
            </Row>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>Start Date</span>
                {!edit && (
                  <Input
                    disabled
                    value={startDate}
                    className="h-[38px] w-[100%] mb-3"
                    variant="outlined"
                    placeholder="Enter company"
                  />
                )}
                {edit && (
                  <DatePicker
                    onChange={(date, dateString) => {
                      formik.values.startDate = dateString;
                    }}
                    className="h-[38px] w-[100%] mb-3"
                  />
                )}
              </Col>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>End Date</span>

                {!edit && (
                  <Input
                    disabled
                    value={endDate}
                    className="h-[38px] w-[100%] mb-3"
                    variant="outlined"
                    placeholder="Enter company"
                  />
                )}
                {edit && (
                  <DatePicker
                    onChange={(date, dateString) => {
                      formik.values.endDate = dateString;
                    }}
                    className="h-[38px] w-[100%] mb-3"
                  />
                )}
              </Col>
            </Row>

            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              {formik.values.comments.map((comment, ind) => (
                <Col key={ind} span={12}>
                  <span style={{ fontSize: '14px' }}>
                    {comment?.department} ({comment.email})
                  </span>
                  <TextArea
                    name={`comments[${ind}].message`}
                    disabled={comment.email !== email || !edit}
                    value={comment.message}
                    rows={3}
                    className="h-[38px] w-[100%] mb-3"
                    variant="outlined"
                    placeholder="Add comment.."
                    onChange={(e) =>
                      formik.setFieldValue(
                        `comments[${ind}].message`,
                        e.target.value
                      )
                    }
                  />
                </Col>
              ))}

              {edit && (
                <Col span={12}>
                  <span style={{ fontSize: '14px' }}>Comment</span>
                  <TextArea
                    value={newComment}
                    rows={3}
                    onChange={(e) => {
                      setNewCooment(e.target.value);
                    }}
                    className="h-[38px] w-[100%] mb-3"
                    variant="outlined"
                    placeholder="Add comment.."
                  />
                </Col>
              )}
            </Row>

            <Divider style={{ marginTop: '20px', marginBottom: '35px' }} />

            <Row>
              <Col span={9}>
                <Typography.Title level={5}>Milestones</Typography.Title>
              </Col>
              <Col>
                <Typography.Text>Percentage of Completion</Typography.Text>
              </Col>
            </Row>

            {formik.values.milestone.map((mile, ind) => (
              <Row key={ind} align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
                <Col span={9}>
                  {ind + 1}. {mile.title}
                </Col>
                <Col span={3}>
                  <Input
                    disabled={!edit}
                    name={`milestone[${ind}].percentage`}
                    value={mile.percentage}
                    className="h-[38px] w-[100%] mb-3"
                    variant="outlined"
                    type="number"
                    onChange={(e) =>
                      formik.setFieldValue(
                        `milestone[${ind}].percentage`,
                        e.target.value
                      )
                    }
                  />
                </Col>
                {edit && ind !== 0 ? (
                  <Col>
                    <img src={deleteIcon} alt="delete" className="mb-3 -ml-2" />
                  </Col>
                ) : null}
              </Row>
            ))}

            {edit ? (
              <>
                {additionalMilestone.map((mile, ind) => {
                  return (
                    <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
                      <Col span={12}>
                        <Input
                          onChange={(e) => handleMilestoneChange(ind, e)}
                          value={mile}
                          name="title"
                          className="h-[38px] w-[100%] mb-3"
                          variant="outlined"
                          placeholder="Enter a milestone"
                        />
                      </Col>
                      <Col>
                        <img
                          onClick={() => {
                            const filtered = [...additionalMilestone].filter(
                              (individualMilestone) =>
                                individualMilestone !== mile
                            );
                            setAdditionalMilestone(filtered);
                          }}
                          src={deleteIcon}
                          alt="delete"
                          className="mb-3 -ml-2"
                        />
                      </Col>
                    </Row>
                  );
                })}

                <Row>
                  <Col span={12} align="left">
                    <Button
                      onClick={() => {
                        setAdditionalMilestone((prev) => [...prev, '']);
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
              </>
            ) : null}

            <Divider style={{ marginTop: '20px', marginBottom: '35px' }} />

            <Typography.Title level={5}>Uploaded Documents</Typography.Title>
            {formik.values.uploads.map((upload, ind) => (
              <Row
                key={ind}
                align="middle"
                className="my-[20px]"
                gutter={{ xs: 8, sm: 16, md: 34 }}>
                <Col span={12}>
                  <span style={{ fontSize: '16px' }}>
                    <SendOutlined
                      style={{ color: 'green', marginRight: '5px' }}
                    />
                    {upload.title}
                  </span>
                </Col>
                <Col span={8}>
                  <Upload
                    disabled
                    name="logo"
                    listType="text"
                    defaultFileList={[
                      {
                        name: upload.url,
                        status: 'done',
                      },
                    ]}
                  />
                </Col>
                <Col span={3}>
                  {' '}
                  <Button
                    onClick={() => downloadFile(upload.url, upload.title)}
                    type="primary"
                    icon={<DownloadOutlined />}
                    size="large"
                    className="bg-[#70A1E5]">
                    Download
                  </Button>
                </Col>
              </Row>
            ))}
            {newUpload.map((upload, ind) => (
              <Row
                key={ind}
                align="middle"
                className="my-[30px]"
                gutter={{ xs: 8, sm: 16, md: 34 }}>
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
                              const updatedUploads = [...newUpload];
                              updatedUploads[ind].url = data.url;
                              setUploads(updatedUploads);
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

            {edit ? (
              <Row>
                <Col span={12} offset={6} align="middle">
                  <Button
                    type="primary"
                    ghost
                    icon={<PlusOutlined />}
                    size="middle"
                    className="bg-PrimaryColor">
                    Add Document
                  </Button>
                </Col>
              </Row>
            ) : null}
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
              <Space>
                {edit ? (
                  <Button
                    ghost
                    type="primary"
                    size="large"
                    className="bg-PrimaryColor">
                    Cancel
                  </Button>
                ) : null}
                <Button
                  loading={editing}
                  onClick={() => {
                    if (edit) {
                      handleSubmit();
                      return;
                    }
                    setEdit(true);
                  }}
                  type="primary"
                  size="large"
                  className="bg-primaryColor w-[100px]">
                  {edit ? 'Save' : 'Edit'}
                </Button>
              </Space>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
