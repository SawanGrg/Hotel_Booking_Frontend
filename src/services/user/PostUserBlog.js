import BaseUrl from "../BaseUrl";

export default async function PostUserBlog(blogTitle, blogDescription, blogTag, blogImage){

    const blogDTO = {
        title: blogTitle,
        description: blogDescription,
        blogTag: blogTag,
    };

    const jwtToken =  localStorage.getItem("token").replace(/['"]+/g, '');

    const formData = new FormData();

    formData.append('blogDTO', JSON.stringify(blogDTO));
    formData.append('blogImage', blogImage);


    try{

        const response = await fetch(`${BaseUrl}/v1/user/postBlog`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
            },

            body: formData
        });

        const res = await response.json();
        return res.body;

    }catch(exception){
        throw new Error(`Error posting room data: ${exception}`);
    }


}
