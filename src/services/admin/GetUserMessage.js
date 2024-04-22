import BaseUrl from "../BaseUrl";

export default async function GetUserMessage() {
    const tokenFromStorage = localStorage.getItem("token").replace(/['"]+/g, "");


  try {
    const response = await fetch(`${BaseUrl}/v1/admin/viewUserMessage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${tokenFromStorage}`,
      },
    });
    const data = await response.json();
    return data.body;
  } catch (error) {
    console.error("Error getting user message:", error);
  }
}
