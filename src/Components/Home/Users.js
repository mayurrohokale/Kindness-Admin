import { getUsers, deleteUser, updateUserStatus } from "../API/users";
import { useState, useEffect } from "react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { green, red } from '@mui/material/colors';

const columns = (handleDelete, handleToggleUserStatus) => [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "is_volunteer", headerName: "Volunteer", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        color: params.value === 'true' ? green[500] : red[500],
      }}>
        <div style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: params.value === 'true' ? green[500] : red[500],
          marginRight: 8,
        }} />
        {params.value === 'true' ? 'Active' : 'Deactivated'}
      </div>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <>
        <IconButton
          color="error"
          onClick={() => handleDelete(params.row._id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          color={params.row.status === 'true' ? "primary" : "default"}
          onClick={() => handleToggleUserStatus(params.row._id, params.row.status)}
        >
          {params.row.status === 'true' ? <ToggleOffIcon /> : <ToggleOnIcon />}
        </IconButton>
      </>
    ),
  },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const usersData = await getUsers();
        if (usersData) {
          setUsers(usersData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    
    if (confirmDelete) {
      try {
        await deleteUser(userId);
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
      } catch (error) {
        alert("Failed to delete user: " + error.message);
      }
    }
  };
  

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'true' ? 'false' : 'true';
      const result = await updateUserStatus(userId, newStatus);
      if (result) {
        alert(`User ${newStatus === 'true' ? 'enabled' : 'disabled'} successfully`);
        const updatedUsers = users.map(user => 
          user._id === userId ? { ...user, status: newStatus } : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      alert(`Failed to ${currentStatus === 'true' ? 'disable' : 'enable'} user: ` + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h2>Users List</h2>
      <DataGrid
        rows={users}
        columns={columns(handleDelete, handleToggleUserStatus)}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <Button variant="contained"><Link to="/">Home</Link></Button>
    </div>
  );
}
