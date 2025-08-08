const express = require('express');
const { evaluateSegment } = require('../controllers/segmentController');

const router = express.Router();

router.post('/evaluate', evaluateSegment);

module.exports = router;
