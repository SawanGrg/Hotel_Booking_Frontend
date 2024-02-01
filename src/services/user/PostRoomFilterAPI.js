import BaseUrl from "../BaseUrl";

export async function postRoomFilter(hotelId,
                                     maxRoomPrice,
                                     roomType,
                                     roomCategory,
                                     bedType,
                                     hasAc,
                                     hasBalcony,
                                     hasRefridge
                                     ){


    const minRoomPrice = 0;

    const formattedRoomType = roomType.trim() == '' ? '' : roomType;
    const formattedroomCategory = roomCategory.trim() =='' ? '' : roomCategory;
    const formattedroomBed = bedType.trim() == '' ? '' : bedType;
    
    const response = await fetch(`${BaseUrl}/v1/user/filterRooms?hotelId=${hotelId}&minRoomPrice=${minRoomPrice}&maxRoomPrice=${maxRoomPrice}&roomType=${formattedRoomType}&roomCategory=${formattedroomCategory}&bedType=${formattedroomBed}&hasAc=${hasAc}&hasBalcony=${hasBalcony}&hasRefridge=${hasRefridge}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    }); 

    if(response.ok){
        const responseData = await response.json();
        console.log("Success filter data from service :", responseData);
        return responseData;
    }else{
        const errorData = await response.json();
        console.error("Error from filter room service :", errorData);
        throw new Error(`Error: ${errorData.message}`);
    }
    
}