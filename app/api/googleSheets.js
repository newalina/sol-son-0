require("dotenv").config();
const { google } = require("googleapis");

const keys = JSON.parse(process.env.GOOGLE_OAUTH2_KEYS);
const token = JSON.parse(process.env.GOOGLE_TOKEN);

const clientId = keys.web.client_id;
const clientSecret = keys.web.client_secret;
const redirectUri = keys.web.redirect_uris[0];
const spreadsheetId = process.env.SPREADSHEET_ID;

const authenticate = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  oAuth2Client.setCredentials(token);

  const currentTime = Date.now();
  if (token.expiry_date < currentTime) {
    const { credentials } = await oAuth2Client.refreshAccessToken();
    oAuth2Client.setCredentials(credentials);
  }

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
