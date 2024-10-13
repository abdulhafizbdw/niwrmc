import React from 'react';
import { Button, Modal, Col, Row, Divider, message } from 'antd';
import { useDeleteFileMutation } from '../../../redux/api/services/FileService';
import { useDispatch, useSelector } from 'react-redux';
import { setLastFile } from '../../../redux/slices/userSlice';

const DeleteFileModal = ({
  open,
  onOk,
  onCancel,
  isLoading,
  refresh,
  fileName,
  fileId,
}) => {
  const [deleteFile, { isLoading: deleting }] = useDeleteFileMutation();
  const lastFile = useSelector((data) => data.user.lastFile);
  const dispatch = useDispatch();
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
              onClick={async () => {
                const deletedFile = await deleteFile({ fileId });
                if (deletedFile.data) {
                  const currentLast = lastFile - 1;

                  message.success('Deleted file successfully');
                  dispatch(setLastFile(currentLast));
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
              <span style={{ color: 'red' }}>delete</span> {fileName}?
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
export default DeleteFileModal;
