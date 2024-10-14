import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Col,
  Row,
  Input,
  Select,
  Divider,
  notification,
  Form,
} from "antd";
import { useGetDepartmentsQuery } from "../../../redux/api/services/DepartmentService";
import { useTransferFileMutation } from "../../../redux/api/services/FileService";
import { useChangePasswordMutation } from "../../../redux/api/services/AuthService";

const ChangePasswordModal = ({
  open,
  onOk,
  confirmLoading,
  onCancel,
  fileId,
  reload,
  fileName,
  email,
}) => {
  const [departmentList, setDepartments] = useState([]);
  const [tranferTo, setTransferTo] = useState(undefined);
  const { data } = useGetDepartmentsQuery();
  const [transferFile] = useTransferFileMutation();
  const [changePass, { isLoading }] = useChangePasswordMutation();
  const [password, setPassord] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleOk = () => {
    setTimeout(() => {}, 2000);
  };
  const handleCancel = () => {
    setOpenConfirmModal(false);
  };

  useEffect(() => {
    if (data) {
      const newData = data.data.map((dp) => ({
        label: dp.name,
        value: dp._id,
      }));

      setDepartments(newData);
    }
  }, [data]);
  const handleTransfer = async () => {
    if (!tranferTo) {
      notification.error({
        message: "Please select department to transfer to",
      });
    }
    setOpenConfirmModal(true);

    try {
      const transfered = await transferFile({
        fileId,
        transferedTo: tranferTo,
      });
      if (transfered.error) {
        notification.error({
          message: transfered.error.data.message,
        });
      } else {
        notification.success({
          message: `Transfered File to ${tranferTo.name}`,
        });
        setTransferTo(undefined);
        reload();
        onCancel();
      }
    } catch (error) {
      notification.error("Something went wrong");
    }
  };
  return (
    <>
      <Modal
        title="Change Password"
        maskClosable={false}
        open={open}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        width={600}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              loading={isLoading}
              onClick={async () => {
                if (password.length < 8) {
                  notification.error({
                    message: "Password must be at least 8 characters",
                  });
                  return;
                }
                const changed = await changePass({
                  email,
                  newPassword: password,
                });
                if (changed.data) {
                  notification.success({
                    message: `Password chaged successfully`,
                  });

                  reload();
                  onCancel();
                }
              }}
              // onClick={() => setOpenConfirmModal(true)}
              type="primary"
              style={{ backgroundColor: "#cc7a30" }}
            >
              Change and save password
            </Button>
          </>
        )}
      >
        <Divider style={{ marginTop: "2px", marginBottom: "35px" }} />

        <Row
          gutter={{ xs: 8, sm: 16, md: 18 }}
          style={{ marginBottom: "25px" }}
        >
          <Col
            span={20}
            offset={2}
            style={{ fontSize: "16px", textAlign: "center" }}
          >
            <span>You are about to change password for your account</span>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col span={24}>
            <Form layout="vertical">
              <Form.Item
                label="New Password"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                <Input
                  onChange={(e) => setPassord(e.target.value)}
                  value={password}
                  name="password"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter New Password"
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <Row style={{ margin: "30px 0" }}>
          <Col />{" "}
        </Row>
      </Modal>
    </>
  );
};
export default ChangePasswordModal;
