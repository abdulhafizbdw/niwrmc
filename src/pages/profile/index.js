import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Flex,
  Dropdown,
  Space,
  Table,
  Tag,
  theme,
  Skeleton,
} from 'antd';
import { UserOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import EditProfileModal from './modals/editProfile';
import ChangePasswordModal from './modals/changePassword';

import { useNavigate } from 'react-router-dom';
import {
  useGetProfileMutation,
  
} from '../../redux/api/services/AuthService';
import { icons } from 'antd/es/image/PreviewGroup';
import { useSelector } from 'react-redux';

export default function Profile() {
  const navigate = useNavigate();
  const [currenPage, setCurrentPage] = useState(1);
  const [allTotal, setAllTotal] = useState(0);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userProfile, setUserProfile] = useState(undefined);
  const [refresh, setRefresh] = useState(0);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Search } = Input;
  const [getProfile, { data, error, isLoading }] =
    useGetProfileMutation(currenPage);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const email = useSelector((data) => data.user.email);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setOpenEdit(false);
      setOpenPassword(false);
      setOpenDelete(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
    setOpenEdit(false);
    setOpenPassword(false);
    setOpenDelete(false);
  };
  const handleGetUsers = async () => {
    const myProfile = await getProfile({ email });
    if (myProfile.data) {
      setUserProfile(myProfile.data.data);
      const refactored = [];
      [myProfile.data.data].map((user, ind) => {
        refactored.push({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          status: user.isActive,
          role: user.role.map((role) => `${role} `),
          key: ind,
          department: user.departmentsData?.map(
            (department) => `${department.name} `
          ),
        });
      });
      setAllUsers(refactored);
    }
  };

  const items = [
    {
      key: '1',
      label: 'Edit',
      onClick: () => {
        setOpenEdit(true);
      },
    },
    {
      key: '2',
      label: 'Change Password',
      onClick: () => {
        setOpenPassword(true);
      },
    },
  ];
  useEffect(() => {
    handleGetUsers();
  }, [refresh]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'User Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <span>
          <Tag color={status === true ? 'green' : 'red'} key={status}>
            {status ? 'ACTIVE' : 'INACTIVE'}
          </Tag>
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (ind, user, i) => (
        <Space
          onClick={() => {
            setCurrentDepartment(userProfile?.department);
            setCurrentUser(userProfile);
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

  return (
    <div className="">
      <div
        style={{
          padding: 24,
          minHeight: 560,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
        <Flex vertical gap="large">
          {isLoading && <Skeleton className="w-full" loading active />}
          {!isLoading && (
            <>
              <Flex justify="end" align="center" gap="large" className="pb-4">
                <div>
                  <Button
                    type="primary"
                    className="bg-PrimaryColor text-[12px]"
                    onClick={() => {
                      setCurrentDepartment(userProfile?.department);
                      setCurrentUser(userProfile);
                      setOpenEdit(true);
                    }}>
                    <Space>Edit Details</Space>
                  </Button>
                </div>
              </Flex>

              <div>
                <Table
                  onChange={(pagination) => {
                    setCurrentPage(pagination.current);
                  }}
                  pagination={{
                    pageSize: 10,

                    total: allTotal,
                    current: currenPage,
                  }}
                  columns={columns}
                  dataSource={allUsers}
                  bordered={true}
                />
              </div>
            </>
          )}
        </Flex>
      </div>
      <EditProfileModal
        refetch={() => setRefresh((prev) => prev + 1)}
        currentDepartment={currentDepartment}
        currentUser={currentUser}
        open={openEdit}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
      <ChangePasswordModal
        reload={() => setRefresh((prev) => prev + 1)}
        email={currentUser?.email}
        open={openPassword}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </div>
  );
}
