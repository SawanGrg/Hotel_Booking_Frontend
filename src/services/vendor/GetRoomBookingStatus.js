import BaseUrl from "../BaseUrl";

export default async function getRoomBookingStatus(roomId) {
    const token = localStorage.getItem("token").replace(/['"]+/g, '');
    try{
        const response = await fetch(`${BaseUrl}/v1/vendor/bookingStatus/${roomId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log("room history" , data.body)
        return data.body;
    }
    catch(error){
        console.error("Error fetching room booking status:", error);
    }
}