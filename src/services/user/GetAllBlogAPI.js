import BaseUrl from "../BaseUrl";

export async function getAllBlogData(endpoint) {
    try {
        const response = await fetch(`${BaseUrl}/v1/user/viewBlog`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.status === 200) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        //await determines that the function execution will pause at this point until the promise is resolved
        //in this case, the promise is the response.json() method
        //response.json() returns a promise that resolves with the result of parsing the body text as JSON
        const data = await response.json();
        return data.body;
    } catch (error) {
        throw new Error(`Error getting data: ${error.message}`);
    }
}