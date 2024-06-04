import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';

const CleaningEstimateForm = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    address: '',
    phone: '',
    email: '',
    services: [{ description: '', cost: '' }],
    estimate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const newServices = formData.services.map((service, i) => {
      if (i === index) {
        return { ...service, [name]: value };
      }
      return service;
    });
    setFormData({ ...formData, services: newServices });
  };

  const handleAddService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { description: '', cost: '' }]
    });
  };

  const handleRemoveService = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/estimates', formData)
      .then(response => {
        console.log('Form submitted:', response.data);
      })
      .catch(error => {
        console.error('There was an error submitting the form:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cleaning Estimate Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="clientName"
            label="Client Name"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formData.services.map((service, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Description"
                name="description"
                value={service.description}
                onChange={(e) => handleServiceChange(index, e)}
                sx={{ mr: 2 }}
              />
              <TextField
                margin="normal"
                required
                label="Cost"
                name="cost"
                type="number"
                value={service.cost}
                onChange={(e) => handleServiceChange(index, e)}
                sx={{ width: 100, mr: 2 }}
              />
              <Button variant="contained" color="secondary" onClick={() => handleRemoveService(index)}>
                Remove
              </Button>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddService} sx={{ mt: 2, mb: 2 }}>
            Add Service
          </Button>
          <TextField
            margin="normal"
            required
            fullWidth
            id="estimate"
            label="Estimate"
            name="estimate"
            type="number"
            value={formData.estimate}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CleaningEstimateForm;