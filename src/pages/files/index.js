import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Flex,
  Dropdown,
  Space,
  Table,
  Tabs,
  theme,
  Skeleton,
  Row,
  Tag,
  Select,
} from "antd";
import {
  MoreOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  SwapOutlined,
  HourglassOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import TileCard from "../../components/Cards/TileCard";
import TransferModal from "./modals/transferModal";
import Icon1 from "../../assets/foldericon.svg";
import Icon2 from "../../assets/transfericon.svg";
import Icon3 from "../../assets/awaitingicon.svg";

import { useNavigate } from "react-router-dom";
import {
  useGetFileByDepartmentsMutation,
  useGetPendingFilesMutation,
  useGetTransferedFilesMutation,
} from "../../redux/api/services/FileService";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFile } from "../../redux/slices/currentFileSlice";
import DeleteFileModal from "./modals/deleteFile";
import debounce from "lodash.debounce";
import { setLastFile } from "../../redux/slices/userSlice";
import { useGetDepartmentsQuery } from "../../redux/api/services/DepartmentService";

export default function Files() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const department = useSelector((data) => data.user.department);
  const [totalPages, setTotalPages] = useState(0);
  const [allTotal, setAllTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearcherValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [fileId, setFileId] = useState("");
  const [fileName, setFileName] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [pendingFiles, setAllPendingFiles] = useState([]);
  const [transferedFiles, setAllTransferedFiles] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const email = useSelector((data) => data.user.email);
  const handleSearch = debounce((value) => {
    setDebouncedSearchValue(value);
  }, 3000);
  const [getFiles, { isLoading }] = useGetFileByDepartmentsMutation();
  const [getTransferedFiles, { isLoading: getting }] =
    useGetTransferedFilesMutation();
  const dispatch = useDispatch();
  const [getPendingFiles, { isLoading: isGetting }] =
    useGetPendingFilesMutation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Search } = Input;

  const [open, setOpen] = useState(false);
  const [mapPrivilege, setMapPrivilege] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const role = useSelector((data) => data.user.role);
  const lastFile = useSelector((data) => data.user.lastFile);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setOpenDelete(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setOpenDelete(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "View",
      onClick: () =>
        navigate("/view-file", {
          state: {
            isEdit: false,
          },
        }),
    },
    {
      key: "2",
      label: "Edit",
      onClick: () =>
        navigate("/view-file", {
          state: {
            isEdit: true,
          },
        }),
    },
    {
      key: "3",
      label: "Transfer",
      onClick: (e) => {
        setOpen(true);
      },
    },
  ];

  const transferitems = [
    {
      key: "1",
      label: "View",
      onClick: () =>
        navigate("/view-file", {
          state: {
            isEdit: false,
          },
        }),
    },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, record, i) => {
        const currentNewfiles = allTotal + transferedFiles.length - lastFile;
        return (
          <Row onClick={() => console.log(lastFile)} size="middle">
            <p className="mr-[3px]">{record.title}</p>
            {i + 1 <= currentNewfiles && <Tag color="red">New</Tag>}
          </Row>
        );
      },
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
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Space
          onClick={() => {
            setFileId(record._id);
            setFileName(record.title);
            dispatch(setCurrentFile(record));
          }}
          size="middle"
        >
          <Dropdown
            menu={{
              items: [
                ...items,
                (role == "admin" || email == record?.createdBy) && {
                  key: "4",
                  label: "Delete",
                  danger: true,
                  icon: <DeleteOutlined />,
                  onClick: () => {
                    setOpenDelete(true);
                  },
                },
              ],
            }}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const transfercolumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
      dataIndex: "origin",
      key: "origin",
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
      render: (_, record) => (
        <Space
          onClick={() => {
            setFileId(record._id);
            setFileName(record.title);
            dispatch(setCurrentFile(record));
          }}
          size="middle"
        >
          <Dropdown
            menu={{
              items: transferitems,
            }}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  const [departmentValue, setDepartmentValue] = useState("");
  const gtMyFiles = async () => {
    const allFiles = await getFiles({
      departments: department,
      page: currentPage,
      search: debouncedSearchValue ? debouncedSearchValue : departmentValue,
    });

    if (allFiles.data) {
      setTotalPages(allFiles.data.pagination.totalPages);
      setAllTotal(allFiles.data.pagination.total);
      setTimeout(() => {
        dispatch(
          setLastFile(allFiles.data.pagination.total + transferedFiles.length)
        );
      }, 30000);
      const editedData = [];

      allFiles.data.data.map((item) => {
        editedData.push({
          ...item,
          items: item.uploads.length,
          origin: item.originalDepartment.name,
          date: moment(item.creation_date).format("YYYY-MM-DD"),
        });
      });

      setAllFiles(editedData);
    }
  };
  const getAllPendingFiles = async () => {
    const allpendingFiles = await getPendingFiles({ ids: department });
    if (allpendingFiles.data) {
      const pendingFiles = [];
      allpendingFiles.data.data.map((item) => {
        pendingFiles.push({
          ...item,
          items: item.uploads.length,
          origin: item.originalDepartment.name,
          date: moment(item.creation_date).format("YYYY-MM-DD"),
        });
      });
      setAllPendingFiles(pendingFiles);
    }
  };
  const handlegetTransferedFiles = async () => {
    const allFiles = await getTransferedFiles({ departments: department });

    if (allFiles.data) {
      const transferedFiles = [];
      allFiles.data.data.map((item) => {
        transferedFiles.push({
          ...item,
          items: item.uploads.length,
          origin: item.originalDepartment.name,
          transferdept: item.transferedTo.name,
          date: moment(item.creation_date).format("YYYY-MM-DD"),
        });
      });

      setAllTransferedFiles(transferedFiles);
    }
  };

  const reload = () => {
    setRefresh((prev) => prev + 1);
  };
  useEffect(() => {
    if (department) {
      handlegetTransferedFiles();
      getAllPendingFiles();
    }
  }, [refresh]);

  useEffect(() => {
    if (department) {
      gtMyFiles();
    }
  }, [refresh, currentPage, debouncedSearchValue, departmentValue]);
  const { data } = useGetDepartmentsQuery();
  const [departmentList, setDepartments] = useState([]);

  useEffect(() => {
    if (data) {
      const newData = data.data.map((dp) => ({
        label: dp.name,
        value: dp._id,
      }));
      const result = newData.filter((item) => department.includes(item.value));
      setDepartments(result);
    }
  }, [data]);

  const files = (
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
            <Space size="middle">
              <Search
                autoFocus={searchValue ? true : false}
                value={searchValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearcherValue(value);
                  handleSearch(value);
                }}
                placeholder="Search"
                style={{ width: 331 }}
              />
              <Space>
                <span>Department:</span>
                <Select
                  value={departmentValue}
                  onChange={(e) => {
                    setSearcherValue("");
                    setDebouncedSearchValue("");
                    setDepartmentValue(e);
                  }}
                  options={[{ label: "All", value: "" }, ...departmentList]}
                  className="w-[250px]"
                />
              </Space>
            </Space>
          </div>
          <div>
            <Button
              type="primary"
              className="text-[12px]"
              onClick={() => navigate("/new-file")}
            >
              <Space>Create File</Space>
            </Button>
          </div>
        </Flex>

        <div>
          <Table
            pagination={{
              pageSize: 10,

              total: allTotal,
              current: currentPage,
            }}
            columns={columns}
            dataSource={allFiles}
            bordered={true}
            onChange={(pagination) => {
              setCurrentPage(pagination.current);
            }}
          />
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
            {/* <Search placeholder="Search" style={{ width: 331 }} /> */}
          </div>
        </Flex>

        <div>
          <Table
            columns={transfercolumns}
            pagination={false}
            dataSource={transferedFiles}
            bordered={true}
          />
        </div>
      </Flex>
    </div>
  );

  const pendingfilesView = (
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
            {/* <Search placeholder="Search" style={{ width: 331 }} /> */}
          </div>
          <div>
            <Button
              type="primary"
              className="text-[12px]"
              onClick={() => navigate("/new-file")}
            >
              <Space>Create File</Space>
            </Button>
          </div>
        </Flex>

        <div>
          <Table
            pagination={false}
            columns={columns}
            dataSource={pendingFiles}
            bordered={true}
          />
        </div>
      </Flex>
    </div>
  );
  const tabItems = [
    {
      key: "1",
      label: "Files",
      icon: <FolderOpenOutlined />,
      children: files,
    },
    {
      key: "2",
      label: "Transferred",
      icon: <SwapOutlined />,
      children: transferred,
    },
    {
      key: "3",
      label: "Pending Review",
      icon: <HourglassOutlined />,
      children: pendingfilesView,
    },
  ];

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-0"
        style={{ width: "70%" }}
      >
        {!isLoading && (
          <>
            <TileCard
              title="Total Files"
              icon={Icon1}
              iconBG="[#55A51C]"
              number={allTotal + transferedFiles.length}
            />
            <TileCard
              title="Transferred"
              icon={Icon2}
              iconBG="[#70A1E5]"
              number={transferedFiles.length}
            />
            <TileCard
              title="Pending Review"
              icon={Icon3}
              iconBG="[#F0C274]"
              number={pendingFiles.length}
            />
          </>
        )}
      </ul>
      <div className="mt-5">
        {isLoading && <Skeleton className="w-full" loading active />}
        {!isLoading && (
          <>
            <Tabs onChange={onChange} type="card" items={tabItems} />
            <TransferModal
              reload={reload}
              fileId={fileId}
              fileName={fileName}
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            />
          </>
        )}
      </div>
      <DeleteFileModal
        fileId={fileId}
        fileName={fileName}
        refresh={() => setRefresh((prev) => prev + 1)}
        open={openDelete}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </>
  );
}
