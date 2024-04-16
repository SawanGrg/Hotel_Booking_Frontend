import BaseUrl from "../BaseUrl";

export default async function GetVendorRevenueAPI() {

    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    try {
        const response = await fetch(BaseUrl + '/v1/vendor/revenue', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log("vendor revenue data", data.body);
        return data.body;
    }
    catch (error) {
        console.log('Error', error);
    }
}
