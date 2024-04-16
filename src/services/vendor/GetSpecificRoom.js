import BaseUrl from "../BaseUrl";


export default async function getSpecificRoom(roomId){
    const token = localStorage.getItem("token").replace(/['"]+/g, '');
    try{
        const response = await fetch(`${BaseUrl}/v1/vendor/viewRoom/${roomId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.body;
    }
    catch(error){
        console.error("Error fetching hotel review:", error);
    }

}