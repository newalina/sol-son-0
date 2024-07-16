require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const appendToSheet = require("./googleSheets");

const app = express();
app.use(bodyParser.json());

app.post("/api/append", async (req, res) => {
  try {
    const data = req.body.data;
    await appendToSheet(data);
    res.status(200).send("Data appended successfully!");
  } catch (error) {
    console.error("Error appending to sheet:", error);
    res.status(500).send("Failed to append data to Google Sheets");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
