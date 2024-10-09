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
} from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import TileCard from "../../components/Cards/TileCard";
import Icon1 from "../../assets/foldericon.svg";
import Icon2 from "../../assets/completeicon.svg";
import Icon3 from "../../assets/awaitingicon.svg";

import { useNavigate } from "react-router-dom";
import { useGetFolderByDepartmentsMutation } from "../../redux/api/services/FolderService";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "../../redux/slices/currentProjectSlice";
import DeleteProjectModal from "./modals/deleteProject";

export default function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getFolder, { isLoading }] = useGetFolderByDepartmentsMutation();
  const [allProject, setAllProject] = useState([]);
  const [allCompletedProject, setAllCompletedProject] = useState([]);
  const department = useSelector((data) => data.user.department);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOk = () => {
    setTimeout(() => {
      setOpenDelete(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");

    setOpenDelete(false);
  };
  const gtMyFiles = async () => {
    const allFiles = await getFolder({ departments: department });

    if (allFiles.data) {
      const editedData = [];
      const pendingFiles = [];
      const completedProjects = [];
      allFiles.data.data.map((item) => {
        const totalPercentage = [...item.milestone].reduce(
          (acc, curr) => acc + curr.percentage,
          0
        );

        // Calculate the percentage in relation to 100%
        const currentPercentage =
          (totalPercentage / item.milestone.length / 100) * 100;

        editedData.push({
          ...item,
          startDate: moment(item.startDate).format("YYYY-MM-DD"),
          endDate: moment(item.endDate).format("YYYY-MM-DD"),
          company: item.company,
          origin: item.originalDepartment.name,
          percentage: `${Math.round(currentPercentage)} %`,
        });

        if (currentPercentage == 100) {
          completedProjects.push({
            ...item,
            startDate: moment(item.startDate).format("YYYY-MM-DD"),
            endDate: moment(item.endDate).format("YYYY-MM-DD"),
            company: item.company,
            origin: item.originalDepartment.name,
          });
        }
      });

      setAllProject(editedData);
      setAllCompletedProject(completedProjects);
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Search } = Input;

  const items = [
    {
      key: "1",
      label: "View",
      onClick: () => {
        navigate("/view-project");
      },
    },
    {
      key: "2",
      label: "Edit",
      onClick: () => navigate("/view-project"),
    },
    {
      key: "3",
      label: "Delete",
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => {
        setOpenDelete(true);
      },
    },
  ];

  const columns = [
    {
      title: "Project Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Department",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Progress",
      dataIndex: "percentage",
      key: "percentage",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Space
          onClick={() => {
            dispatch(setCurrentProject(record));
          }}
          size="middle"
        >
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

  useEffect(() => {
    if (department) {
      gtMyFiles();
    }
  }, []);
  return (
    <>
      {isLoading && <Skeleton className="w-full" loading active />}
      {!isLoading && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-0"
          style={{ width: "70%" }}
        >
          <TileCard
            title="Total Projects"
            icon={Icon1}
            iconBG="[#55A51C]"
            number={allProject.length}
          />
          <TileCard
            title="Completed Projects"
            icon={Icon2}
            iconBG="[#70A1E5]"
            number={allCompletedProject.length}
          />
          <TileCard
            title="Ongoing Projects"
            icon={Icon3}
            iconBG="[#F0C274]"
            number={allProject.length - allCompletedProject.length}
          />
        </ul>
      )}
      <div className="mt-5">
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
                  onClick={() => navigate("/new-project")}
                >
                  <Space>Add Project</Space>
                </Button>
              </div>
            </Flex>

            <div>
              {isLoading && <Skeleton className="w-full" loading active />}
              {!isLoading && (
                <>
                  <Table
                    columns={columns}
                    dataSource={allProject}
                    bordered={true}
                  />
                </>
              )}
            </div>
          </Flex>
        </div>
      </div>
      <DeleteProjectModal
        open={openDelete}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
}
