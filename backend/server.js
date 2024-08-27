const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const libxml = require('node-libxml');

const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to parse XML body as text
app.use(bodyParser.text({ type: 'application/xml' }));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Handle POST requests to /parse
app.post('/parse', (req, res) => {
    const xml = req.body;

    try {
        // Parse XML with node-libxml
        const xmlDoc = new libxml.XMLDoc(xml);

        // Convert parsed XML to JSON if needed
        const jsonResult = xmlDoc.toString();

        res.send('XML parsed successfully: ' + jsonResult);
    } catch (err) {
        console.error('Error parsing XML:', err);
        res.status(400).send('Invalid XML');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});