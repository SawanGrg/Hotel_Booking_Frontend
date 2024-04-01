import BaseUrl from "../BaseUrl";

export default async function GetVendorIssue() {
    try {
        const adminJWT = localStorage.getItem("token").replace(/['"]+/g, '');

        const response = await fetch(`${BaseUrl}/v1/admin/viewAllReport`, {
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
        return data.body; // Return the list of vendor issues
    } catch (error) {
        console.error("Error while fetching vendor issue data:", error);
        throw error;
    }
}