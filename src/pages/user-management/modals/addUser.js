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
  user_id: Yup.string().required('User ID is required'),
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
const AddUserModal = ({ open, onOk, confirmLoading, onCancel }) => {
  const [departmentList, setDepartments] = useState([]);
  const { TextArea } = Input;
  const { data } = useGetDepartmentsQuery();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const loggedIn = await signUp(values);
        if (loggedIn.error) {
          notification.error({ message: loggedIn.error.data.message });
        } else {
          notification.success({ message: 'Created Successfully' });
          // navigate('/files');
        }
      } catch (error) {
        notification.error('Something went wrong');
      }
    },
  });

  const {
    email,

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
        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col span={12}>
            <span style={{ fontSize: '14px' }}>User ID</span>
            <Input
              value={user_id}
              onChange={handleChange}
              name="user_id"
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="ID"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col span={12}>
            <span style={{ fontSize: '14px' }}>First Name</span>
            <Input
              value={firstName}
              onChange={handleChange}
              name="firstName"
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="Enter Name"
            />
          </Col>
          <Col span={12}>
            <span style={{ fontSize: '14px' }}>Last Name</span>
            <Input
              name="lastName"
              value={lastName}
              onChange={handleChange}
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="Enter Last Name"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
          <Col span={12}>
            <span style={{ fontSize: '14px' }}>Other Name</span>
            <Input
              value={otherName}
              onChange={handleChange}
              name="otherName"
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="Enter Other Name"
            />
          </Col>
          <Col span={12}>
            <span style={{ fontSize: '14px' }}>Email</span>
            <Input
              value={email}
              onChange={handleChange}
              name="email"
              className="h-[38px] w-[100%] mb-3"
              variant="outlined"
              placeholder="Enter Email"
            />
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 18 }} className="mb-3">
          <Col span={12}>
            <span style={{ fontSize: '14px' }}>Department</span>
            <Select
              onChange={(e) => {
                const newDepartment = [...department, e];

                formik.values.department = newDepartment;
              }}
              className="h-[38px] w-[100%] mb-3"
              options={departmentList}
            />
          </Col>
          <Col span={12}>
            <span style={{ fontSize: '14px' }}>Role</span>
            <Select
              value={role}
              onChange={(e) => {
                const newRole = [...role, e];
                formik.values.role = newRole;
              }}
              className="h-[38px] w-[100%] mb-3"
              defaultValue="user"
              options={[
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' },
                { value: 'super_admin', label: 'Super Administrator' },
              ]}
            />
          </Col>
        </Row>
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
