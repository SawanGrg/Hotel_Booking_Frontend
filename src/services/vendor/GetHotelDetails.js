import BaseUrl from "../BaseUrl";

export async function getHotelDetails() {
    const vendorToken = localStorage.getItem("token");
    const removeQuotesvendorToken = vendorToken.replace(/['"]+/g, '');

    try {
        const response = await fetch(`${BaseUrl}/v1/vendor/hotelDetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${removeQuotesvendorToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.statusCode === 200) {
            return data.body;
        } else {
            throw new Error(`Error fetching hotel data: ${data.message}`);
        }
    } catch (error) {
        throw new Error(`Error fetching hotel data: ${error.message}`);
    }
}
