import BaseUrl from "../BaseUrl";

export async function postUserRegistrationData(userDetails, userImage) {
    const formData = new FormData();

    // Append user data
    formData.append('userData', JSON.stringify(userDetails));

    // Append user image
    formData.append('userImage', userImage);

    try {
        const response = await fetch(`${BaseUrl}/v1/user/register`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorMessage = `Server responded with status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error posting user data: ${error}`);
    }
}