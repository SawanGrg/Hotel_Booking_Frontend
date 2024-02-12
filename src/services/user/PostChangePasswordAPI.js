import BaseUrl from "../BaseUrl";

export async function postChangePasswordData(body){

    const jwtToken = localStorage.getItem('token').replace(/['"]+/g, '');

    try{
        const response = await fetch(`${BaseUrl}/v1/user/user-change-password`,{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if(response.ok){
            const responseData = await response.json();
            console.log("Success change password data from service :", responseData);
            return responseData;
        }else{
            const responseData = await response.json();
            console.error("Error from change password service :", responseData);
            return responseData;
            // throw new Error(`Error: ${errorData.message}`);
        }
    }catch(error){
        // throw new Error(`Error posting data: ${error}`);
        return {error: error};
    }
}