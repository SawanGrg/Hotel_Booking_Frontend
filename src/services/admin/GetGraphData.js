import BaseUrl from "../BaseUrl";

export default async function GetGraphData() {
    try {
        const adminJWT = localStorage.getItem("token").replace(/['"]+/g, '');

        const response = await fetch(`${BaseUrl}/v1/admin/analytics`, {
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
        return data.body; // Return the graph data
    } catch (error) {
        console.error("Error while fetching graph data:", error);
        throw error;
    }
}