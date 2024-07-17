require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const spreadsheetId = process.env.SPREADSHEET_ID;
const credentialsPath = path.resolve(
  process.cwd(),
  process.env.CREDENTIALS_PATH || ""
);
const tokenPath = path.resolve(process.cwd(), process.env.TOKEN_PATH);

const authenticate = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  console.log("Client ID:", clientId ? clientId : "Not Loaded");
  console.log("CREDENTIALS_PATH:", credentialsPath);

  if (fs.existsSync(tokenPath)) {
    const token = fs.readFileSync(tokenPath, { encoding: "utf-8" });
    oAuth2Client.setCredentials(JSON.parse(token));
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
