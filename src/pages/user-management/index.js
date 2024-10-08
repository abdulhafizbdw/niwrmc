import React, { useEffect, useState } from "react";
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
} from "antd";
import { UserOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import AddUserModal from "./modals/addUser";
import EditUserModal from "./modals/editUser";
import ChangePasswordModal from "./modals/changePassword";
import DeleteUserModal from "./modals/deleteUser";

import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../redux/api/services/AuthService";
import { icons } from "antd/es/image/PreviewGroup";

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
  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
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
    console.log("Clicked cancel button");
    setOpen(false);
    setOpenEdit(false);
    setOpenPassword(false);
    setOpenDelete(false);
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
          department: "",
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

  const items = [
    {
      key: "1",
      label: "Edit",
      onClick: () => {
        setOpenEdit(true);
      },
    },
    {
      key: "2",
      label: "Change Password",
      onClick: () => {
        setOpenPassword(true);
      },
    },
    {
      key: "3",
      label: "Delete",
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => {
        setOpenDelete(true);
      },
    },
  ];
  useEffect(() => {
    handleGetUsers();
  }, [users]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <span>
          <Tag color={status === true ? "green" : "red"} key={status}>
            {status ? "ACTIVE" : "INACTIVE"}
          </Tag>
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: () => (
        <Space size="middle">
          <Dropdown
            menu={{
              items,
            }}
          >
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
        }}
      >
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
                    onClick={() => setOpen(true)}
                  >
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
      <EditUserModal
        open={openEdit}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
      <ChangePasswordModal
        open={openPassword}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
      <DeleteUserModal
        open={openDelete}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </div>
  );
}
