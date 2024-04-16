import BaseUrl from "../BaseUrl";

export async function getAllHotelData(
    hotelName, 
    hotelLocation
    ) {

    try {
        if (hotelName === null || hotelName == undefined) {
            hotelName = '';
        }
        if (hotelLocation === null || hotelLocation == undefined) {
            hotelLocation = '';
        }
        const response = await fetch(`${BaseUrl}/v1/user/hotel?hotelName=${hotelName}&hotelLocation=${hotelLocation}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${removeQuotesuserToken}`,
            },
        });
        if (response.status !== 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log(" get all hotel details", data);
        return data;
    } catch (error) {
        throw new Error(`Error fetching all in get all hotel api hotel data: ${error}`);
    }
}