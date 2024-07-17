console.log("API route loaded");

import { NextResponse } from "next/server";
import appendToSheet from "../googleSheets";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Received data:", data);

    const { id, name, email, size, notes } = data;
    console.log("Parsed data:", { id, size, name, email, notes });

    await appendToSheet([id, size, name, email, notes]);
    console.log("Appending data:", data);

    console.log("Client ID:", process.env.CLIENT_ID);
    console.log("Credentials Path:", process.env.CREDENTIALS_PATH);

    return NextResponse.json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting form:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Error submitting form", error: errorMessage },
      { status: 500 }
    );
  }
}
