import React, { useState } from "react";
import { Button, Modal, Col, Row, Input, Select, Divider, Switch } from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const AddUserModal = ({ open, onOk, confirmLoading, onCancel }) => {
  const { TextArea } = Input;
  return (
    <>
      <Modal
        title="New User"
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
              Submit
            </Button>
          </>
        )}
      >
        <Divider style={{ marginTop: "2px", marginBottom: "35px" }} />
        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col span={12}>
            <span style={{ fontSize: "14px" }}>User ID</span>
            <Input
              name="userID"
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="ID"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col span={12}>
            <span style={{ fontSize: "14px" }}>First Name</span>
            <Input
              name="name"
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="Enter Name"
            />
          </Col>
          <Col span={12}>
            <span style={{ fontSize: "14px" }}>Last Name</span>
            <Input
              name="lastname"
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="Enter Last Name"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col span={12}>
            <span style={{ fontSize: "14px" }}>Other Name</span>
            <Input
              name="othername"
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="Enter Other Name"
            />
          </Col>
          <Col span={12}>
            <span style={{ fontSize: "14px" }}>Email</span>
            <Input
              name="email"
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="Enter Email"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 18 }} className="mb-3">
          <Col span={12}>
            <span style={{ fontSize: "14px" }}>Department</span>
            <Select
              className="h-[38px] w-[100%] mb-3"
              options={[
                { value: "hrdept", label: "Human Resource" },
                { value: "financedept", label: "Finance Department" },
                { value: "procurementdept", label: "Procurement" },
              ]}
            />
          </Col>
          <Col span={12}>
            <span style={{ fontSize: "14px" }}>Role</span>
            <Select
              className="h-[38px] w-[100%] mb-3"
              defaultValue="user"
              options={[
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" },
                { value: "superadmin", label: "Super Administrator" },
              ]}
            />
          </Col>
        </Row>
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
export default AddUserModal;
