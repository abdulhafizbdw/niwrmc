import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Col,
  Row,
  Input,
  Select,
  Divider,
  notification,
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useGetDepartmentsQuery } from '../../../redux/api/services/DepartmentService';
import { useTransferFileMutation } from '../../../redux/api/services/FileService';
import ConfirmTransferModal from './confirmTransfer';
import { useSelector } from 'react-redux';

const TransferModal = ({
  open,
  onOk,
  confirmLoading,
  onCancel,
  fileId,
  reload,
  fileName,
}) => {
  const [departmentList, setDepartments] = useState([]);
  const [tranferTo, setTransferTo] = useState(undefined);
  const { data } = useGetDepartmentsQuery();
  const [transferFile, { isLoading }] = useTransferFileMutation();
  const myDepartments = useSelector((data) => data.user.department);
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
      const result = newData.filter(
        (item) => !myDepartments.includes(item.value)
      );
      setDepartments(result);
    }
  }, [data]);
  const handleTransfer = async () => {
    if (!tranferTo) {
      notification.error({
        message: 'Please select department to transfer to',
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
      notification.error('Something went wrong');
    }
  };
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
            <Button
              loading={isLoading}
              onClick={() => setOpenConfirmModal(true)}
              // onClick={() => setOpenConfirmModal(true)}
              type="primary"
              className="bg-PrimaryColor">
              Transfer
              <ArrowRightOutlined />
            </Button>
          </>
        )}>
        <Divider style={{ marginTop: '2px', marginBottom: '35px' }} />

        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col span={24}>
            <span style={{ fontSize: '14px' }}>Transfer to</span>
            <Select
              onChange={(e) => {
                setTransferTo({
                  name: departmentList.find((d) => d.value == e)?.label,
                  id: e,
                });
              }}
              className="h-[38px] w-[100%] mb-3"
              options={departmentList}
            />
          </Col>
        </Row>

        <Row style={{ margin: '30px 0' }}>
          <Col />{' '}
        </Row>
      </Modal>
      <ConfirmTransferModal
        fileName={fileName}
        transferFileName={tranferTo?.name}
        open={openConfirmModal}
        onOk={handleOk}
        onCancel={handleCancel}
        handleTransfer={handleTransfer}
        isLoading={isLoading}
      />
    </>
  );
};
export default TransferModal;
