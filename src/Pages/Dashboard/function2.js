import axios from "axios";

export async function fetchProfile() {
  try {
    console.log("get profile");
    const res = await axios.get(`http://127.0.0.1:1945/api/1/ci/get/profile`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("request error get profile");
    return false;
  }
}

export async function logout() {
  try {
    console.log("logout");
    // eslint-disable-next-line no-unused-vars
    const res = await axios.get(`http://127.0.0.1:1945/api/1/logout`, {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.log("request error logout");
    return false;
  }
}
