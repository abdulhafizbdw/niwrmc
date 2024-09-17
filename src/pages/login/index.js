import React, { useState } from "react";
import { Button, Input, Flex, Form } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import BackgroundImg from "../../assets/bg.png";
import logo from "../../assets/logo-niwrmc.svg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="bg-silver flex justify-center items-center w-full h-[100vh]">
      <Flex justify="space-between" className="w-[100%]">
        <Flex
          vertical
          justify="space-between"
          style={{
            padding: 32,
            width: "30%",
          }}
        >
          <div className="bg-[#FFFFFF] mx-auto my-auto p-3 text-left">
            <span>
              {" "}
              <img width={353} height={64} src={logo} alt="logo" />
            </span>

            <h1 className="font-bold text-[30px] text-PrimaryColor mt-4">
              Log in
            </h1>
            <p className="text-[18px] mt-2">
              Welcome back to{" "}
              <span className="font-semibold">NIWRMC File Registry</span>
            </p>
            <p className="mb-5">Sign into your account</p>
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
                onClick={() => navigate("/files")}
              >
                Log In
              </Button>
            </form>
          </div>
        </Flex>
        <div
          style={{
            background: `no-repeat center/cover, url(${BackgroundImg}) no-repeat center/contain`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "auto",
          }}
          className="p-5 bg-white h-[100vh] w-[70%]"
        >
          <div className="w-[35%] mx-auto h-full flex items-center">
            <Flex vertical align="center">
              <p className="text-[56px] text-white text-center font-bold">
                NIWRMC File Registry
              </p>
            </Flex>
          </div>
        </div>
      </Flex>
    </div>
  );
}
