import { useState, useEffect } from "react";
import { checkBookCache, getBookInfo } from "./api";

import Book from "./components/Book";
import WelcomeScreen from "./components/WelcomeScreen";

function bookHasExpired(expirySeconds) {
  const ONE_HOUR_PRE_EXPIRY = expirySeconds - 3600;
  const NOW = Date.now() / 1000;
  return NOW >= ONE_HOUR_PRE_EXPIRY;
}

function App() {
  const [publicHandle] = window.location.pathname.replace("/", "").split("/");
  const [bookData, setBookData] = useState(checkBookCache(publicHandle));
  const [noBookFound, setNoBookFound] = useState(false);
  const [bookInfo, setBookInfo] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [hasAuth, setHasAuth] = useState(false);
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const [gettingInfo, setGettingInfo] = useState(true);

  useEffect(() => {
    if (publicHandle) {
      setGettingInfo(true);
      getBookInfo(publicHandle)
        .then(({ data }) => {
          const isPrivate = data.privacyStatus === "PRIVATE";
          const privacyStatusChanged =
            isPrivate &&
            bookData &&
            bookData.version.privacyStatus !== "PRIVATE";
          const bookOffline = !data.bookOnline;
          const newVersionAvailable =
            bookData && data.version !== bookData.version.version;
          const bookExpired = bookData && bookHasExpired(bookData.expires);
          if (privacyStatusChanged || bookOffline || bookExpired) {
            localStorage.removeItem(publicHandle);
            setBookData(null);
            setHasAuth(false);
          } else if (bookData || !isPrivate) {
            setHasAuth(true);
            setNewVersionAvailable(newVersionAvailable);
          } else {
            setNoBookFound(false);
          }

          if (bookOffline) {
            setBookInfo(null);
            setNoBookFound(true);
          } else {
            setBookInfo(data);
          }

          setGettingInfo(false);
        })
        .catch((e) => {
          console.log("catch", e);
          localStorage.removeItem(publicHandle);
          setBookData(null);
          setNoBookFound(true);
          setGettingInfo(false);
        });
    } else {
      setGettingInfo(false);
      setNoBookFound(true);
    }
  }, [publicHandle]);

  function setBookCache(field, value) {
    localStorage.setItem(
      publicHandle,
      JSON.stringify({ ...bookData, [field]: value })
    );
  }

  function getWelcomeStatus() {
    if (!publicHandle) {
      return "NO_HANDLE";
    } else if (noBookFound) {
      return "NOTHING_FOUND";
    } else if (!hasAuth) {
      return "AUTHENTICATE";
    } else {
      return "START_READING";
    }
  }

  if (!isReading) {
    return (
      <WelcomeScreen
        gettingInfo={gettingInfo}
        status={getWelcomeStatus()}
        setHasAuth={setHasAuth}
        bookInfo={bookInfo}
        bookData={bookData}
        publicHandle={publicHandle}
        setBookData={setBookData}
        newVersionAvailable={newVersionAvailable}
        setIsReading={setIsReading}
      />
    );
  }

  return (
    bookData && (
      <Book
        version={bookData.version}
        fragments={bookData.fragments}
        theme={
          bookData.theme || { fontClassification: "SERIF", fontSize: "NORMAL" }
        }
        cacheLastFragScrolled={bookData.lastFragScrolled}
        setBookCache={setBookCache}
      />
    )
  );
}

export default App;
