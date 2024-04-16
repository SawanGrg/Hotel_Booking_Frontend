import BaseUrl from "../BaseUrl";

export default async function getHotelRoomBookingStatus(hotelId) {
    try {
        const response = await fetch(`${BaseUrl}/v1/user/bookingStatus/${hotelId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log(" hotel booking status", data);
        return data.body
    } catch (error) {
        throw new Error(`Error fetching all in get all hotel api hotel data: ${error}`);
    }
}