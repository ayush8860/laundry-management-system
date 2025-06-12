// src/pages/user/UserDashboard.jsx
import { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import API from '../../utils/api';

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await API.get('/laundry/user');
    setRequests(res.data);
  };

  const requestLaundry = async () => {
    await API.post('/laundry');
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Welcome, Student</Typography>
        <Button variant="contained" color="primary" onClick={requestLaundry} sx={{ mb: 2 }}>
          Request Laundry
        </Button>
        <List>
          {requests.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={`Requested on: ${new Date(item.createdAt).toLocaleDateString()}`} secondary={`Status: ${item.status}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default UserDashboard;
