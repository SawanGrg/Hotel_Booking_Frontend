import BaseUrl from "../BaseUrl";
export const DeleteRoomAPI = async (roomId) => {
  const vendorToken = localStorage.getItem("token");

  console.log("Vendor Token:", vendorToken.replace(/['"]+/g, ''));
  const removeQuotesvendorToken = vendorToken.replace(/['"]+/g, '');
  try {
    const response = await fetch(`${BaseUrl}/v1/vendor/delete/${roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${removeQuotesvendorToken}`,
      },
    });
    console.log("DeleteRoomAPI response", response);
    return response.json();
  } catch (error) {
    console.log("Error in DeleteRoomAPI", error);
    return error;
  }
};
