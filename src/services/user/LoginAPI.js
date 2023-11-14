import BaseUrl from "../BaseUrl";

export async function postLoginData(endpoint, body, authToken) {
  try {
    console.log("before the submit", body);

    const response = await fetch("http://localhost:8080/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0VmVuZG9yIiwiZXhwIjoxNjk5ODEyMDA2LCJpYXQiOjE2OTk3NzYwMDZ9.NfZqp2f0lTleo7XSiV9cc0ptxnlUJ1lgPYpg1WdopTE`, // authToken
      },
      body: JSON.stringify(body), //json.stringify is a method that converts a JavaScript object or value to a JSON string
    });

    console.log("before json", response);

    // In postLoginData function
    if (response.status !== 200) {
      const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("after the submit and in json form", data);
    return data;
  } catch (error) {
    throw new Error(`Error posting data: ${error}`);
  }
}
