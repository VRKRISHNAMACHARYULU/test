const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const ExcelJS = require('exceljs');
const path = require('path');
const { exec } = require('child_process');  // Import child_process

const app = express();
const PORT = process.env.PORT || 3000;

// Load Excel portfolio file and convert to JSON using exceljs
const workbook = new ExcelJS.Workbook();
const portfolioData = [];

workbook.xlsx.readFile(path.join(__dirname, 'portfolio.xlsx'))
  .then(() => {
    const worksheet = workbook.worksheets[0];
    worksheet.eachRow((row, rowNumber) => {
      const rowValues = row.values;
      portfolioData.push(rowValues);
    });
  })
  .catch(err => console.error('Error reading Excel file:', err));

// Middleware
app.use(express.json());

// Updated CORS configuration to allow multiple origins
app.use(cors({
  origin: function(origin, callback) {
    // Allow these origins
    const allowedOrigins = [
      'http://localhost:8080',
      'http://192.168.153.1:4173',
      'http://localhost:4173'
    ];
    
    // In production, use your production domain
    if (process.env.NODE_ENV === 'production') {
      allowedOrigins.push('https://your-production-domain.com');
    }
    
    // Check if origin is allowed or if it's null (like a Postman request)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

// Contact endpoint - ensure both /contact and /api/contact work
app.post(['/contact', '/api/contact'], async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    // Using Brevo (formerly Sendinblue) SMTP for sending emails
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_FROM || 'noreply@example.com'}>`,
      to: process.env.EMAIL_TO || 'raghunandanperiyala@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      html: `
        <div>
          <h3>New message from your portfolio website</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });
    
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Portfolio data endpoint
app.get('/api/data/portfolio-data', (req, res) => {
  res.json(portfolioData);
});

// Query endpoint for the ML model (new endpoint for semantic search)
// Updated code for the /api/query endpoint in contact.js

// Query endpoint for the ML model (updated with proper path to Python script)
app.post('/api/query', (req, res) => {
  const { query } = req.body;  // Get the query from the request body

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  // Use absolute path to the Python script
  const scriptPath = path.join(__dirname, 'scripts', 'predict.py');
  
  // Call the Python script with the query as a command-line argument
  // Make sure to escape the query string properly to avoid command injection
  const sanitizedQuery = query.replace(/"/g, '\\"');
  
  // Specify full path to python interpreter if needed
  const pythonCommand = process.env.PYTHON_PATH || 'python';
  
  console.log(`Executing: ${pythonCommand} ${scriptPath} "${sanitizedQuery}"`);
  
  exec(`${pythonCommand} "${scriptPath}" "${sanitizedQuery}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ message: 'Error in prediction', error: error.message });
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      // Don't return error if stderr has content - many Python scripts output to stderr
      // but still function correctly
    }

    try {
      // Parse the JSON response from the Python script
      const result = JSON.parse(stdout);
      res.json({
        answer: result.answer,
        score: result.score
      });
    } catch (parseError) {
      console.error('Error parsing Python script output:', parseError);
      console.error('Raw output:', stdout);
      return res.status(500).json({ 
        message: 'Error parsing prediction result',
        rawOutput: stdout
      });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
