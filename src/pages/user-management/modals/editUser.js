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
import { useEditUserMutation } from '../../../redux/api/services/AuthService';

const EditUserModal = ({
  open,
  onOk,
  confirmLoading,
  onCancel,
  currentUser,
  currentDepartment = [],
  refetch,
}) => {
  const { TextArea } = Input;
  const [departmentList, setDepartments] = useState([]);
  const { data } = useGetDepartmentsQuery();
  const [editUser, { isLoading }] = useEditUserMutation();

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    otherName: Yup.string().optional(), // Optional field
    user_id: Yup.string().required('User ID is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),

    department: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one role is required'),
    role: Yup.array().of(Yup.string()).min(1, 'At least one role is required'),
  });

  const initialValues = {
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    otherName: currentUser?.otherName,
    user_id: currentUser?.user_id,
    email: currentUser?.email,
    isActive: currentUser?.isActive, // Boolean field, set to false initially
    department: currentUser?.department,
    role: currentUser?.role, // Default role as 'user'
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      values.department = myDepartment;
      const result = data.data.filter((item) =>
        myDepartment.includes(item._id)
      );
      const bodyData = {
        ...values,
        departmentsData: result,
      };

      try {
        const edited = await editUser({
          userId: currentUser._id,
          newUser: bodyData,
        });
        if (edited.error) {
          notification.error({ message: edited.error.data.message });
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

    firstName,
    lastName,
    otherName,

    role,
    user_id,
    department,
  } = formik.values;
  const { handleChange, handleSubmit } = formik;
  useEffect(() => {
    if (data) {
      const newData = data.data.map((dp) => ({
        label: dp.name,
        value: dp._id,
      }));

      setDepartments(newData);
    }
  }, [data]);
  useEffect(() => {
    if (currentUser) {
      formik.setValues({ ...currentUser });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentDepartment) {
      setMyDepartment(currentDepartment);
    }
  }, [currentDepartment]);
  const [myDepartment, setMyDepartment] = useState(currentDepartment);
  return (
    <>
      <Modal
        title="Edit User"
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
              onClick={() => handleSubmit()}
              type="primary"
              className="bg-PrimaryColor">
              <CheckCircleOutlined />
              Save
            </Button>
          </>
        )}>
        <Divider style={{ marginTop: '2px', marginBottom: '35px' }} />

        <Form layout="vertical">
          <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
            <Col span={12}>
              <Input
                value={formik.values.user_id}
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
              <Input
                value={lastName}
                onChange={handleChange}
                name="lastName"
                className="h-[38px] w-[100%] mb-3"
                variant="outlined"
                placeholder="Enter Last Name"
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 18 }}>
            <Col span={12}>
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
              {departmentList && myDepartment && (
                <Select
                  onChange={setMyDepartment}
                  value={myDepartment}
                  mode="multiple"
                  options={departmentList}
                  className="min-h-[38px] w-[100%] mb-3"
                />
              )}
            </Col>
            <Col span={12}>
              <Select
                className="h-[38px] w-[100%] mb-3"
                value={formik.values?.role?.[0]}
                onChange={(e) => {
                  formik.setValues({
                    ...formik.values,
                    role: [e],
                  });
                }}
                options={[
                  { value: 'user', label: 'User' },
                  { value: 'admin', label: 'Admin' },
                  // { value: 'super_admin', label: 'Super Administrator' },
                ]}
              />
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
            defaultChecked={formik.values.isActive}
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
export default EditUserModal;
