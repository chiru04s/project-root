const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  barcode: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Scan", scanSchema);
