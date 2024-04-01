import BaseUrl from "../BaseUrl";

export default async function getRoomAvailability(roomId) {

    try{
        const response = await fetch(`${BaseUrl}/v1/user/checkRoomAvailability/${roomId}`);
        const data = await response.json();
        console.log("Room availability data:", data);
        return data.body;
    }
    catch(error){
        console.error("Error fetching room availability:", error);
    }

}
