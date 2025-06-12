// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import API from '../../utils/api';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await API.get('/laundry');
    setRequests(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/laundry/${id}`, { status });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Admin Panel</Typography>
        <List>
          {requests.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={`User ID: ${item.userId}`}
                secondary={`Requested: ${new Date(item.createdAt).toLocaleDateString()} | Status: ${item.status}`}
              />
              {item.status !== 'Completed' && (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ ml: 2 }}
                  onClick={() => updateStatus(item._id, 'Completed')}
                >
                  Mark as Done
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
