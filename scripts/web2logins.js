const axios = require('axios');


//receive authorization code from frontend via API, return access token to be used in API call
async function getLinkedInAccessToken(authorizationCode) {
    const requestData = new URLSearchParams({
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: '86fceak5pj0zeh',
        client_secret: '3DscfcB2HUeQRHcZ',
        redirect_uri: 'http://localhost:4000/linkedin/callback',
    });

    const tokenEndpoint = 'https://www.linkedin.com/oauth/v2/accessToken';


    try {
        console.log("\ngetting token.........")
        const response = await axios.post(tokenEndpoint, requestData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = response.data.access_token;
        // console.log("\access token: ", accessToken)

        return accessToken;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        throw error;
    }
}

async function getLiteProfile(accessToken) {

    const url = `https://api.linkedin.com/v2/me`;

    const config = {
        headers: {
            'Host': "api.linkedin.com",
            'Connection': "Keep-Alive",
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const response = await axios.get(url, config);

        return response.data;

    } catch (error) {
        console.error(error);
    }

}

module.exports = { getLinkedInAccessToken, getLiteProfile }