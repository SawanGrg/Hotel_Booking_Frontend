import BaseUrl from "../BaseUrl";

export default async function postUserBlog(blogTitle, blogDescription, blogTag, blogImage) {
    const blogDTO = {
        title: blogTitle,
        description: blogDescription,
        blogTag: blogTag,
    };

    const jwtToken = localStorage.getItem("token").replace(/['"]+/g, '');

    const formData = new FormData();

    formData.append('blogDTO', JSON.stringify(blogDTO));
    formData.append('blogImage', blogImage);

    try {
        const response = await fetch(`${BaseUrl}/v1/user/postBlog`, {
            method: "POST",
            headers: {
                
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error posting blog: ${response.statusText}`);
        }

        const res = await response.json();
        return res.body;
    } catch (error) {
        throw new Error(`Error posting blog: ${error.message}`);
    }
}
