import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Card, CardContent, CircularProgress, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/laundry/my-requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        console.error('❌ Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  return (
    <Box sx={{ padding: 4, minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Laundry Dashboard
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/submit')}
        sx={{ mb: 3 }}
      >
        Submit New Laundry Request
      </Button>

      {loading ? (
        <CircularProgress />
      ) : requests.length === 0 ? (
        <Typography>No laundry requests yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {requests.map((req) => (
            <Grid item xs={12} md={6} lg={4} key={req._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Status: {req.status}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Items: {req.items.join(', ') || 'None'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Notes: {req.notes || 'No notes'}
                  </Typography>
                  <Typography variant="caption" display="block" mt={1}>
                    Submitted at: {new Date(req.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
