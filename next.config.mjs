/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    CREDENTIALS_PATH: process.env.CREDENTIALS_PATH,
    TOKEN_PATH: process.env.TOKEN_PATH,
  },
};

export default nextConfig;
