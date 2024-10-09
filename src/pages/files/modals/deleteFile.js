import React from "react";
import { Button, Modal, Col, Row, Divider } from "antd";

const DeleteFileModal = ({ open, onOk, onCancel, isLoading }) => {
  return (
    <>
      <Modal
        title="Delete File"
        maskClosable={false}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={600}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              loading={isLoading}
              type="primary"
              className="bg-[#e23939] w-[100px]"
            >
              Yes
            </Button>
          </>
        )}
      >
        <Divider style={{ marginTop: "2px", marginBottom: "35px" }} />

        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col
            span={20}
            offset={2}
            style={{ fontSize: "16px", textAlign: "center" }}
          >
            <span>
              Are you sure you want to{" "}
              <span style={{ color: "red" }}>delete</span> file?
            </span>
          </Col>
        </Row>

        <Row style={{ margin: "30px 0" }}>
          <Col />{" "}
        </Row>
      </Modal>
    </>
  );
};
export default DeleteFileModal;
