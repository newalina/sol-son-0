require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const keys = require("../../credentials/oauth2.keys.json");

const clientId = keys.web.client_id;
const clientSecret = keys.web.client_secret;
const redirectUri = keys.web.redirect_uris[0];
const spreadsheetId = process.env.SPREADSHEET_ID;

let oAuth2Client;

const authenticate = async () => {
  oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

  // Check for previously stored tokens
  const tokenPath = path.resolve(process.cwd(), process.env.TOKEN_PATH);
  if (fs.existsSync(tokenPath)) {
    const token = fs.readFileSync(tokenPath, "utf-8");
    oAuth2Client.setCredentials(JSON.parse(token));
  } else {
    // If no token exists, initiate the authorization flow
    await getNewToken(oAuth2Client);
  }

  return oAuth2Client;
};

const getNewToken = async (oAuth2Client) => {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/spreadsheets",
    prompt: "consent",
  });

  console.log("Authorize this app by visiting this url:", authorizeUrl);
  // Further steps can be implemented to handle the callback and save tokens
};

const appendToSheet = async (data) => {
  const auth = await authenticate();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [data],
    },
  });
};

module.exports = appendToSheet;
