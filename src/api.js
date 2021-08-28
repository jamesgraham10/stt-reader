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

function getSignedBookData(handle, token, email) {
  return axios.post(`${process.env.REACT_APP_ACTIONS_URL}/read`, {
    handle,
    token,
    email,
  });
}

export async function authenticate(handle, token = null, email = null) {
  const { data: bookDataResponse } = await getSignedBookData(
    handle,
    token,
    email
  );
  const bookData = {
    email,
    token,
    handle,
    ...bookDataResponse,
  };
  // // Cache book data in local storage
  localStorage.setItem(handle, JSON.stringify(bookData));
  return bookData;
}

export function getBookInfo(handle) {
  return axios.get(
    `${process.env.REACT_APP_ACTIONS_URL}/bookInfo?handle=${handle}`
  );
}
