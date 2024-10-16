import React, { useState } from 'react';
import { Button, Input, Flex, Form, notification } from 'antd';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import BackgroundImg from '../../assets/bg.png';
import logo from '../../assets/logo-niwrmc.svg';
import { useNavigate } from 'react-router-dom';
import { useLoginAccountMutation } from '../../redux/api/services/AuthService';
import { useDispatch } from 'react-redux';
import {
  setDepartment,
  setFullName,
  setRole,
  setUserMail,
} from '../../redux/slices/userSlice';
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginAccountMutation();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const loggedIn = await login(values);
        if (loggedIn.error) {
          notification.error({ message: loggedIn.error.data.message });
        } else {
          notification.success({ message: 'Logged in Successfully' });
          navigate('/files');
          dispatch(setUserMail(values.email));
          dispatch(setDepartment(loggedIn.data.user.department));
          dispatch(
            setFullName(
              `${loggedIn.data.user.firstName} ${loggedIn.data.user.lastName}`
            )
          );
          dispatch(setRole(loggedIn.data.user.role[0]));
        }
      } catch (error) {
        notification.error('Something went wrong');
      }
    },
  });
  const { email, password } = formik.values;
  const { handleChange, handleSubmit } = formik;
  return (
    <div className="bg-silver flex justify-center items-center w-full h-[100vh]">
      <Flex justify="space-between" className="w-[100%]">
        <Flex
          vertical
          justify="space-between"
          style={{
            padding: 32,
            width: '30%',
          }}>
          <div className="bg-[#FFFFFF] mx-auto my-auto p-3 text-left">
            <span>
              {' '}
              <img width={353} height={64} src={logo} alt="logo" />
            </span>

            <h1 className="font-bold text-[30px] text-PrimaryColor mt-4">
              Log in
            </h1>
            <p className="text-[18px] mt-2">
              Welcome back to{' '}
              <span className="font-semibold">NIWRMC File Registry</span>
            </p>
            <p className="mb-5">Sign into your account</p>
            <form>
              <div className="w-[100%]">
                <span style={{ fontSize: '14px' }}>Email Address</span>
                <Input
                  value={email}
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  className="h-[38px] w-[100%] mb-2"
                  variant="outlined"
                  placeholder="Enter your email"
                  required
                  prefix={<UserOutlined />}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-[red] text-left">{formik.errors.email}</p>
                ) : (
                  ''
                )}
              </div>

              <div className="w-[100%]">
                <span style={{ fontSize: '14px' }}>Password</span>
                <Input.Password
                  value={password}
                  onChange={handleChange}
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
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-[red] text-left">
                    {formik.errors.password}
                  </p>
                ) : (
                  ''
                )}
              </div>

              <Button
                loading={isLoading}
                className="h-[38px] w-[100%] mb-3 bg-PrimaryColor"
                type="primary"
                onClick={() => handleSubmit()}>
                Log In
              </Button>
            </form>
          </div>
        </Flex>
        <div
          style={{
            background: `no-repeat center/cover, url(${BackgroundImg}) no-repeat center/contain`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'auto',
          }}
          className="p-5 bg-white h-[100vh] w-[70%]">
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
