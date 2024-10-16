import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Flex,
  Dropdown,
  Space,
  Table,
  Tag,
  Select,
  theme,
  Skeleton,
} from 'antd';
import { UserOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import AddUserModal from './modals/addUser';
import EditUserModal from './modals/editUser';
import ChangePasswordModal from './modals/changePassword';
import DeleteUserModal from './modals/deleteUser';

import { useNavigate } from 'react-router-dom';
import { useGetUsersMutation } from '../../redux/api/services/AuthService';
import { icons } from 'antd/es/image/PreviewGroup';
import { useGetDepartmentsQuery } from '../../redux/api/services/DepartmentService';
import debounce from 'lodash.debounce';
export default function UserManagement() {
  const navigate = useNavigate();
  const [currenPage, setCurrentPage] = useState(1);
  const [allTotal, setAllTotal] = useState(0);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [departmentValue, setDepartmentValue] = useState('');

  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [users, setUsers] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Search } = Input;
  const [getUsers, { isLoading }] = useGetUsersMutation();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState([]);

  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [searchValue, setSearcherValue] = useState('');
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const handleSearch = debounce((value) => {
    setDebouncedSearchValue(value);
  }, 3000);
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
    setOpen(false);
    setOpenEdit(false);
    setOpenPassword(false);
    setOpenDelete(false);
  };
  const [role, setRole] = useState('');
  const [isActive, setIsActive] = useState('');
  const handleGetUsers = async () => {
    const conditional = departmentValue
      ? { departments: [departmentValue] }
      : {};
    const roleConditional = role ? { user: [role] } : {};

    const all_users = await getUsers({
      page: currenPage,
      search: debouncedSearchValue,
      ...conditional,
      ...roleConditional,
      isActive,
    });
    if (all_users.data) {
      const refactored = [];
      setUsers(all_users.data.data);
      setAllTotal(all_users.data.pagination.total);
      all_users.data.data.map((user, ind) => {
        refactored.push({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          status: user.isActive,
          role: user.role.map((role) => `${role} `),
          key: ind,
          department: user.departmentsData?.map(
            (department) => `${department.name}  `
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
    {
      key: '3',
      label: 'Delete',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => {
        setOpenDelete(true);
      },
    },
  ];
  useEffect(() => {
    handleGetUsers();
  }, [
    departmentValue,
    currenPage,
    debouncedSearchValue,
    role,
    isActive,
    refresh,
  ]);

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
            setCurrentDepartment(users[i].department);
            setCurrentUser(users[i]);
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

  const { data } = useGetDepartmentsQuery();
  const [departmentList, setDepartments] = useState([]);

  useEffect(() => {
    if (data) {
      const newData = data.data.map((dp) => ({
        label: dp.name,
        value: dp._id,
      }));

      setDepartments(newData);
    }
  }, [data]);
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
              <Flex
                justify="space-between"
                align="center"
                gap="large"
                className="pb-4">
                <div className="flex items-center">
                  <Space size="middle">
                    <Search
                      autoFocus={searchValue ? true : false}
                      placeholder="Search"
                      style={{ width: 331 }}
                      value={searchValue}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSearcherValue(value);
                        handleSearch(value);
                      }}
                    />
                    <Space>
                      <span>Department:</span>
                      <Select
                        value={departmentValue}
                        onChange={(e) => {
                          setSearcherValue('');
                          setDebouncedSearchValue('');
                          setDepartmentValue(e);
                        }}
                        options={[
                          { label: 'All', value: '' },
                          ...departmentList,
                        ]}
                        className="w-[250px]"
                      />
                    </Space>
                    <Space>
                      <span>Role:</span>
                      <Select
                        value={role}
                        onChange={(e) => {
                          setRole(e);
                        }}
                        className="w-[100px]"
                        options={[
                          { value: '', label: 'All' },
                          { value: 'user', label: 'User' },
                          { value: 'admin', label: 'Admin' },
                        ]}
                      />
                    </Space>
                    <Space>
                      <span>Status:</span>
                      <Select
                        value={isActive}
                        onChange={(e) => {
                          setIsActive(e);
                        }}
                        className="w-[100px]"
                        options={[
                          { value: '', label: 'All' },
                          { value: true, label: 'Active' },
                          { value: false, label: 'Inactive' },
                        ]}
                      />
                    </Space>
                  </Space>
                </div>
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
      <AddUserModal
        refetch={() => {}}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />

      <EditUserModal
        refetch={refetch}
        currentDepartment={currentDepartment}
        currentUser={currentUser}
        open={openEdit}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
      <ChangePasswordModal
        reload={refetch}
        email={currentUser?.email}
        open={openPassword}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
      <DeleteUserModal
        reload={refetch}
        email={currentUser?.email}
        open={openDelete}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </div>
  );
}
