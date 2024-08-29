import axios from "axios";

export const host = "http://localhost:1945";
export const cekTokenAdmin = "fr45st-hghjkl-snhb87";

export function generateKey() {
  // Fungsi untuk menghasilkan satu karakter acak (huruf atau angka)
  const getRandomChar = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  // Fungsi untuk menghasilkan segmen dengan panjang tertentu
  const generateSegment = (length) => {
    let segment = "";
    for (let i = 0; i < length; i++) {
      segment += getRandomChar();
    }
    return segment;
  };

  // Membuat token berdasarkan pola yang diberikan
  const part1 = generateSegment(6);
  const part2 = generateSegment(6);
  const part3 = generateSegment(6);

  return `${part1}-${part2}-${part3}`;
}

export async function cekCookie() {
  try {
    console.log("cek cookie");
    const res = await axios.get(`${host}/api/1/ci/validation`, {
      withCredentials: true,
    });
    // Periksa apakah status code adalah 200
    if (res.status === 200) {
      return true;
    } else {
      // Jika status bukan 200, kembalikan false
      console.log(`Unexpected status code: ${res.status}`);
      return false;
    }
  } catch (error) {
    console.log("request error cek cookie ", error.message);
    return false;
  }
}

export async function fetchProfile() {
  try {
    console.log("get profile");
    const res = await axios.get(`${host}/api/1/ci/get/profile`, {
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
    const res = await axios.get(`${host}/api/1/logout`, {
      withCredentials: true,
    });
    // Hapus data dari Local Storage dan update state
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    console.log("request error logout");
    return false;
  }
}
