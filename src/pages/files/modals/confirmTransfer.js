import React from "react";
import { Button, Modal, Col, Row, Divider } from "antd";

const ConfirmTransferModal = ({ open, onOk, onCancel }) => {
  return (
    <>
      <Modal
        title="Confirm Transfer"
        maskClosable={false}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={600}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button type="primary" className="bg-PrimaryColor w-[100px]">
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
              Are you sure you want to transfer {"{Name_of_file}"} to{" "}
              {"{Department}"}? {/*Add name of file and department */}
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
export default ConfirmTransferModal;
