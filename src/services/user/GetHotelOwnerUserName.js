import BaseUrl from "../BaseUrl";

export default async function GetHotelOwnerUserName(hotelId) {
    try {
        const response = await fetch(`${BaseUrl}/v1/user/hotelUserName/${hotelId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error.message);
    }
}