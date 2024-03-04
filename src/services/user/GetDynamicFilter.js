import BaseUrl from "../BaseUrl";

export async function getHotelDetails(hotelName, hotelLocation) {
    console.log('hotelName from js class:', hotelName);
    console.log('hotelLocation from js class:', hotelLocation);

    try {
        // Convert null values to empty strings
        const name = hotelName === null ? "" : hotelName;
        const location = hotelLocation === null ? "" : hotelLocation;

        // Construct URL with updated parameters
        const url = `${BaseUrl}/v1/user/searchHotel?hotelName=${name}&hotelLocation=${location}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
