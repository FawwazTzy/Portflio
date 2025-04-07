import axios from "axios";

export async function fetchLogin(username, password) {
  try {
    return await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/login`,
      // `/api/v1/login`,
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error login");
  }
}

export async function fetchCheckAuth() {
  try {
    return await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/check-auth`,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error check-auth");
  }
}
