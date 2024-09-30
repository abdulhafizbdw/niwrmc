import React, { useState } from "react";
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
} from "antd";
import { UserOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import deleteIcon from "../../assets/delete.svg";

import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { Search, TextArea } = Input;

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined />,
    },
  ];

  return (
    <div className="">
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
              <Typography.Title level={4}>New Project</Typography.Title>
            </Flex>
          </div>
          <div>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={24}>
                <span style={{ fontSize: "14px" }}>Title</span>
                <Input
                  name="title"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter title"
                />
              </Col>
            </Row>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: "14px" }}>Company</span>
                <Input
                  name="company"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter company"
                />
              </Col>
              <Col span={12}>
                {" "}
                <span style={{ fontSize: "14px" }}>Department</span>
                <Select
                  className="h-[38px] w-[100%] mb-3"
                  options={[
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
                      label:
                        "Catchment Management & Water Utilization Department",
                    },
                    {
                      value: "prdept",
                      label: "Procurement Department",
                    },
                    {
                      value: "financedept",
                      label: "Finance & Account Department",
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: "14px" }}>Start Date</span>
                <DatePicker className="h-[38px] w-[100%] mb-3" />
              </Col>
              <Col span={12}>
                <span style={{ fontSize: "14px" }}>End Date</span>
                <DatePicker className="h-[38px] w-[100%] mb-3" />
              </Col>
            </Row>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <span style={{ fontSize: "14px" }}>Comment</span>
                <TextArea
                  rows={3}
                  name="comment"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Add comment.."
                />
              </Col>
            </Row>

            <Divider style={{ marginTop: "20px", marginBottom: "35px" }} />

            <Typography.Title level={5}>Milestones</Typography.Title>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <Input
                  name="title"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter a milestone"
                />
              </Col>
              <Col>
                <img src={deleteIcon} alt="delete" className="mb-3 -ml-2" />
              </Col>
            </Row>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 34 }}>
              <Col span={12}>
                <Input
                  name="title"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter a milestone"
                />
              </Col>
              <Col>
                <img src={deleteIcon} alt="delete" className="mb-3 -ml-2" />
              </Col>
            </Row>
            <Row>
              <Col span={12} align="left">
                <Button
                  type="primary"
                  ghost
                  icon={<PlusOutlined />}
                  size="middle"
                  className="bg-PrimaryColor"
                >
                  Add Milestone
                </Button>
              </Col>
            </Row>

            <Divider style={{ marginTop: "20px", marginBottom: "35px" }} />

            <Typography.Title level={5}>Upload Document</Typography.Title>
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
              <Col span={6} offset={3}>
                <Form.Item
                  name="upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="upload your document here"
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Divider style={{ marginTop: "20px", marginBottom: "35px" }} />

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
          </div>

          <Flex justify="space-between">
            <div>
              <Button
                type="link"
                block
                className="text-PrimaryColor"
                onClick={() => navigate("/projects")}
              >
                Back to Projects
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                size="middle"
                block
                className="bg-PrimaryColor"
              >
                Create Project
              </Button>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
