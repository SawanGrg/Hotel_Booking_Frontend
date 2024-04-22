import BaseUrl from "../BaseUrl";

export default async function PostVerifyVendor(userId, status){

    const tokenFromStorage = localStorage.getItem("token").replace(/['"]+/g, "");

    try {
        const response = await fetch(`${BaseUrl}/v1/admin/verifyVendor/${userId}?status${status}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tokenFromStorage}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error verifying vendor:', error);
    }
}
