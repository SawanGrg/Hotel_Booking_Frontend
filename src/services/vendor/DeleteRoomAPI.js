import BaseUrl from "../BaseUrl";
export const DeleteRoomAPI = async (roomId) => {
    try {
      const response = await fetch(`${BaseUrl}/v1/vendor/delete/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0VmVuZG9yIiwiZXhwIjoxNzAyMjEzODg5LCJpYXQiOjE3MDIxNzc4ODl9.Ba2mfJ0NYZtY4AiQuhoxZ96FHK8EhwZQkBFydOIkQmE`,
        },
      });
      return response.json();
    } catch (error) {
      console.log("Error in DeleteRoomAPI", error);
      return error;
    }
  };
  