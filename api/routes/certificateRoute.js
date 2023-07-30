// routes/certificateRoutes.js
const express = require('express');
const router = express.Router();
const certificateController = require('../controller/certificateController');

// Generate a certificate and return it as a PDF
router.post('/certificates', certificateController.generateCertificate);

// Get all certificates
router.get('/certificates', certificateController.getAllCertificates);

module.exports = router;
