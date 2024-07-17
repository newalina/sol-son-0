require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const credentialsPath = path.resolve(
  process.cwd(),
  process.env.CREDENTIALS_PATH || "../../credentials/oauth2.keys.json"
);
const keys = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

const clientId = keys.web.client_id;
const clientSecret = keys.web.client_secret;
const redirectUri = keys.web.redirect_uris;
const spreadsheetId = process.env.SPREADSHEET_ID;

const token = {
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,
  scope: process.env.SCOPE,
  token_type: process.env.TOKEN_TYPE,
  expiry_date: parseInt(process.env.EXPIRY_DATE, 10),
};

const authenticate = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  oAuth2Client.setCredentials(token);

  console.log("CLIENT_ID:", clientId);
  console.log("CLIENT_SECRET:", clientSecret);
  console.log("REDIRECT_URI:", redirectUri);
  console.log("CREDENTIALS_PATH:", process.env.CREDENTIALS_PATH);
  console.log("ACCESS_TOKEN:", process.env.ACCESS_TOKEN);

  return oAuth2Client;
};

const appendToSheet = async (data) => {
  const auth = await authenticate();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: "Sheet1!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [data],
    },
  });
};

module.exports = appendToSheet;
