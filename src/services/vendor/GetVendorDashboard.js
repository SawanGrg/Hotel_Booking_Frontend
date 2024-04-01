import BaseUrl from "../BaseUrl";

export default async function GetVendorDashboard() {

    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    try {
        const response = await fetch(BaseUrl + '/v1/vendor/analytics', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log("vendor dash board data", data.body);
        return data.body;
    }
    catch (error) {
        console.log('Error', error);
    }
}


