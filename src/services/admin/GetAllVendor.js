import BaseUrl from "../BaseUrl";

export default async function GetAllVendor(vendorName, ascending) {
    if (!vendorName) {
        vendorName = "";
    }
    if (!ascending) {
        ascending = "true";
    }
    try {
        const adminJWT = localStorage.getItem("token").replace(/['"]+/g, '');

        const response = await fetch(`${BaseUrl}/v1/admin/viewAllVendors?userName=${vendorName}&ascending=${ascending}`, {
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
        return data.body; // Return the list of vendors
    } catch (error) {
        console.error("Error while fetching vendor data:", error);
        throw error;
    }
}