import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Flex,
  Dropdown,
  Space,
  Table,
  Tabs,
  theme,
  Skeleton,
} from 'antd';
import {
  MoreOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  SwapOutlined,
  HourglassOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import TileCard from '../../components/Cards/TileCard';
import TransferModal from './modals/transferModal';
import Icon1 from '../../assets/foldericon.svg';
import Icon2 from '../../assets/transfericon.svg';
import Icon3 from '../../assets/awaitingicon.svg';

import { useNavigate } from 'react-router-dom';
import {
  useGetFileByDepartmentsMutation,
  useGetPendingFilesMutation,
} from '../../redux/api/services/FileService';
import { useSelector } from 'react-redux';

export default function Files() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const department = useSelector((data) => data.user.department);
  const [fileId, setFileId] = useState('');
  const [allFiles, setAllFiles] = useState([]);
  const [pendingFiles, setAllPendingFiles] = useState([]);
  const [transferedFiles, setAllTransferedFiles] = useState([]);
  const [getFiles, { isLoading }] = useGetFileByDepartmentsMutation();
  const [getPendingFiles, { isLoading: isGetting }] =
    useGetPendingFilesMutation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Search } = Input;

  const [open, setOpen] = useState(false);
  const [mapPrivilege, setMapPrivilege] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'View',
      onClick: () => navigate('/view-file'),
    },
    {
      key: '2',
      label: 'Edit',
      onClick: () => navigate('/view-file'),
    },
    {
      key: '3',
      label: 'Transfer',
      onClick: (e) => {
        setOpen(true);
      },
    },
  ];

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'No. of Items',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'Date Created',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Department',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space
          onClick={() => {
            setFileId(record._id);
          }}
          size="middle">
          <Dropdown
            menu={{
              items,
            }}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const transfercolumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'No. of Items',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'Date Created',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Department',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Transferred to',
      dataIndex: 'transferdept',
      key: 'transferdept',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: () => (
        <Space size="middle">
          <Dropdown
            menu={{
              items,
            }}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  const gtMyFiles = async () => {
    const allFiles = await getFiles({ departments: department });
    const allpendingFiles = await getPendingFiles({ ids: department });

    if (allFiles.data) {
      const editedData = [];
      const pendingFiles = [];
      const transferedFiles = [];
      allFiles.data.data.map((item) => {
        editedData.push({
          ...item,
          items: item.uploads.length,
          origin: item.originalDepartment.name,
          date: moment(item.creation_date).format('YYYY-MM-DD'),
        });

        if (item.transferedTo) {
          transferedFiles.push({
            ...item,
            items: item.uploads.length,
            origin: item.originalDepartment.name,
            transferdept: item.transferedTo.name,
            date: moment(item.creation_date).format('YYYY-MM-DD'),
          });
        }
      });

      if (allpendingFiles.data) {
        allpendingFiles.data.data.map((item) => {
          pendingFiles.push({
            ...item,
            items: item.uploads.length,
            origin: item.originalDepartment.name,
            date: moment(item.creation_date).format('YYYY-MM-DD'),
          });
        });
      }
      setAllPendingFiles(pendingFiles);
      setAllFiles(editedData);
      setAllTransferedFiles(transferedFiles);
    }
  };

  const reload = () => {
    setRefresh((prev) => prev + 1);
  };
  useEffect(() => {
    if (department) {
      gtMyFiles();
    }
  }, [refresh]);
  const files = (
    <div
      style={{
        padding: 24,
        minHeight: 560,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
      <Flex vertical gap="large">
        <Flex
          justify="space-between"
          align="center"
          gap="large"
          className="pb-4">
          <div className="flex items-center">
            <Search placeholder="Search" style={{ width: 331 }} />
          </div>
          <div>
            <Button
              type="primary"
              className="text-[12px]"
              onClick={() => navigate('/new-file')}>
              <Space>Create File</Space>
            </Button>
          </div>
        </Flex>

        <div>
          <Table columns={columns} dataSource={allFiles} bordered={true} />
        </div>
      </Flex>
    </div>
  );

  const transferred = (
    <div
      style={{
        padding: 24,
        minHeight: 560,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
      <Flex vertical gap="large">
        <Flex
          justify="space-between"
          align="center"
          gap="large"
          className="pb-4">
          <div className="flex items-center">
            <Search placeholder="Search" style={{ width: 331 }} />
          </div>
        </Flex>

        <div>
          <Table
            columns={transfercolumns}
            dataSource={transferedFiles}
            bordered={true}
          />
        </div>
      </Flex>
    </div>
  );

  const pendingfilesView = (
    <div
      style={{
        padding: 24,
        minHeight: 560,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
      <Flex vertical gap="large">
        <Flex
          justify="space-between"
          align="center"
          gap="large"
          className="pb-4">
          <div className="flex items-center">
            <Search placeholder="Search" style={{ width: 331 }} />
          </div>
          <div>
            <Button
              type="primary"
              className="text-[12px]"
              onClick={() => navigate('/new-file')}>
              <Space>Create File</Space>
            </Button>
          </div>
        </Flex>

        <div>
          <Table columns={columns} dataSource={pendingFiles} bordered={true} />
        </div>
      </Flex>
    </div>
  );
  const tabItems = [
    {
      key: '1',
      label: 'Files',
      icon: <FolderOpenOutlined />,
      children: files,
    },
    {
      key: '2',
      label: 'Transferred',
      icon: <SwapOutlined />,
      children: transferred,
    },
    {
      key: '3',
      label: 'Pending Review',
      icon: <HourglassOutlined />,
      children: pendingfilesView,
    },
  ];

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-0"
        style={{ width: '70%' }}>
        {!isLoading && (
          <>
            <TileCard
              title="Total Files"
              icon={Icon1}
              iconBG="[#55A51C]"
              number={allFiles.length}
            />
            <TileCard
              title="Transferred"
              icon={Icon2}
              iconBG="[#70A1E5]"
              number={transferedFiles.length}
            />
            <TileCard
              title="Pending Review"
              icon={Icon3}
              iconBG="[#F0C274]"
              number={pendingFiles.length}
            />
          </>
        )}
      </ul>
      <div className="mt-5">
        {isLoading && <Skeleton className="w-full" loading active />}
        {!isLoading && (
          <>
            <Tabs onChange={onChange} type="card" items={tabItems} />
            <TransferModal
              reload={reload}
              fileId={fileId}
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            />
          </>
        )}
      </div>
    </>
  );
}
