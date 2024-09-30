import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
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
} from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  SendOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

export default function ViewFile() {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { Search, TextArea } = Input;

  const [edit, setEdit] = useState(true);

  const departmentList = [
    { value: "exoff", label: "Executive Director Office" },
    {
      value: "medept",
      label: "Monitoring & Enforcement Department",
    },
    { value: "hrdept", label: "Human Resources Department" },
    {
      value: "aadept",
      label: "Authorization & Allocation Department",
    },
    {
      value: "cssdept",
      label: "Corporate Support Services Department",
    },
    {
      value: "cmwdept",
      label: "Catchment Management & Water Utilization Department",
    },
    {
      value: "prdept",
      label: "Procurement Department",
    },
    {
      value: "financedept",
      label: "Finance & Account Department",
    },
  ];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="">
      <div
        style={{
          width: "70%",
          margin: "0 auto",
          padding: "10px 0",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        {"{Name_of_File}"}
        <p style={{ fontSize: "14px" }}>
          Status:{" "}
          <Tag color="processing">Transfered to Human Resources Department</Tag>
        </p>
      </div>
      <div
        style={{
          padding: 24,
          minHeight: 560,
          width: "70%",
          margin: "0 auto",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Flex vertical gap="large">
          <div className="border-bottom">
            <Flex justify="space-between" align="center">
              <Typography.Title level={4}>
                {edit ? "Edit File" : "View File"}
              </Typography.Title>
            </Flex>
          </div>
          <div>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: "14px" }}>Title</span>
                <Input
                  name="title"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter title"
                />
              </Col>
              <Col span={12}>
                {" "}
                <span style={{ fontSize: "14px" }}>Department</span>
                <Select
                  className="h-[38px] w-[100%] mb-3"
                  options={departmentList}
                />
              </Col>
            </Row>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: "14px" }}>
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
                <span style={{ fontSize: "14px" }}>Comment</span>
                <TextArea
                  rows={3}
                  name="comments"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Add comment.."
                />
              </Col>
            </Row>
            <Divider style={{ marginTop: "20px", marginBottom: "35px" }} />
            <Typography.Title level={5}>Uploaded Documents</Typography.Title>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: "16px" }}>
                  <SendOutlined
                    style={{ color: "green", marginRight: "5px" }}
                  />
                  Training Certificate
                </span>
              </Col>
              <Col span={8}>
                <Upload
                  name="logo"
                  listType="picture"
                  defaultFileList={[
                    {
                      name: "training_Certificate.png",
                      status: "error",
                    },
                  ]}
                />
              </Col>
              <Col span={3}>
                {" "}
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  size="large"
                  className="bg-[#70A1E5]"
                >
                  Download
                </Button>
              </Col>
            </Row>

            <Divider style={{ marginTop: "20px", marginBottom: "35px" }} />
            {edit ? (
              <Row>
                <Col span={12} offset={6} align="middle">
                  <Button
                    type="primary"
                    ghost
                    icon={<PlusOutlined />}
                    size="middle"
                    className="bg-PrimaryColor"
                  >
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
                onClick={() => navigate("/files")}
              >
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
                    className="bg-PrimaryColor"
                  >
                    Cancel
                  </Button>
                ) : null}
                <Button
                  type="primary"
                  size="large"
                  className="bg-[#70A1E5] w-[100px]"
                >
                  {edit ? "Save" : "Edit"}
                </Button>
                <Button type="primary" size="large" className="bg-PrimaryColor">
                  Transfer
                  <ArrowRightOutlined />
                </Button>
              </Space>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
