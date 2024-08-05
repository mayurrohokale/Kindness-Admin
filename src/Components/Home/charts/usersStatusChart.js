import React, { useEffect, useState } from 'react';
import { getUsersCount, disableUsersCount, activeUserscount } from '../../API/users';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function UsersStatus() {
    const [activeUsers, setActiveUsers] = useState(0);
    const [usersCount, setTotalUsers] = useState(0);
    const [disableUsers, setDisableUsers] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Users',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
            {
                label: 'Active Users',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
            },
            {
                label: 'Disabled Users',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            const users = await getUsersCount();
            const active = await activeUserscount();
            const disable = await disableUsersCount();

            if (users !== null) {
                setTotalUsers(users);
                setChartData(prevData => ({
                    ...prevData,
                    labels: [...prevData.labels, new Date().toLocaleTimeString()],
                    datasets: prevData.datasets.map(dataset => 
                        dataset.label === 'Total Users' ? 
                        { ...dataset, data: [...dataset.data, users] } : 
                        dataset
                    )
                }));
            }
            if (active !== null) {
                setActiveUsers(active?.activeUsers);
                setChartData(prevData => ({
                    ...prevData,
                    datasets: prevData.datasets.map(dataset => 
                        dataset.label === 'Active Users' ? 
                        { ...dataset, data: [...dataset.data, active?.activeUsers] } : 
                        dataset
                    )
                }));
            }
            if (disable !== null) {
                setDisableUsers(disable?.disableUsers);
                setChartData(prevData => ({
                    ...prevData,
                    datasets: prevData.datasets.map(dataset => 
                        dataset.label === 'Disabled Users' ? 
                        { ...dataset, data: [...dataset.data, disable?.disableUsers] } : 
                        dataset
                    )
                }));
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Disabled Users Count: {disableUsers}</h1>
            <h1>Active Users Count: {activeUsers}</h1>
            <h1>Total Users Count: {usersCount}</h1>
            <Line data={chartData} />
        </div>
    );
}
