const Scan = require('../models/Scan');

const saveScan = async (req, res) => {
  try {
    const { barcode, name } = req.body;
    const userId = req.user.id;

    const newScan = new Scan({ user: userId, barcode, name });
    await newScan.save();

    res.status(201).json({ message: 'Scan saved successfully' });
  } catch (error) {
    console.error("❌ Error saving scan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all scans for the user (no date filter)
const getScans = async (req, res) => {
  try {
    const userId = req.user.id;

    const scans = await Scan.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(scans);
  } catch (error) {
    console.error("❌ Error fetching scans:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveScan, getScans };
