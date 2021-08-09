import { useState, useEffect } from "react";
import { checkBookCache, getBookInfo } from "./api";
import AuthenticateForm from "./components/AuthenticateForm";
import Book from "./components/Book";

function bookHasExpired(expirySeconds) {
  const ONE_HOUR_PRE_EXPIRY = expirySeconds - 3600;
  const NOW = Date.now() / 1000;
  return NOW >= ONE_HOUR_PRE_EXPIRY;
}

function App() {
  const [token] = window.location.pathname.replace("/", "").split("/");
  const [bookData, setBookData] = useState(checkBookCache(token));
  const [noBookFound, setNoBookFound] = useState(false);
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    // Check book status
    if (token) {
      getBookInfo(token)
        .then(({ data }) => {
          if (
            data.privacyStatus === "PRIVATE" &&
            // Previously logged in as public
            bookData.version.privacyStatus !== "PRIVATE"
          ) {
            localStorage.removeItem(token);
            setBookData(null);
          } else {
            setBookInfo(data);
          }
        })
        .catch(() => {
          localStorage.removeItem(token);
          setBookData(null);
          setNoBookFound(true);
        });
    }
  }, [token, bookData.version.privacyStatus]);

  function setBookCache(field, value) {
    localStorage.setItem(
      token,
      JSON.stringify({ ...bookData, [field]: value })
    );
  }

  if (!token) {
    // Redirect to landing page or show a message saying 404
    console.log("show stories to tell promo...");
    return <div>No token. But go to stories to tell homepage and sign up!</div>;
  }

  if (noBookFound) {
    return <div>Nothing was found</div>;
  }

  if (!bookData || bookHasExpired(bookData.expires)) {
    // No data or book expired. Time to authenticate
    return (
      <>
        <AuthenticateForm
          bookInfo={bookInfo}
          token={token}
          setBookData={setBookData}
        />
      </>
    );
  }

  // TODO we got the new data from storage. Cool, so show the book.
  // Then call the endpoint again to see if there's a newer version of the book available
  // If so, show a message to the user to see if they want to reload.
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
