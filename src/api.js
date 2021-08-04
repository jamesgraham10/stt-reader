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

function getSignedBookData(token, email) {
  return axios.post(
    "http://localhost:8001/.netlify/functions/actions/public/stt/read",
    {
      token,
      email,
    }
  );
}

export async function authenticate(token, email) {
  const { data: bookDataResponse } = await getSignedBookData(token, email);
  const bookData = {
    email,
    data: bookDataResponse,
  };
  // // Cache book data in local storage
  localStorage.setItem(token, JSON.stringify(bookData));
  return bookData;
}

export function getBookInfo(token) {
  return axios.get(
    `http://localhost:8001/.netlify/functions/actions/public/stt/bookInfo?token=${token}`
  );
}
