import BaseUrl from "../BaseUrl";

export async function PostUpdateBooking({ bookingId, userId, status }) {
    const jwtToken = localStorage.getItem('token').replace(/['"]+/g, '');
  
    const response = await fetch(`${BaseUrl}/v1/vendor/roomStatus/${bookingId}/${userId}?vendorDecision=${status}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      }
    });
  
    if (response.status !== 200) {
      const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
  
    const data = await response.json();
    console.log("after the submit and in json form", data);
    return data.body;
  }
  