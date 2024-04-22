import BaseUrl from "../BaseUrl";

export async function postVendorRegisterData(vendorDetails, vendorImage, hotelDetails, hotelImage) {
    const formData = new FormData();

    // Append vendor data
    formData.append('vendorData', JSON.stringify(vendorDetails));

    // Append vendor image
    formData.append('vendorImage', vendorImage);

    // Remove hotel image from hotel details
    const { hotelImage: removedHotelImage, ...cleanedHotelDetails } = hotelDetails;

    // Append cleaned hotel data
    formData.append('hotelData', JSON.stringify(cleanedHotelDetails));

    // Append hotel image
    formData.append('hotelImage', hotelImage);

    console.log(vendorDetails)
    console.log(vendorImage)
    console.log(cleanedHotelDetails)
    console.log(hotelImage)

    try {
        const response = await fetch(`${BaseUrl}/v1/vendor/register`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error posting vendor data: ${error}`);
    }
}

