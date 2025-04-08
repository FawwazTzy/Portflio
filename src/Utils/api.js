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
    console.error("Error API login");
    return false;
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
    console.error("Error API check-auth");
    return false;
  }
}

export async function fetchGetUnit() {
  try {
    return await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/unit`,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error API Get unit");
    return false;
  }
}

export async function fetchGetNodes() {
  try {
    return await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/nodes`,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error API Get Nodes");
    return false;
  }
}

export async function fetchGetNodePicture(nodeName) {
  try {
    let objectUrl = null;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/node/picture`,
      // `/api/v1/login`,
      {
        node: nodeName
      },
      {
        responseType: "blob",
        withCredentials: true, // ini WAJIB kalau pakai cookie
      }
    );

    objectUrl = URL.createObjectURL(response.data);

    return objectUrl;

  } catch (error) {
    console.error("Gagal ambil gambar:", error);
    return false;
  }
}

export async function fetchChartNode(nodeName, type, start, end) {

  console.log("fetch ", nodeName)
  console.log("fetch ", type)
  try {
    return await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/node`,
      // `/api/v1/login`,
      {
        node: nodeName,
        type: type,
        start: start,
        end: end
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error API Chart Node ", error);
    return false;
  }
}

