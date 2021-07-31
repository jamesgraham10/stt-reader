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

function getSignedBookDataUrl(publicHandle, password) {
  return axios.post(
    "http://localhost:8001/.netlify/functions/actions/public/stt/read",
    {
      publicHandle,
      password,
    }
  );
}

function getBookData(bookDataUrl) {
  return axios.get(bookDataUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function authenticate(publicHandle, password) {
  const { data: signedResponse } = await getSignedBookDataUrl(
    publicHandle,
    password
  );
  const { data: bookDataResponse } = await getBookData(signedResponse.dataUrl);
  const bookData = {
    password,
    data: bookDataResponse,
  };
  // // Cache book data in local storage
  localStorage.setItem(publicHandle, JSON.stringify(bookData));
  return bookData;
}
