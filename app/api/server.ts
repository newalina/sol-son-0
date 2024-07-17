import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import appendToSheet from "./googleSheets";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post("/api/append", async (req: Request, res: Response) => {
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
