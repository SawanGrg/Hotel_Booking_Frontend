import BaseUrl from "../BaseUrl";

export default async function GetAdminRevenue() {
    try {
        const adminJWT = localStorage.getItem("token").replace(/['"]+/g, '');

        const response = await fetch(`${BaseUrl}/v1/admin/adminRevenue`, {
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
        return data.body; // Return the revenue data
    } catch (error) {
        console.error("Error while fetching revenue data:", error);
        throw error;
    }
}