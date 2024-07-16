require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const spreadsheet_id = process.env.SPREADSHEET_ID;
const credentials_path = path.resolve(
  process.cwd(),
  process.env.CREDENTIALS_PATH
);
const TOKEN_PATH = path.resolve(process.cwd(), process.env.TOKEN_PATH);

const authenticate = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );

  console.log("Client ID:", process.env.client_id ? "Loaded" : "Not Loaded");
  console.log("CREDENTIALS_PATH:", credentials_path);

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
    spreadsheetId: spreadsheet_id,
    range: "Sheet1!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [data],
    },
  });
};

module.exports = appendToSheet;
