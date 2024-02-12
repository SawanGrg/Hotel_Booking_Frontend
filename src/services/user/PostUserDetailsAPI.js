import BaseUrl from "../BaseUrl";

export default async function updateUserDetailsAPI(userUpgradingDetails, userProfileImage) {
    const jwtToken = localStorage.getItem("token").replace(/['"]+/g, "");

    const formData = new FormData();
    formData.append("userUpgradingDetails", JSON.stringify(userUpgradingDetails)); // Add userUpgradingDetails as JSON string

    if (userProfileImage) {
        formData.append("userProfileImage", userProfileImage); // Add userProfileImage if it exists
    }

    console.log("formData:->", formData);
    console.log((userProfileImage) ? "userProfileImage exists" : "userProfileImage does not exist");
    console.log(userProfileImage);

    const headers = {
        Authorization: `Bearer ${jwtToken}`,
    };

    try {
        const res = await fetch(`${BaseUrl}/v1/user/update-user-details`, {
            method: "POST",
            headers: headers,
            body: formData,
        });

        if (res.ok) {
            const responseData = await res.json();
            console.log("Success updated user profile from service :", responseData);
            return responseData;
        } else {
            const errorData = await res.json();
            console.error("Error from updated user profile service :", errorData);
            throw new Error(errorData.message || "Failed to update user profile");
        }
    } catch (error) {
        console.error("Failed to update user profile:", error);
        throw error;
    }
}
