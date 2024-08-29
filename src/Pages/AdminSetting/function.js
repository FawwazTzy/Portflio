import axios from "axios";
import { host } from "../../globalFunction";

export async function fetchUsers() {
  try {
    console.log("get users");
    const res = await axios.get(`${host}/api/1/ji/get/users/admin`, {
      withCredentials: true,
    });
    return res.data.message;
  } catch (error) {
    console.log("request error get users");
    return [];
  }
}
