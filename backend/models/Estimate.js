const mongoose = require('mongoose');

const EstimateSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  services: [{ description: String, cost: Number }],
  estimate: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Estimate', EstimateSchema);