import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Col,
  Row,
  Input,
  Select,
  Divider,
  Switch,
  notification,
  Form,
} from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const EditUserModal = ({ open, onOk, confirmLoading, onCancel }) => {
  const { TextArea } = Input;

  return (
    <>
      <Modal
        title="Edit User"
        maskClosable={false}
        open={open}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        width={600}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button type="primary" className="bg-PrimaryColor">
              <CheckCircleOutlined />
              Save
            </Button>
          </>
        )}
      >
        <Divider style={{ marginTop: "2px", marginBottom: "35px" }} />
        <Form layout="vertical">
          <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
            <Col span={12}>
              <Form.Item
                label="User ID"
                name="user_id"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                <Input
                  name="user_id"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="ID"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                <Input
                  name="firstName"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                <Input
                  name="lastName"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter Last Name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
            <Col span={12}>
              <Form.Item
                label="Other Name"
                name="otherName"
                rules={[
                  {
                    required: false,
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                <Input
                  name="otherName"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter Other Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                <Input
                  name="email"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter Email"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 18 }} className="mb-3">
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                <Input
                  disabled
                  name="password"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                <Select
                  className="h-[38px] w-[100%] mb-3"
                  defaultValue="user"
                  options={[
                    { value: "user", label: "User" },
                    { value: "admin", label: "Admin" },
                    { value: "super_admin", label: "Super Administrator" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 18 }} className="mb-3">
            <Col span={24}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                <Select mode="multiple" className="h-[38px] w-[100%] mb-3" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <span className="text-[14px]">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />{" "}
          Make active
        </span>
        <Row style={{ margin: "30px 0" }}>
          <Col />{" "}
        </Row>
      </Modal>
    </>
  );
};
export default EditUserModal;
