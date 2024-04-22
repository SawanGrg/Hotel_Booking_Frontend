import BaseUrl from "../BaseUrl";

export async function getAllHotel(
    ) {

        const token = localStorage.getItem('token').replace(/['"]+/g, '');
    try {
       
        const response = await fetch(`${BaseUrl}/v1/admin/viewAllHotels`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
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