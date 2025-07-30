const Scan = require('../models/Scan');

exports.saveScan = async (req, res) => {
  try {
    const newScan = new Scan({
      userId: req.user.id,
      type: req.body.type,
      result: req.body.result,
      status: req.body.status
    });
    await newScan.save();
    res.send('Scan saved');
  } catch (err) {
    res.status(500).send('Scan save error');
  }
};

exports.getScans = async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user.id });
    res.json(scans);
  } catch (err) {
    res.status(500).send('Scan fetch error');
  }
};
