import BaseUrl from "../BaseUrl";

export default async function getVendorHotelReview() {
    const token = localStorage.getItem("token").replace(/['"]+/g, '');
    try{
        const response = await fetch(`${BaseUrl}/v1/vendor/hotelReview`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log("Hotel review data:", data.body);
        return data.body;
    }
    catch(error){
        console.error("Error fetching hotel review:", error);
    }
}