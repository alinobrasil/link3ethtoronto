const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// const axios = require('axios');
var path = require('path');



const { setLinkedin } = require("./scripts/smartContractCalls.js")
const { getLinkedInAccessToken, getLiteProfile } = require("./scripts/web2logins.js")

// Middleware to parse JSON bodies
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route to handle LinkedIn callback and redirect to frontend
app.get('/linkedin/callback', async (req, res) => {
    try {

        console.log("\n\n\n\n-----------------------------------------------------")
        const code = req.query.code;
        console.log("\n\n-----------------code: ", code)

        const access_token = await getLinkedInAccessToken(code);
        console.log("got the access token: ", access_token)

        const liteProfile = await getLiteProfile(access_token);
        console.log(liteProfile)

        res.status(200).json({ status: "success", data: liteProfile })

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.post('/setLinkedin', async (req, res) => {
    try {
        //requires 2 parameters in request body: address and data
        const code = req.body.code;
        const address = req.body.address;

        const accessToken = await getLinkedInAccessToken(code);
        const liteProfile = await getLiteProfile(accessToken);

        await setLinkedin(liteProfile, address)
        res.status(200).json({ status: "success", data: liteProfile })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/setGithub', async (req, res) => {
    try {
        const address = req.body.address;
        const github = req.body.github;

        // Call the setGithub function with the provided parameters
        // await setGithub(address, github);

        res.status(200).json({ message: "success", received: `${github}   |   ${address}` })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
