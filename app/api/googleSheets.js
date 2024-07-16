require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const REDIRECT_URI = process.env.REDIRECT_URI;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const CREDENTIALS_PATH = process.env.CREDENTIALS_PATH;
const TOKEN_PATH = process.env.TOKEN_PATH;

const authenticate = async () => {
  const credentials = JSON.parse(
    fs.readFileSync(CREDENTIALS_PATH, { encoding: "utf-8" })
  );

  const oAuth2Client = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    REDIRECT_URI
  );

  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH, { encoding: "utf-8" });
    oAuth2Client.setCredentials(JSON.parse(token));
  }

  return oAuth2Client;
};

const appendToSheet = async (data) => {
  const auth = await authenticate();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [data],
    },
  });
};

module.exports = appendToSheet;
