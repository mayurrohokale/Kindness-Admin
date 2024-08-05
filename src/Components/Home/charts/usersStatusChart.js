import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { getUsersCount, disableUsersCount, activeUserscount } from '../../API/users';

export default function UsersStatus() {
    const [activeUsers, setActiveUsers] = useState(0);
    const [usersCount, setTotalUsers] = useState(0);
    const [disableUsers, setDisableUsers] = useState(0);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar',
        },
        xaxis: {
            categories: [],
        },
        colors: ['#F70059', '#128AED', '#D2042D'],
        plotOptions: {
            bar: {
                horizontal: false,
            }
        },
        legend: {
            position: 'bottom'
        }
    });

    const [series, setSeries] = useState([
        {
            name: 'Total Users',
            data: [],
        },
        {
            name: 'Active Users',
            data: [],
        },
        {
            name: 'Disabled Users',
            data: [],
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const users = await getUsersCount();
            const active = await activeUserscount();
            const disable = await disableUsersCount();

            if (users !== null) {
                setTotalUsers(users);
                setChartOptions(prevOptions => ({
                    ...prevOptions,
                    xaxis: {
                        ...prevOptions.xaxis,
                        categories: [...prevOptions.xaxis.categories, new Date().toLocaleTimeString()],
                    }
                }));
                setSeries(prevSeries => prevSeries.map(seriesItem => 
                    seriesItem.name === 'Total Users' ? 
                    { ...seriesItem, data: [...seriesItem.data, users] } : 
                    seriesItem
                ));
            }
            if (active !== null) {
                setActiveUsers(active?.activeUsers);
                setSeries(prevSeries => prevSeries.map(seriesItem => 
                    seriesItem.name === 'Active Users' ? 
                    { ...seriesItem, data: [...seriesItem.data, active?.activeUsers] } : 
                    seriesItem
                ));
            }
            if (disable !== null) {
                setDisableUsers(disable?.disableUsers);
                setSeries(prevSeries => prevSeries.map(seriesItem => 
                    seriesItem.name === 'Disabled Users' ? 
                    { ...seriesItem, data: [...seriesItem.data, disable?.disableUsers] } : 
                    seriesItem
                ));
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* <h1>Disabled Users Count: {disableUsers}</h1>
            <h1>Active Users Count: {activeUsers}</h1>
            <h1>Total Users Count: {usersCount}</h1> */}
            <ApexCharts options={chartOptions} series={series} type="bar" height={350} />
        </div>
    );
}
