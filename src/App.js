import { useState, useEffect } from "react";

import { checkBookCache } from "./api";
import AuthenticateForm from "./components/AuthenticateForm";
import Book from "./components/Book";

function App() {
  const [token] = window.location.pathname.replace("/", "").split("/");
  const [bookData, setBookData] = useState(checkBookCache(token));
  const [init, setInit] = useState(false);
  const [version, setVersion] = useState(null);
  const [fragments, setFragments] = useState(null);
  const [noBookFound, setNoBookFound] = useState(false);

  useEffect(() => {
    if (bookData) {
      setVersion(bookData.data.stt_version[0]);
      setFragments(bookData.data.stt_fragment);
      setInit(true);
    }
  }, [bookData]);

  if (!token) {
    // Redirect to landing page, or show a message saying 404
    console.log("show stories to tell promo...");
    return <div>No token. But go to stories to tell homepage and sign up!</div>;
  }

  if (noBookFound) {
    return <div>Nothing was found</div>;
  }

  if (!bookData) {
    // There is no data. Time to authenticate with the password
    return (
      <>
        <AuthenticateForm
          token={token}
          setBookData={setBookData}
          setNoneFound={setNoBookFound}
        />
      </>
    );
  }

  // TODO we got the new data from storage. Cool, so show the book.
  // Then call the endpoint again to see if there's a newer version of the book available
  // If so, show a message to the user to see if they want to reload.
  return (
    init && (
      <Book
        version={version}
        fragments={fragments}
        theme={bookData.theme}
        cacheLastFragScrolled={bookData.lastFragScrolled}
        setBookCache={(field, value) =>
          localStorage.setItem(
            token,
            JSON.stringify({ ...bookData, [field]: value })
          )
        }
      />
    )
  );
}

export default App;
