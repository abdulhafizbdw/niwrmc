import React, { useEffect, useState } from 'react';
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
} from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import TileCard from '../../components/Cards/TileCard';
import Icon1 from '../../assets/foldericon.svg';
import Icon2 from '../../assets/completeicon.svg';
import Icon3 from '../../assets/awaitingicon.svg';

import { useNavigate } from 'react-router-dom';
import { useGetFolderByDepartmentsMutation } from '../../redux/api/services/FolderService';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function Projects() {
  const navigate = useNavigate();
  const [getFolder, { isLoading }] = useGetFolderByDepartmentsMutation();
  const [allProject, setAllProject] = useState([]);
  const [allCompletedProject, setAllCompletedProject] = useState([]);
  const department = useSelector((data) => data.user.department);
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
        const currentPercentage = (totalPercentage / 100) * 100;

        editedData.push({
          ...item,
          startDate: moment(item.startDate).format('YYYY-MM-DD'),
          endDate: moment(item.endDate).format('YYYY-MM-DD'),
          company: item.company,
          origin: item.originalDepartment.name,
          percentage: `${currentPercentage} %`,
        });

        if (item.projectDone) {
          completedProjects.push({
            ...item,
            startDate: moment(item.startDate).format('YYYY-MM-DD'),
            endDate: moment(item.endDate).format('YYYY-MM-DD'),
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
      key: '1',
      label: 'View',
      onClick: () => navigate('/view-project'),
    },
    {
      key: '2',
      label: 'Edit',
      onClick: () => navigate('/view-project'),
    },
  ];

  const columns = [
    {
      title: 'Project Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Department',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Progress',
      dataIndex: 'percentage',
      key: 'percentage',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: () => (
        <Space size="middle">
          <Dropdown
            menu={{
              items,
            }}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      title: 'Computer Installation',
      company: 'Prosper Ltd.',
      department: 'Human Resource Dept',
      startdate: '15/09/2024',
      enddate: '30/01/2025',
      progress: '50%',
    },
    {
      key: '2',
      title: 'Computer Installation',
      company: 'Lenovo Plc.',
      department: 'Authorization & Allocation Dept',
      startdate: '17/08/2024',
      enddate: '16/05/2025',
      progress: '34%',
    },
    {
      key: '3',
      title: 'Computer Installation',
      company: 'Maguire Investment',
      department: 'Corporate Support Services Dept',
      startdate: '01/03/2024',
      enddate: '30/11/2024',
      progress: '19%',
    },
    {
      key: '4',
      title: 'Computer Installation',
      company: 'Casablanca Holdings',
      department: 'Catchment Management & Water Utilization Dept',
      startdate: '10/02/2024',
      enddate: '07/10/2024',
      progress: '83%',
    },
    {
      key: '5',
      title: 'Computer Installation',
      company: 'Ali and Sons',
      department: 'Monitoring & Enforcement Dept',
      startdate: '19/07/2023',
      enddate: '21/12/2022',
      progress: '99%',
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
          style={{ width: '70%' }}>
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
          }}>
          <Flex vertical gap="large">
            <Flex
              justify="space-between"
              align="center"
              gap="large"
              className="pb-4">
              <div className="flex items-center">
                <Search placeholder="Search" style={{ width: 331 }} />
              </div>
              <div>
                <Button
                  type="primary"
                  className="text-[12px]"
                  onClick={() => navigate('/new-project')}>
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
    </>
  );
}
