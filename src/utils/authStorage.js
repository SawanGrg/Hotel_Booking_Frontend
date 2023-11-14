function setUserData({ userData, token, roleName }) {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("role", JSON.stringify(roleName))
    localStorage.setItem("token", JSON.stringify(token));
  }
  
  function getUserData() {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    const role = localStorage.getItem("role");
    return { token, userData, role };
  }
  
  function clearUserData() {
    localStorage.clear();
  }
  
  export { setUserData, getUserData, clearUserData };