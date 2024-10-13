import React from 'react';
import { Button, Modal, Col, Row, Divider, message } from 'antd';
import { useDeleteFolderMutation } from '../../../redux/api/services/FolderService';

const DeleteProjectModal = ({
  open,
  onOk,
  onCancel,
  isLoading,
  refresh,
  folderId,
  folderName,
}) => {
  const [deletFolder, { isLoading: deleting }] = useDeleteFolderMutation();
  return (
    <>
      <Modal
        title="Delete Project"
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
                const deleted = await deletFolder({ folderId });
                if (deleted.data) {
                  message.success('Deted Project successfully');
                  onCancel();
                  refresh();
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
              <span style={{ color: 'red' }}>delete</span> {folderName}?
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
export default DeleteProjectModal;
