const router = require('express').Router();
const { saveScan, getScans } = require('../controllers/scanController');
const verifyToken = require('../utils/verifyToken');

router.post('/', verifyToken, saveScan);
router.get('/', verifyToken, getScans);

module.exports = router;
