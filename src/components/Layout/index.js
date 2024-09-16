import React, { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FolderOpenOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout, Menu, theme, Typography } from "antd";
import logo from "../../assets/niwrmclogo.jpg";

const { Header, Sider, Content } = Layout;
const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
        }}
      >
        <div className="logo-vertical my-5 ml-4">
          <span>
            {" "}
            <Flex align="center">
              <img width={50} src={logo} alt="logo" />
              <span className="text-sm leading-none ml-1">
                Nigeria Integrated Water Resource Management Commission
              </span>
            </Flex>
          </span>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              key: "/files",
              icon: <FolderOpenOutlined />,
              label: "Files",
            },
            {
              key: "/users",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: "login",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout
        style={{
          minHeight: "100vh",
          width: "auto",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          /> */}
          <span className="text-xl font-bold text-black ml-10">
            NIWRMC File Registry
          </span>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            // minHeight: 780,
          }}
        >
          {/* page content */}
          <div className="flex-1 flex flex-col p-0">{<Outlet />}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
