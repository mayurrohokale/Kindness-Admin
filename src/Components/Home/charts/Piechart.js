import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { getUsersCount, getVolunteersCount } from '../../API/users';

const PieChart = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [volunteersCount, setVolunteersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsersCount();
      const volunteers = await getVolunteersCount();

      if (users !== null) {
        setUsersCount(users);
      }
      if (volunteers !== null) {
        setVolunteersCount(volunteers);
      }
    };

    fetchData();
  }, []);

  const options = {
    labels: ['Users', 'Volunteers'],
    colors: ['#128AED', '#F70059'],
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%'
        }
      }
    }
  };

  const series = [usersCount, volunteersCount];

  return (
    <div>
      <div style={{ width: '300px', height: '300px', justifyContent: 'center' }}>
        <h2 className="font-bold text-xl">Users and Volunteers Count</h2>
        <ApexCharts options={options} series={series} type="pie" width="300" height="300" />
      </div>
    </div>
  );
};

export default PieChart;
