import BaseUrl from "../BaseUrl";

export default async function GetAllUser(userName, ascending) {
    if (!userName) {
        userName = "";
    }
    if (!ascending) {
        ascending = "true";
    }
    try {
        const adminJWT = localStorage.getItem("token").replace(/['"]+/g, '');

        const response = await fetch(`${BaseUrl}/v1/admin/viewAllUsers?userName=${userName}&ascending=${ascending}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminJWT}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data.body; // Return the list of users
    } catch (error) {
        console.error("Error while fetching user data:", error);
        throw error;
    }
}
