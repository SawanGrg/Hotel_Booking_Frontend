import BaseUrl from "../BaseUrl";

export default async function postRoomKhalti(roomId, checkInDate, checkOutDate, numberOfGuest, paymentMethod) {
    const userToken = localStorage.getItem("token").replace(/['"]+/g, '');

    const extractedCheckInDate = checkInDate.toISOString().split('T')[0];
    const extractedCheckOutDate = checkOutDate.toISOString().split('T')[0];

    try {
        const response = await fetch(`${BaseUrl}/v1/user/khalti/payment/${roomId}?checkInDate=${extractedCheckInDate}&checkOutDate=${extractedCheckOutDate}&numberOfGuest=${numberOfGuest}&paymentMethod=${paymentMethod}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            // Handle successful response
            console.log("Success booking room:", responseData);
            return responseData;
        } else {
            const errorData = await response.json();
            // Handle error response
            console.error("Error:", errorData);
            throw new Error(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error:", error);
        throw new Error(`Error: ${error.message}`);
    }
}
