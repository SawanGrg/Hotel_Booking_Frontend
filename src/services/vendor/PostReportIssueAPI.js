import BaseUrl from "../BaseUrl";

export async function postReportIssueData(title, description) {

    const vendorToken =  localStorage.getItem("token");

    console.log("Vendor Token:", vendorToken.replace(/['"]+/g, ''));
    const removeQuotesvendorToken = vendorToken.replace(/['"]+/g, '');

    const body = {
        title: title,
        description: description,
    }
    
    const response = await fetch(`${BaseUrl}/v1/vendor/report`, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${removeQuotesvendorToken}`,
        },
        body: JSON.stringify(body),
    });
    console.log("before json", response);

    if (response.status !== 200) {
        const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log("after the submit and in json form", data);
    return data;
}