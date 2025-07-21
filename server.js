const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.BACKEND_PORT || 3000;

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const protocolDir = process.env.DEVELOPMENT_PROTOCOL || 'demo-protocol';

// Serve protocol files
app.use('/', express.static(path.join(__dirname, protocolDir)));

// Serve reproschema context
app.use('/contexts', express.static(path.join(__dirname, 'reproschema/contexts')));

// Serve all activities
app.use('/activities', express.static(path.join(__dirname, protocolDir, 'activities')));

// Handle PatientInfo activity (renamed from Activity1)
app.use('/activities/PatientInfo', express.static(path.join(__dirname, protocolDir, 'activities/Activity1')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
