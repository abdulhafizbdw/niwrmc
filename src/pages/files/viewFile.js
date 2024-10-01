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
} from 'antd';
import {
  PlusOutlined,
  DownloadOutlined,
  SendOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TransferModal from './modals/transferModal';

export default function ViewFile() {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { Search, TextArea } = Input;

  const [edit, setEdit] = useState(false);
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
  const departmentList = [
    { value: 'exoff', label: 'Executive Director Office' },
    {
      value: 'medept',
      label: 'Monitoring & Enforcement Department',
    },
    { value: 'hrdept', label: 'Human Resources Department' },
    {
      value: 'aadept',
      label: 'Authorization & Allocation Department',
    },
    {
      value: 'cssdept',
      label: 'Corporate Support Services Department',
    },
    {
      value: 'cmwdept',
      label: 'Catchment Management & Water Utilization Department',
    },
    {
      value: 'prdept',
      label: 'Procurement Department',
    },
    {
      value: 'financedept',
      label: 'Finance & Account Department',
    },
  ];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const currentFile = useSelector((data) => data.currentFile);
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
      // const bodyData = {
      //   ...values,
      //   comments: [
      //     {
      //       message: values.comments,
      //       email, // assuming email is derived elsewhere
      //       department: departmentList.find((d) => d.value === values.department)?.label,
      //     },
      //   ],
      //   originalDepartment: {
      //     name: departmentList.find((d) => d.value === values.department)?.label,
      //     id: values.department,
      //   },
      // };

      console.log(values);
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
                    {comment?.department} ([{comment.email}])
                  </span>
                  <TextArea
                    value={comment.message}
                    rows={3}
                    name="comments"
                    className="h-[38px] w-[100%] mb-3"
                    variant="outlined"
                    placeholder="Add comment.."
                  />
                </Col>
              ))}
              {/* <Col span={12}>
                <span style={{ fontSize: '14px' }}>
                  IT Department Comment ([username])
                </span>
                <TextArea
                  rows={3}
                  name="comments"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Add comment.."
                />
              </Col>
              <Col span={12}>
                <span style={{ fontSize: '14px' }}>Comment</span>
                <TextArea
                  rows={3}
                  name="comments"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Add comment.."
                />
              </Col> */}
            </Row>
            <Divider style={{ marginTop: '20px', marginBottom: '35px' }} />
            <Typography.Title level={5}>Uploaded Documents</Typography.Title>
            {formik.values.uploads.map((upload, ind) => (
              <Row key={ind} align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
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
                onClick={() => navigate('/files')}>
                Back to Files
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
