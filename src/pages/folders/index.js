import React, { useState } from "react";
import { Button, Input, Flex, Dropdown, Space, Table, Tabs, theme } from "antd";
import {
  MoreOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  SwapOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import TileCard from "../../components/Cards/TileCard";
import TransferModal from "./modals/transferModal";
import Icon1 from "../../assets/foldericon.svg";
import Icon2 from "../../assets/transfericon.svg";
import Icon3 from "../../assets/awaitingicon.svg";

import { useNavigate } from "react-router-dom";

export default function Folders() {
  const navigate = useNavigate();
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
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "View",
    },
    {
      key: "2",
      label: "Edit",
    },
    {
      key: "3",
      label: "Transfer",
      onClick: () => setOpen(true),
    },
  ];

  const columns = [
    {
      title: "Folder Title",
      dataIndex: "folder",
      key: "folder",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "No. of Items",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
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
  const data = [
    {
      key: "1",
      folder: "Department Folder 501",
      type: "Documentation",
      items: "19",
      date: "10/08/2024",
      department: "IT Department",
      transferdept: "Finance Department",
    },
    {
      key: "2",
      folder: "Department Folder 501",
      type: "Documentation",
      items: "19",
      date: "10/08/2024",
      department: "IT Department",
      transferdept: "Procurement Department",
    },
    {
      key: "3",
      folder: "Department Folder 501",
      type: "Documentation",
      items: "19",
      date: "10/08/2024",
      department: "IT Department",
      transferdept: "Accounts Department",
    },
    {
      key: "4",
      folder: "Department Folder 501",
      type: "Documentation",
      items: "19",
      date: "10/08/2024",
      department: "IT Department",
      transferdept: "Training Department",
    },
    {
      key: "5",
      folder: "Department Folder 501",
      type: "Documentation",
      items: "19",
      date: "10/08/2024",
      department: "IT Department",
      transferdept: "Human Department",
    },
  ];

  const transfercolumns = [
    {
      title: "Folder Title",
      dataIndex: "folder",
      key: "folder",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "No. of Items",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Transferred to",
      dataIndex: "transferdept",
      key: "transferdept",
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

  const folders = (
    <div
      style={{
        padding: 24,
        minHeight: 560,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Flex vertical gap="large">
        <Flex
          justify="space-between"
          align="center"
          gap="large"
          className="pb-4"
        >
          <div className="flex items-center">
            <Search placeholder="Search" style={{ width: 331 }} />
          </div>
          <div>
            <Button
              type="primary"
              className="text-[12px]"
              onClick={() => navigate("/new-folder")}
            >
              <Space>Create Folder</Space>
            </Button>
          </div>
        </Flex>

        <div>
          <Table columns={columns} dataSource={data} bordered={true} />
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
      }}
    >
      <Flex vertical gap="large">
        <Flex
          justify="space-between"
          align="center"
          gap="large"
          className="pb-4"
        >
          <div className="flex items-center">
            <Search placeholder="Search" style={{ width: 331 }} />
          </div>
        </Flex>

        <div>
          <Table columns={transfercolumns} dataSource={data} bordered={true} />
        </div>
      </Flex>
    </div>
  );

  const tabItems = [
    {
      key: "1",
      label: "Folders",
      icon: <FolderOpenOutlined />,
      children: folders,
    },
    {
      key: "2",
      label: "Transferred",
      icon: <SwapOutlined />,
      children: transferred,
    },
    {
      key: "3",
      label: "Awaiting Review",
      icon: <HourglassOutlined />,
      children: folders,
    },
  ];

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-0"
        style={{ width: "70%" }}
      >
        <TileCard
          title="Total Folders"
          icon={Icon1}
          iconBG="[#55A51C]"
          number="320"
        />
        <TileCard
          title="Transferred"
          icon={Icon2}
          iconBG="[#70A1E5]"
          number="57"
        />
        <TileCard
          title="Awaiting Review"
          icon={Icon3}
          iconBG="[#F0C274]"
          number="06"
        />
      </ul>
      <div className="mt-5">
        <Tabs onChange={onChange} type="card" items={tabItems} />

        <TransferModal
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
}
