import BaseUrl from "../BaseUrl";

export default async function GetSpecificBlog(blogId) {
    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    try {
        const res = await fetch(`${BaseUrl}/v1/admin/specificBlog/${blogId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data.body;
    } catch (er ) {
        console.log('Error in GetSpecificBlog', er);
    }
}