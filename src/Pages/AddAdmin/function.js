import axios from "axios";
import { host } from "../../globalFunction";

export async function addAdmin(
  username,
  password,
  email,
  phone,
  unit,
  note,
  image
) {
  try {
    console.log("get users");
    const res = await axios.post(
      `${host}/api/1/ji/add/admin`, // URL API tujuan
      {
        username: username,
        password: password,
        email: email,
        phone: phone,
        unit: unit,
        note: note,
        image: image,
      },
      {
        // Opsi konfigurasi untuk membawa cookie
        withCredentials: true, // Membawa cookie secara otomatis
        headers: {
          "Content-Type": "application/json", // Tipe konten body data
          // Tambahkan header lain jika diperlukan, misalnya:
          // 'Authorization': 'Bearer your-token',
        },
      }
    );
    return res;
  } catch (error) {
    console.log("request error register admin");
    return { status: "404" };
  }
}
