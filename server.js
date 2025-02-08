const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/save', (req, res) => {
    const { id, name, salary } = req.body;
    const csvRow = `${id},${name},${salary}\n`;

    // Append to CSV file
    fs.appendFile(path.join(__dirname, 'data.csv'), csvRow, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error saving data');
        } else {
            res.send('Data saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
