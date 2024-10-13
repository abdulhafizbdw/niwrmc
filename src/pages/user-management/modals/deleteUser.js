import React from 'react';
import { Button, Modal, Col, Row, Divider, message } from 'antd';
import { useDeleteUserMutation } from '../../../redux/api/services/AuthService';

const DeleteUserModal = ({
  open,
  onOk,
  onCancel,
  isLoading,
  reload,
  email,
}) => {
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
  return (
    <>
      <Modal
        title="Delete User"
        maskClosable={false}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={600}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              onClick={async () => {
                const deletedFile = await deleteUser({ email });
                if (deletedFile.data) {
                  message.success('Deleted user successfully');
                  onCancel();
                  reload();
                }
              }}
              loading={deleting}
              type="primary"
              className="bg-[#e23939] w-[100px]">
              Yes
            </Button>
          </>
        )}>
        <Divider style={{ marginTop: '2px', marginBottom: '35px' }} />

        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col
            span={20}
            offset={2}
            style={{ fontSize: '16px', textAlign: 'center' }}>
            <span>
              Are you sure you want to{' '}
              <span style={{ color: 'red' }}>delete</span> {email}?
            </span>
          </Col>
        </Row>

        <Row style={{ margin: '30px 0' }}>
          <Col />{' '}
        </Row>
      </Modal>
    </>
  );
};
export default DeleteUserModal;
