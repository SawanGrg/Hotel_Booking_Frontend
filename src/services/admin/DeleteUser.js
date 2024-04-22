import BaseUrl from "../BaseUrl";

export default async function DeleteUser(userId){

    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    try {
        const status= "UNVERIFIED"
        const response = await fetch(`${BaseUrl}/v1/admin/unverifyUser/${userId}?status=${status}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  
            },
        });
        const data = await response.json();
        return data.statusCode;
    } catch (error) {
        console.log("error while deleting user: ", error);
        throw new error;

    }
}
