import BaseUrl from "../BaseUrl";

export default async function GetSpecificHotel(userId){
    try {
        const response = await fetch(`${BaseUrl}/v1/admin/getSpecificHotel/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data.body;
    } catch (error) {
        console.error('Error fetching hotel details:', error);
    }
}