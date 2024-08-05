import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getUsersCount, getVolunteersCount } from '../../API/users';

ChartJS.register(ArcElement, Tooltip, Legend);
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

  const data = {
    labels: ['Users', 'Volunteers'],
    datasets: [
      {
        label: '# of People',
        data: [usersCount, volunteersCount],
        backgroundColor: ['#128AED', '#F70059'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      
      <div style={{ width: '400px', height: '400px', justifyContent: 'center' }}>
      <h2 className=' font-bold text-xl'>Users and Volunteers Count</h2>
        <Pie data={data}  />
      </div>
    </div>
  );
};

export default PieChart;
