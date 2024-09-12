import axios from "axios";
import { host } from "../../globalFunction";

export async function fetchAdmins() {
  try {
    console.log("get admin");
    const res = await axios.get(`${host}/api/1/ji/get/users/admin`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log("request error get users");
    return { status: "404" };
  }
}

export async function fetchDeleteAdmin(id) {
  try {
    console.log("delete admin");
    const res = await axios.delete(`${host}/api/1/ji/delete/admin/${id}`, {
      withCredentials: true,
    });
    // return res.data.message;
    return res;
  } catch (error) {
    console.log("request error delete users");
    return { status: "404" };
  }
}

// Fungsi untuk mencari apakah searchString ada dalam data
export function searchInData(data, searchString) {
  return data.filter((item) =>
    Object.values(item).some(
      (value) => typeof value === "string" && value.includes(searchString)
    )
  );
}
