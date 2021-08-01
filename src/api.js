import axios from "axios";

export function checkBookCache(publicHandle = null) {
  if (!publicHandle) {
    return null;
  }
  const data = localStorage.getItem(publicHandle);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

function getSignedBookData(publicHandle, password) {
  return axios.post(
    "http://localhost:8001/.netlify/functions/actions/public/stt/read",
    {
      publicHandle,
      password,
    }
  );
}

export async function authenticate(publicHandle, password) {
  const { data: bookDataResponse } = await getSignedBookData(
    publicHandle,
    password
  );
  const bookData = {
    password,
    data: bookDataResponse,
  };
  // // Cache book data in local storage
  localStorage.setItem(publicHandle, JSON.stringify(bookData));
  return bookData;
}
