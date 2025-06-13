import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubmitRequest = () => {
  const [itemInput, setItemInput] = useState('');
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleAddItem = () => {
    if (itemInput.trim() !== '') {
      setItems([...items, itemInput.trim()]);
      setItemInput('');
    }
  };

  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = async () => {
    if (items.length === 0) return;

    setSubmitting(true);
    try {
      await axios.post(
        '/api/laundry/submit',
        { items, notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Submission error:', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        mx: 'auto',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Submit Laundry Request
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <TextField
          label="Laundry Item"
          variant="outlined"
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
          fullWidth
        />
        <IconButton color="primary" onClick={handleAddItem}>
          <AddCircleIcon />
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
        {items.map((item, index) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => handleDeleteItem(index)}
            color="primary"
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>

      <TextField
        label="Additional Notes"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={submitting || items.length === 0}
        fullWidth
      >
        {submitting ? 'Submitting...' : 'Submit Request'}
      </Button>
    </Box>
  );
};

export default SubmitRequest;
