import BaseUrl from "../BaseUrl";

export async function postRoomData(body, mainRoomImage, roomImage1, roomImage2, roomImage3){

    const formData = new FormData();

    // Append other data
    formData.append('roomData', JSON.stringify(body));
    
    // Append the file
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
                //send multipart/form-data instead of application/json
                //"Content-Type": "multipart/form-data",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0VmVuZG9yIiwiZXhwIjoxNzAyMjEzODg5LCJpYXQiOjE3MDIxNzc4ODl9.Ba2mfJ0NYZtY4AiQuhoxZ96FHK8EhwZQkBFydOIkQmE`,
            },
            body: formData, // Send formData directly
        });
        console.log("before json", response);
        // In postLoginData function
        if (response.status !== 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("after the submit and in json form", data);
        return data;
    } catch (error) {
        throw new Error(`Error posting room data: ${error}`);
    }
}