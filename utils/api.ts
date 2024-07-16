export const appendDataToSheet = async (data: any) => {
  try {
    const response = await fetch("/api/append", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      console.log("Data appended successfully!");
    } else {
      console.error("Failed to append data:", response.statusText);
    }
  } catch (error) {
    console.error("Error appending data:", error);
  }
};
