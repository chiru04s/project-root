const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: String,
  result: String,
  status: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', ScanSchema);
