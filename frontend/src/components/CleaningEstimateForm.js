import React, { useState } from 'react';

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
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Client Name:</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Services:</label>
        {formData.services.map((service, index) => (
          <div key={index}>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={service.description}
              onChange={(e) => handleServiceChange(index, e)}
              required
            />
            <input
              type="number"
              name="cost"
              placeholder="Cost"
              value={service.cost}
              onChange={(e) => handleServiceChange(index, e)}
              required
            />
            <button type="button" onClick={() => handleRemoveService(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddService}>Add Service</button>
      </div>
      <div>
        <label>Estimate:</label>
        <input
          type="number"
          name="estimate"
          value={formData.estimate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CleaningEstimateForm;