import React, { useState, useEffect } from 'react';
import { getVolunteers } from '../API/users';
import { useAppState } from '../utils/appState';
import { Navigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

export default function Allvolunteers() {
    const { user, setUser } = useAppState();
    const [volunteers, setVolunteers] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const data = await getVolunteers();
                if (data) {
                    setVolunteers(data);
                } else {
                    setError('No data found');
                }
            } catch (error) {
                setError('Failed to fetch volunteers');
            }
        };

        fetchVolunteers();
    }, []);

    if(!user){
        Navigate('/');
    }

    const filteredVolunteers = volunteers.filter(volunteer =>
        volunteer.name?.toLowerCase().includes(search.toLowerCase()) ||
        volunteer.email?.toLowerCase().includes(search.toLowerCase()) ||
        volunteer.phone?.toLowerCase().includes(search.toLowerCase()) ||
        volunteer.city?.toLowerCase().includes(search.toLowerCase()) ||
        volunteer.state?.toLowerCase().includes(search.toLowerCase()) ||
        volunteer.pincode?.toLowerCase().includes(search.toLowerCase()) 
    );

    const columns = [
        { field: 'srNo', headerName: 'Sr. No.', width: 90 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'address', headerName: 'Address', width: 200 },
        { field: 'city', headerName: 'City', width: 130 },
        { field: 'state', headerName: 'State', width: 130 },
        { field: 'pincode', headerName: 'Pincode', width: 100 },
        { field: 'status', headerName: 'Status', width: 100 },
    ];

    const rows = filteredVolunteers.map((volunteer, index) => ({
        id: index + 1,
        srNo: index + 1,
        ...volunteer,
    }));

    return (
        <div className="p-8">
            <h1 className='font-bold font-monserrat text-2xl md:text-4xl'>All <span className='text-[#E91E63]'>Volunteer's</span></h1>
            <input
                type="text"
                placeholder="Search Volunteers....."
                className="my-4 p-2 border rounded w-[200px] md:w-[320px] hover:border-[#128AED] shadow-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ height: 400, width: '100%' }}>
                {error ? (
                    <div className="text-center py-4">
                        <h2 className="text-xl font-semibold">{error}</h2>
                    </div>
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                )}
            </div>
            <button><Link to="/">Home</Link></button>
        </div>
    );
}
