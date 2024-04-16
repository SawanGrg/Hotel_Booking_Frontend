import BaseUrl from "../BaseUrl";

export default async function postKhaltiAPI(pidx, status, bookingId, amount) {
    const token = localStorage.getItem("token").replace(/['"]+/g, '');

    try {
        const response = await fetch(`${BaseUrl}/v1/user/khalti/update?pidx=${pidx}&status=${status}&bookingId=${bookingId}&totalAmount=${amount}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Response from postKhaltiAPI:", data);
        return data; // Assuming data is the response object containing the API response
    } catch (error) {
        throw new Error(`Error fetching all in get all hotel api hotel data: ${error}`);
    }
}
