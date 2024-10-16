import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Modal,
  Col,
  Row,
  Input,
  Select,
  Divider,
  Switch,
  notification,
  Form,
} from 'antd';
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useGetDepartmentsQuery } from '../../../redux/api/services/DepartmentService';
import { useCreateAccountMutation } from '../../../redux/api/services/AuthService';
const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  otherName: Yup.string().optional(), // Optional field
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  department: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one role is required'),
  role: Yup.array().of(Yup.string()).min(1, 'At least one role is required'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  otherName: '',
  user_id: '',
  email: '',
  password: '12345678',
  isActive: true, // Boolean field, set to false initially
  department: [],
  role: ['user'], // Default role as 'user'
};
const AddUserModal = ({ open, onOk, confirmLoading, onCancel, refetch }) => {
  const [departmentList, setDepartments] = useState([]);
  const { TextArea } = Input;
  const { data } = useGetDepartmentsQuery();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const result = data.data.filter((item) =>
        values.department.includes(item._id)
      );
      const bodyData = {
        ...values,
        departmentsData: result,
      };

      try {
        const loggedIn = await signUp(bodyData);
        if (loggedIn.error) {
          notification.error({ message: loggedIn.error.data.message });
        } else {
          notification.success({ message: 'Created Successfully' });
          formik.resetForm();
          onCancel();
          refetch();
          // navigate('/files');
        }
      } catch (error) {
        notification.error('Something went wrong');
      }
    },
  });

  const {
    email,
    password,
    firstName,
    lastName,
    otherName,

    role,
    user_id,
    department,
  } = formik.values;
  const { handleChange, handleSubmit } = formik;
  const [signUp, { isLoading }] = useCreateAccountMutation();
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
    <>
      <Modal
        title="New User"
        maskClosable={false}
        open={open}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        width={600}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              loading={isLoading}
              onClick={() => {
                handleSubmit();
              }}
              type="primary"
              className="bg-PrimaryColor">
              <CheckCircleOutlined />
              Submit
            </Button>
          </>
        )}>
        <Divider style={{ marginTop: '2px', marginBottom: '35px' }} />
        <Form layout="vertical">
          {/* <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
            <Col span={12}>
              <Form.Item
                label="User ID"
                name="user_id"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: '0' }}>
                <Input
                  value={user_id}
                  onChange={handleChange}
                  name="user_id"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="ID"
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: '0' }}>
                <Input
                  value={firstName}
                  onChange={handleChange}
                  name="firstName"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: '0' }}>
                <Input
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter Last Name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
            <Col span={12}>
              <Form.Item
                label="Other Name"
                name="otherName"
                rules={[
                  {
                    required: false,
                  },
                ]}
                style={{ marginBottom: '0' }}>
                <Input
                  value={otherName}
                  onChange={handleChange}
                  name="otherName"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter Other Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: '0' }}>
                <Input
                  value={email}
                  onChange={handleChange}
                  name="email"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter Email"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 18 }} className="mb-3">
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: '0' }}>
                <Input
                  value={password}
                  onChange={handleChange}
                  name="password"
                  className="h-[38px] w-[100%] mb-3"
                  variant="outlined"
                  placeholder="Enter Password"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: '0' }}>
                <Select
                  value={role}
                  onChange={(e) => {
                    const newRole = [e];
                    formik.values.role = newRole;
                  }}
                  className="h-[38px] w-[100%] mb-3"
                  defaultValue="user"
                  options={[
                    { value: 'user', label: 'User' },
                    { value: 'admin', label: 'Admin' },
                    // { value: 'super_admin', label: 'Super Administrator' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 18 }} className="mb-3">
            <Col span={24}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ marginBottom: '0' }}>
                <Select
                  mode="multiple"
                  onChange={(e) => {
                    formik.values.department = e;
                  }}
                  className="h-[38px] w-[100%] mb-3"
                  options={departmentList}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <span className="text-[14px]">
          <Switch
            onChange={(e) => {
              formik.values.isActive = e;
            }}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />{' '}
          Make active
        </span>
        <Row style={{ margin: '30px 0' }}>
          <Col />{' '}
        </Row>
      </Modal>
    </>
  );
};
export default AddUserModal;
