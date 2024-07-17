require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// const credentialsPath = path.resolve(process.cwd(), "credentials");

// fs.readdir(credentialsPath, (err, files) => {
//   if (err) {
//     console.error("Error reading credentials directory:", err);
//   } else {
//     console.log("Files in credentials directory:", files);
//   }
// });

// const credentialsPath = path.resolve(
//   process.cwd(),
//   process.env.CREDENTIALS_PATH || "credentials/oauth2.keys.json"
// );

// const keys = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

// let keys;
// try {
//   keys = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
//   console.log("Loaded credentials successfully");
// } catch (error) {
//   console.error("Error reading credentials:", error);
//   throw new Error("Failed to load credentials");
// }

const keys = JSON.parse(process.env.GOOGLE_OAUTH2_KEYS);
const token = JSON.parse(process.env.GOOGLE_TOKEN);

console.log("KEYS: ", keys);
console.log("TOKEN: ", token);

const clientId = keys.web.client_id;
const clientSecret = keys.web.client_secret;
const redirectUri = keys.web.redirect_uris[0];
const spreadsheetId = process.env.SPREADSHEET_ID;

console.log("clientId: ", clientId);
console.log("clientSecret: ", clientSecret);
console.log("redirectUri: ", keys.web.redirect_uris[0]);

// const token = {
//   access_token: process.env.ACCESS_TOKEN,
//   refresh_token: process.env.REFRESH_TOKEN,
//   scope: process.env.SCOPE,
//   token_type: process.env.TOKEN_TYPE,
//   expiry_date: parseInt(process.env.EXPIRY_DATE, 10),
// };

const authenticate = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  oAuth2Client.setCredentials(token);

  const currentTime = Date.now();
  if (token.expiry_date < currentTime) {
    console.log("Token expired, refreshing...");
    const { credentials } = await oAuth2Client.refreshAccessToken();
    oAuth2Client.setCredentials(credentials);

    // Optionally, update your token in the environment or a file
    console.log("New access token:", credentials.access_token);
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
