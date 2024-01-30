import BaseUrl from "../BaseUrl";

export async function getSpecificUserDetails(){
    const userToken = localStorage.getItem("token").replace(/['"]+/g, '');
    const response = await fetch(`${BaseUrl}/v1/user/view-user-details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
    });

    if (response.ok) {
        const responseData = await response.json();
        // Handle successful response
        console.log("Success:", responseData);
        return responseData;
    } else {
        const errorData = await response.json();
        // Handle error response
        console.error("Error:", errorData);
        throw new Error(`Error: ${errorData.message}`);
    }
}