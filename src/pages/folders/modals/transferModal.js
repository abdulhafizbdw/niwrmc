import React, { useState } from "react";
import { Button, Modal, Col, Row, Input, Select, Divider } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const TransferModal = ({ open, onOk, confirmLoading, onCancel }) => {
  return (
    <>
      <Modal
        title="Transfer"
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
              Transfer
              <ArrowRightOutlined />
            </Button>
          </>
        )}
      >
        <Divider style={{ marginTop: "2px", marginBottom: "35px" }} />

        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col span={24}>
            <span style={{ fontSize: "14px" }}>Transfer to</span>
            <Select
              className="h-[38px] w-[100%] mb-3"
              options={[
                { value: "hrdept", label: "Human Resource" },
                { value: "financedept", label: "Finance Department" },
                { value: "procurementdept", label: "Procurement" },
              ]}
            />
          </Col>
        </Row>

        <Row style={{ margin: "30px 0" }}>
          <Col />{" "}
        </Row>
      </Modal>
    </>
  );
};
export default TransferModal;
