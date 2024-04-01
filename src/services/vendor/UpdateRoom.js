import BaseUrl from "../BaseUrl";

export async function updateRoomData(roomId, roomDetails, mainRoomImage, roomImage1, roomImage2, roomImage3) {
    const vendorToken = localStorage.getItem("token");
    const removeQuotesvendorToken = vendorToken.replace(/['"]+/g, '');

    const formData = new FormData();
    
    formData.append('roomData', JSON.stringify(roomDetails));

    // Convert mainRoomImage string to a MultipartFile object
    const mainRoomImageFile = await fetch(mainRoomImage).then(response => response.blob());
    formData.append('mainRoomImage', new File([mainRoomImageFile], mainRoomImage));

    // Assuming roomImage1, roomImage2, and roomImage3 are already File objects
    formData.append('roomImage1', roomImage1);
    formData.append('roomImage2', roomImage2);
    formData.append('roomImage3', roomImage3);

    // Append other room data

    try {
        const response = await fetch(`${BaseUrl}/v1/vendor/updateRoom/${roomId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${removeQuotesvendorToken}`,
            },
            body: formData,
        });

        if (response.status !== 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error posting room data: ${error}`);
    }
}
