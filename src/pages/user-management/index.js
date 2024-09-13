import React, { useState } from "react";
import {
  Button,
  Input,
  Flex,
  Select,
  Dropdown,
  Space,
  Table,
  Tag,
  theme,
} from "antd";
import {
  CheckSquareOutlined,
  FormOutlined,
  CloseSquareOutlined,
  DownOutlined,
  UserOutlined,
  AppstoreOutlined,
  PlusOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import AddUserModal from "./modals/addUser";

import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];

const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "USER ID",
    dataIndex: "userID",
    key: "userID",
  },
  {
    title: "ROLE",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "DEPARTMENT",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
    render: (status) => (
      <span>
        <Tag color={status === "active" ? "green" : "red"} key={status}>
          {status.toUpperCase()}
        </Tag>
      </span>
    ),
  },
  {
    title: "ACTION",
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
const data = [
  {
    key: "1",
    name: "Aliyu Bello",
    userID: "aliyu456",
    role: "Super Administrator",
    department: "IT Department",
    status: "active",
  },
  {
    key: "2",
    name: "Sani Bukar",
    userID: "sani123",
    role: "Security Administrator",
    department: "IT Department",
    status: "active",
  },
  {
    key: "3",
    name: "Victor Johnson",
    userID: "vic",
    role: "Project Manager",
    department: "Procurement Department",
    status: "inactive",
  },
  {
    key: "4",
    name: "Susan James",
    userID: "susan456",
    role: "Officer",
    department: "Finance Department",
    status: "active",
  },
  {
    key: "5",
    name: "Hauwa Yusuf",
    userID: "yusufhauwa",
    role: "Supervisor",
    department: "IT Department",
    status: "active",
  },
];

export default function UserManagement() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Search } = Input;

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined />,
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
            <Table columns={columns} dataSource={data} />
          </div>
        </Flex>
      </div>
      <AddUserModal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </div>
  );
}
