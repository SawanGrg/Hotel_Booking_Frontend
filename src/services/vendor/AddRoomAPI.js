import BaseUrl from "../BaseUrl";
export async function postRoomData(body, mainRoomImage, roomImage1, roomImage2, roomImage3){

    const vendorToken =  localStorage.getItem("token");

    console.log("Vendor Token:", vendorToken.replace(/['"]+/g, ''));
    const removeQuotesvendorToken = vendorToken.replace(/['"]+/g, '');
    
    const formData = new FormData();

    // Append other data
    formData.append('roomData', JSON.stringify(body));
    formData.append('mainRoomImage', mainRoomImage);
    formData.append('roomImage1', roomImage1);
    formData.append('roomImage2', roomImage2);
    formData.append('roomImage3', roomImage3);
    
    try {
        console.log("before the submit 1", body);
        console.log("before the submit 2", mainRoomImage);
        console.log("before the submit 3", formData);


        const response = await fetch(`${BaseUrl}/v1/vendor/addHotelRooms`, {
            method: "POST",
            headers: {            
                "Authorization": `Bearer ${removeQuotesvendorToken}`,
            },
            body: formData, // Send formData directly
        });
        console.log("before json", response);
       
        const data = await response.json();
        console.log("after the submit and in json form", data);
        return data;
    } catch (error) {
        throw new Error(`Error posting room data: ${error}`);
    }
}
