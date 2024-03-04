import BaseUrl from "../BaseUrl";

export async function getUserBooking(status){
    const userToken = localStorage.getItem("token");
    const removeQuotesUserToken = userToken.replace(/['"]+/g, '');

    if(status === undefined){
        status = "";
    }

    try {
        const response = await fetch(`${BaseUrl}/v1/vendor/bookings?status=${status}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${removeQuotesUserToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.statusCode === 200) {
            return data.body;
        } else {
            throw new Error(`Error hotel data: ${data.message}`);
        }
    } catch (error) {
        throw new Error(`Error hotel data: ${error.message}`);
    }
}