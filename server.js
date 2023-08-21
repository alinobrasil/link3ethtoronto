const express = require('express');
const app = express();
const port = 3000; // You can change this to your desired port

const { setFacebook, setLinkedin } = require("./smartcontractcalls/smartContractCalls.js")

// Middleware to parse JSON bodies
app.use(express.json());

// Custom logic function
function processCustomLogic(inputString) {
    // Implement your custom logic here
    // For example, let's reverse the input string
    return inputString.split('').reverse().join('');
}

// API endpoint to handle user input
app.post('/process', (req, res) => {
    try {
        const inputString = req.body.inputString;

        if (!inputString) {
            return res.status(400).json({ error: 'Input string is required' });
        }

        const result = processCustomLogic(inputString);
        res.json({ result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/setSocial', async (req, res) => {
    try {
        const platform = req.body.platform;
        const address = req.body.address;
        const data = req.body.data;

        if (platform === "facebook") {
            await setFacebook(address, data)
            res.status(200).json({ message: "success" })
        } else if (platform === "linkedin") {
            await setLinkedin(address, data)
            res.status(200).json({ message: "success" })
        } else {
            res.json({ message: "Platform not supported" });
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
