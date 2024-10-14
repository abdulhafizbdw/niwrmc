import React, { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  UserOutlined,
  FolderOpenOutlined,
  LogoutOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu, theme } from "antd";
import logo from "../../assets/niwrmclogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../redux/slices/userSlice";

const { Header, Sider, Content } = Layout;
const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const fullname = useSelector((data) => data.user.fullName);
  const role = useSelector((data) => data.user.role);
  const dispatch = useDispatch();
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
            if (key == "login") {
              dispatch(setRole(""));
            }

            navigate(key);
          }}
          items={[
            {
              key: "/files",
              icon: <FolderOpenOutlined />,
              label: "Files",
            },
            {
              key: "/projects",
              icon: <ProjectOutlined />,
              label: "Projects",
            },
            {
              key: "/profile",
              icon: <UserOutlined />,
              label: "Profile",
            },
            role == "admin" && {
              key: "/users",
              icon: <UsergroupAddOutlined />,
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
          className="flex items-center justify-between"
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
          <div className="px-[20px] flex items-center">
            <div className="w-[30px] h-[30px] rounded-full bg-orange-700 flex justify-center items-center mr-[10px] text-white">
              {fullname.split("")[0]}
            </div>
            <h1 className="text-black">{fullname}</h1>
          </div>
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
