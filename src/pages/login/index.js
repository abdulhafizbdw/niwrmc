import React, { useState } from "react";
import { Button, Input, Flex, Form } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo-niwrmc.svg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5F5F7] flex justify-center items-center w-full h-[100vh]">
      <Flex justify="space-between" className="w-[100%]">
        <div className="w-[90%] md:w-[30%] bg-[#FFFFFF] mx-auto my-auto p-16 text-left">
          <span>
            {" "}
            <img width={353} height={64} src={logo} alt="logo" />
          </span>
          <h1 className="font-bold text-[30px] mt-4 text-PrimaryColor">
            Log in
          </h1>
          <p className="text-[18px] mb-5">Welcome back</p>
          <form>
            <div className="w-[100%]">
              <span style={{ fontSize: "14px" }}>Username</span>
              <Input
                name="email"
                label="Username"
                className="h-[38px] w-[100%] mb-2"
                variant="outlined"
                placeholder="username"
                required
                prefix={<UserOutlined />}
              />
            </div>

            <div className="w-[100%]">
              <span style={{ fontSize: "14px" }}>Password</span>
              <Input.Password
                name="password"
                className="h-[38px] w-[100%] mb-5"
                variant="outlined"
                placeholder="password"
                type="password"
                required
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                prefix={<LockOutlined />}
              />
            </div>

            <Button
              className="h-[38px] w-[100%] mb-3 bg-PrimaryColor"
              type="primary"
              onClick={() => navigate("/folders")}
            >
              Login
            </Button>
          </form>
        </div>
      </Flex>
    </div>
  );
}
