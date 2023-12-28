import BaseUrl from "../BaseUrl";

export async function getAllHotelData(pageNumber = 0, pageSize = 3) {

    const userToken =  localStorage.getItem("token");
    const removeQuotesuserToken = userToken.replace(/['"]+/g, '');

    try {
        const response = await fetch(`${BaseUrl}/v1/user/hotel?page=${pageNumber}&size=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${removeQuotesuserToken}`,
            },
        });
        if (response.status !== 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching all in get all hotel api hotel data: ${error}`);
    }
}