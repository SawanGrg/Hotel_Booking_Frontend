import BaseUrl from "../BaseUrl";


export default async function DeleteVendor(vendorId, status){
    
        const token = localStorage.getItem('token').replace(/['"]+/g, '');
    
        try {
            const response = await fetch(`${BaseUrl}/v1/admin/unverifyVendor/${vendorId}?status=${status}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  
                },
            });
            const data = await response.json();
            return data.statusCode;
        } catch (error) {
            console.log("error while deleting vendor: ", error);
            throw new error;
    
        }
    }
    