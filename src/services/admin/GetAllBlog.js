import BaseUrl from "../BaseUrl";

export default async function GetAllBlog() {

    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    try {
        const response = await fetch(`${BaseUrl}/v1/admin/BlogBeforeVerification`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data.body;
    }
    catch (error) {
        console.log('Error in GetAllBlog', error);
    }
}