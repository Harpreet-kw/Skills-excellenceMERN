// controllers/certificateController.js
const { PDFDocument, rgb } = require('pdf-lib');
const Certificate = require('../models/Certificate');
const axios = require('axios');
// const filePath = require("../Helvetica-Bold-Font/Helvetica-Bold-Font.ttf")


console.log("__dirname *************", __dirname)

// URL of the CSS file
const cssUrl = 'https://fonts.cdnfonts.com/css/helvetica-neue-55';
const fontPath = '../Helvetica-Bold-Font/Helvetica-Bold-Font.ttf';

// Function to read the CSS content from the URL
const readCssFromUrl = async () => {
  try {
    const response = await axios.get(cssUrl);
    const cssContent = response.data;

    console.log("cssContent *************", cssContent)

    // Save the CSS content to a file
    fs.readFile('helvetica-neue-55.css', cssContent, (err) => {
      if (err) {
        console.error('Error saving CSS content:', err);
      } else {
        console.log('CSS content saved successfully.');
        return cssContent;
      }
    });
  } catch (error) {
    console.error('Error reading CSS content:', error);
  }
};

// Load the Helvetica-Bold font
const loadFont = async () => {
    const fontPath = `https://fonts.cdnfonts.com/css/helvetica-neue-55`;
    // const fontBytes = await fs.readFile(fontPath);
    console.log("fontBytes ************", readCssFromUrl())
    // return await PDFDocument.embedFont(fontBytes);
  };

// Generate a certificate and return it as a PDF
exports.generateCertificate = async (req, res) => {
  try {
    const { name, course, completionDate } = req.body;

    console.log("************** body ***************", req.body)
    // Logic to generate the certificate
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();
    const font = `'Helvetica Neue', sans-serif` //await pdfDoc.embedFont(PDFDocument?.Font?.HelveticaBold);
    // const font = await loadFont();

    page.drawText('Certificate of Completion', {
      x: 50,
      y: height - 100,
      size: 30,
      color: rgb(0, 0, 0),
      font,
    });

    page.drawText(`This certificate is awarded to ${name}`, {
      x: 50,
      y: height - 180,
      size: 20,
      color: rgb(0, 0, 0),
      font,
    });

    page.drawText(`for completing the course: ${course}`, {
      x: 50,
      y: height - 220,
      size: 20,
      color: rgb(0, 0, 0),
      font,
    });

    page.drawText(`Completion Date: ${completionDate}`, {
      x: 50,
      y: height - 260,
      size: 20,
      color: rgb(0, 0, 0),
      font,
    });

    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
  } catch (err) {
    console.log("Error *************", err)
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get all certificates
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
