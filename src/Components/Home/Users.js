import { getUsers, deleteUser } from "../API/users";
import { useState, useEffect } from "react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

const columns = (handleDelete) => [
  { field: "_id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "is_volunteer", headerName: "Volunteer", width: 250 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <IconButton
        color="error"
        onClick={() => handleDelete(params.row._id)}
      >
        <DeleteIcon />
      </IconButton>
    ),
  },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

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
    try {
      await deleteUser(userId);
      // Refresh the user list after deletion
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      // Clear selection after deletion
      setSelectedRows([]);
    } catch (error) {
      alert("Failed to delete user: " + error.message);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      // Delete selected users
      await Promise.all(selectedRows.map(userId => deleteUser(userId)));
      // Refresh the user list after deletion
      const updatedUsers = users.filter(user => !selectedRows.includes(user._id));
      setUsers(updatedUsers);
      // Clear selection after deletion
      setSelectedRows([]);
    } catch (error) {
      alert("Failed to delete users: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Users List</h2>
      <DataGrid
        rows={users}
        columns={columns(handleDelete)}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
      />
      <Stack direction="row" spacing={2} marginTop={2}>
        <Button
          variant="contained"
          color="error"
          disabled={selectedRows.length === 0}
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
        <Button variant="contained">
          <Link to="/">Home</Link>
        </Button>
      </Stack>
    </div>
  );
}
