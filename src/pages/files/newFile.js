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
} from "antd";
import { UserOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

export default function NewFile() {
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
              <Typography.Title level={4}>New File</Typography.Title>
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
                <span style={{ fontSize: "14px" }}>Type</span>
                <Select
                  className="h-[38px] w-[100%] mb-3"
                  options={[{ value: "type", label: "Type" }]}
                />
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
                onClick={() => navigate("/files")}
              >
                Back to Files
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                size="middle"
                block
                className="bg-PrimaryColor"
              >
                Create File
              </Button>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
