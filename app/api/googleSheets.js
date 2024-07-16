const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const TOKEN_PATH = path.resolve("credentials/token.json");
const CREDENTIALS_PATH = path.resolve("credentials/oauth2.keys.json");

const authenticate = async () => {
  const credentials = JSON.parse(
    fs.readFileSync(CREDENTIALS_PATH, { encoding: "utf-8" })
  );
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
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
