const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
const path = require('path');
const xml2js = require('xml2js'); // XML to JSON conversion
const parser = new xml2js.Parser();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to parse XML body as text
app.use(bodyParser.text({ type: 'application/xml' }));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post('/parse', async (req, res) => {
    let xml = req.body;
    xml = xml?.replace(/<!DOCTYPE[^\[]*\[/g, ''); // Remove DOCTYPE declaration
    xml = xml?.replace(/]>/g, '');
    let spamArr = xml?.match(/"([^"]*)" /g, '');
    if (!xml) res.send('');
    spam = spamArr[0]?.replace(/"/g, '');
    let amount = xml?.match(/(\d+)(?!.*\d)/gs);
    let fullStr = '';
    for (let i = 0; i <= (10 ** amount[0]); i++) {
        fullStr += spam;
    }
    console.log(fullStr);
    res.json(fullStr);
});

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});