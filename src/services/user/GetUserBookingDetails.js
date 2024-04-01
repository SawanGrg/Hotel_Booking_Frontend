import BaseUrl from "../BaseUrl";

export async function getUserBookingDetails() {
    const jwt = localStorage.getItem('token').replace(/['"]+/g, '');

    try {
        const response = await fetch(`${BaseUrl}/v1/user/viewBookingDetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        });

        if (!response.status === 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("user bookings ", data);
        return data.body;
    }
    catch (error) {
        throw new Error(`Error getting data: ${error.message}`);
    }
}

        