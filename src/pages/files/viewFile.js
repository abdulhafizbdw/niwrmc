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
  Space,
  Tag,
  Spin,
  message,
  notification,
} from 'antd';
import {
  PlusOutlined,
  DownloadOutlined,
  SendOutlined,
  ArrowRightOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TransferModal from './modals/transferModal';
import { useEditFileMutation } from '../../redux/api/services/FileService';
import { useGetDepartmentsQuery } from '../../redux/api/services/DepartmentService';

export default function ViewFile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [editFile, { isLoading: editing }] = useEditFileMutation();
  const [downloadingFile, setDownloading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(false);
  const [newComment, setNewCooment] = useState();
  const { data } = useGetDepartmentsQuery();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { Search, TextArea } = Input;
  const [newUpload, setUploads] = useState([]);
  const [uploading, setUploading] = useState(false);
  const email = useSelector((data) => data.user.email);
  const myDepartments = useSelector((data) => data.user.department);
  const [edit, setEdit] = useState(location.state.isEdit);
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const [departmentList, setDepartments] = useState([]);
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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const currentFile = useSelector((data) => data.currentFile);
  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedUploads = [...newUpload];
    updatedUploads[index].title = value;
    setUploads(updatedUploads);
  };
  const {
    comments,
    department,
    originalDepartment,
    reviewPending,
    title,
    transferedId,
    transferedTo,
    type,

    uploads,
    _id,
  } = currentFile;

  const initialValues = {
    title,
    type,
    comments,
    uploads,
    department,
    transferedTo,
    reviewPending,
    originalDepartment,
    transferedId,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
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

      const isCreated = await editFile({ fileId: _id, newFile: values });
      if (isCreated.error) {
        notification.error({ message: isCreated.error.data.message });
      } else {
        notification.success({ message: 'Edited File Successfully' });
        // navigate('/files');
      }
    },
  });
  const downloadFile = async (url, filename) => {
    try {
      setCurrentUrl(url);
      setDownloading(true);
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
      setDownloading(false);
    } catch (error) {
      setDownloading(false);
      console.error('File download failed:', error);
    }
  };
  const { handleChange, handleSubmit } = formik;
  return (
    <div className="">
      <div
        onClick={() => console.log(currentFile)}
        style={{
          width: '70%',
          margin: '0 auto',
          padding: '10px 0',
          fontSize: '32px',
          fontWeight: 'bold',
        }}>
        {title}
        <p style={{ fontSize: '14px' }}>
          Status:
          {transferedTo ? (
            <Tag color="processing">Transfered to {transferedTo.name}</Tag>
          ) : (
            <Tag color="green">
              In original department ({originalDepartment.name})
            </Tag>
          )}
        </p>
      </div>
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
              <Typography.Title level={4}>
                {edit ? 'Edit File' : 'View File'}
              </Typography.Title>
            </Flex>
          </div>
          <div>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>Title</span>
                <Input
                  disabled
                  value={formik.values.title}
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
                <Input
                  disabled
                  value={originalDepartment.name}
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter title"
                />
                {/* <Select
                  className="h-[38px] w-[100%] mb-3"
                  options={departmentList}
                /> */}
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
                    loading={downloadingFile && currentUrl == upload.url}
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
                              updatedUploads[ind].url = data.secure_url;
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
            ) : null}
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
              <Space>
                {edit ? (
                  <Button
                    onClick={() => {
                      setUploads([]);
                      setEdit(false);
                    }}
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
                  className="bg-[#70A1E5] w-[100px]">
                  {edit ? 'Save' : 'Edit'}
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  type="primary"
                  size="large"
                  className="bg-PrimaryColor">
                  Transfer
                  <ArrowRightOutlined />
                </Button>
              </Space>
            </div>
          </Flex>
        </Flex>
      </div>

      <TransferModal
        reload={() => navigate('/files')}
        fileId={_id}
        fileName={title}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </div>
  );
}
