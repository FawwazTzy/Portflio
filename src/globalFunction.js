import axios from "axios";

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
    const res = await axios.get(`http://127.0.0.1:1945/api/1/ci/validation`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("request error cek cookie");
    return false;
  }
}
