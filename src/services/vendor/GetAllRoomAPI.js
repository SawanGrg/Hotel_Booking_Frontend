import BaseUrl from "../BaseUrl";

export async function getAllRoomData(pageNumber = 0, pageSize = 20) {

    const vendorToken =  localStorage.getItem("token");
    console.log("asd",vendorToken)
    console.log("Vendor Token:", vendorToken.replace(/['"]+/g, ''));
    const removeQuotesvendorToken = vendorToken.replace(/['"]+/g, '');

    try {
        const response = await fetch(`${BaseUrl}/v1/vendor/hotelRooms?page=${pageNumber}&size=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${removeQuotesvendorToken}`,
            },
        });
        if (response.status !== 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching room data: ${error}`);
    }
}
