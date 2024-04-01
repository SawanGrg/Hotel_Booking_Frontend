import BaseUrl from "../BaseUrl";

export async function postBlogCommentData(blogId, comment) {

    const jwtToken = localStorage.getItem('token').replace(/['"]+/g, '');

    try {
        const response = await fetch(`${BaseUrl}/v1/user/postBlogComment/${blogId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                comment: comment,
            }),
        });

        if (!response.status === 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data.body;
    } catch (error) {
        throw new Error(`Error posting data: ${error.message}`);
    }
}
