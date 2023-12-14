import BaseUrl from "../BaseUrl";

export async function getAllRoomData(pageNumber = 0, pageSize = 3) {
    try {
        const response = await fetch(`${BaseUrl}/v1/vendor/hotelRooms?page=${pageNumber}&size=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0VmVuZG9yIiwiZXhwIjoxNzAyMjEzODg5LCJpYXQiOjE3MDIxNzc4ODl9.Ba2mfJ0NYZtY4AiQuhoxZ96FHK8EhwZQkBFydOIkQmE`,
            },
        });
        if (response.status !== 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("after the submit and in json form", data);
        return data;
    } catch (error) {
        throw new Error(`Error fetching room data: ${error}`);
    }
}
