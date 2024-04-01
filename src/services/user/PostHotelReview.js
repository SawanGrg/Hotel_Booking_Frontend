import BaseUrl from "../BaseUrl";

export async function postHotelReview(hotelId, review){

    const jwtToken = localStorage.getItem('token').replace(/['"]+/g, '');

    try{
        const response = await fetch(`${BaseUrl}/v1/user/review/${hotelId}`,{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });

        if(response.ok){
            const responseData = await response.json();
            console.log("Success posted hote review data from service :", responseData);
            return responseData;
        }else{
            const responseData = await response.json();
            console.error("Error posting hotel review from service :", responseData);
            return responseData;
            // throw new Error(`Error: ${errorData.message}`);
        }
    }catch(error){
        // throw new Error(`Error posting data: ${error}`);
        return {error: error};
    }
}