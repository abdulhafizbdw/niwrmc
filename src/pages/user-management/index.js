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
import { UserOutlined, MoreOutlined } from '@ant-design/icons';
import AddUserModal from './modals/addUser';

import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../../redux/api/services/AuthService';

const items = [
  {
    key: '1',
    label: 'Edit',
  },
  {
    key: '2',
    label: 'Reset Password',
  },
  {
    key: '3',
    label: 'Delete',
  },
];

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
const data = [
  {
    key: '1',
    name: 'Aliyu Bello',
    email: 'aliyu456@gmail.com',
    role: 'Super Administrator',
    department: 'Executive Director Office',
    status: 'active',
  },
  {
    key: '2',
    name: 'Sani Bukar',
    email: 'sani123@gmail.com',
    role: 'Admin',
    department: 'Human Resource Department',
    status: 'active',
  },
  {
    key: '3',
    name: 'Victor Johnson',
    email: 'vic@gmail.com',
    role: 'User',
    department: 'Authorization & Allocation Department',
    status: 'inactive',
  },
  {
    key: '4',
    name: 'Susan James',
    email: 'susan456@yahoo.com',
    role: 'User',
    department: 'Corporate Services Department',
    status: 'active',
  },
  {
    key: '5',
    name: 'Hauwa Yusuf',
    email: 'yusufhauwa@gmail.com',
    role: 'User',
    department: 'Human Resource Department',
    status: 'active',
  },
];

export default function UserManagement() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Search } = Input;
  const {
    data: users,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetUsersQuery();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
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
  const handleGetUsers = async () => {
    if (users) {
      const refactored = [];
      console.log(users.data);
      users.data.map((user, ind) => {
        refactored.push({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          status: user.isActive,
          department: '',
          role: user.role.map((role) => `${role} 👥 `),
          key: ind,
          department: user.departmentsData?.map(
            (department) => `${department.name} 💼 `
          ),
        });
      });
      setAllUsers(refactored);
    }
  };
  useEffect(() => {
    handleGetUsers();
  }, [users]);
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
          {(isLoading || isFetching) && (
            <Skeleton className="w-full" loading active />
          )}
          {!(isLoading || isFetching) && (
            <>
              <Flex justify="end" align="center" gap="large" className="pb-4">
                <div>
                  <Button
                    type="primary"
                    className="bg-PrimaryColor text-[12px]"
                    onClick={() => setOpen(true)}>
                    <Space>Create User</Space>
                  </Button>
                </div>
              </Flex>

              <div>
                <Table
                  columns={columns}
                  dataSource={allUsers}
                  bordered={true}
                />
              </div>
            </>
          )}
        </Flex>
      </div>
      <AddUserModal
        refetch={refetch}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </div>
  );
}
