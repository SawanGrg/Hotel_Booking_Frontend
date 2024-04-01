import BaseUrl from "../BaseUrl";

export default async function GetHotelReview(hotelId) {
    try {
        const response = await fetch(`${BaseUrl}/v1/user/hotelReview/${hotelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log("API Response Data:", data.body); // Log the entire response for debugging
        return data.body; // Return the list of hotel reviews
    } catch (error) {
        console.error("Error while fetching hotel review data:", error);
        throw error;
    }
}
