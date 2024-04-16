import BaseUrl from "../BaseUrl";

export async function postUserOTPData(otp) {
  try {
    const response = await fetch(`${BaseUrl}/v1/user/verifyOtp?OTP=${otp}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error posting user OTP data: ${error}`);
  }
}
