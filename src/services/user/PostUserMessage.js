import BaseUrl from "../BaseUrl";

export default async function PostUserMessage(
  firstName,
  lastName,
  email,
  message
) {
  try {
    const response = await fetch(`${BaseUrl}/v1/user/getInTouch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
