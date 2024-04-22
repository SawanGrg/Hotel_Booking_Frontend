import BaseUrl from "../BaseUrl";

export default async function PostVerifyBlog(blogId, blogStatus){
    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    try {
        const response = await fetch(`${BaseUrl}/v1/admin/verifyBlog/${blogId}?status=${blogStatus}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  
            },
        });
        const data = await response.json();
        return data.statusCode;
    } catch (error) {
        console.log("error while verifying blog: ", error);
        throw new error;

    }
}