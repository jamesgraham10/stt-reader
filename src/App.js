import { useState, useEffect } from "react";

import { checkBookCache } from "./api";
import AuthenticateForm from "./components/AuthenticateForm";
import Book from "./components/Book";

function App() {
  const [publicHandle] = window.location.pathname.replace("/", "").split("/");
  const [bookData, setBookData] = useState(checkBookCache(publicHandle));
  const [init, setInit] = useState(false);
  const [version, setVersion] = useState(null);
  const [fragments, setFragments] = useState(null);

  useEffect(() => {
    if (bookData) {
      setVersion(bookData.data.stt_version[0]);
      setFragments(bookData.data.stt_fragment);
      setInit(true);
    }
  }, [bookData]);

  if (!publicHandle) {
    // Redirect to landing page, or show a message saying 404
    return (window.location = process.env.REACT_APP_HOME_URL);
  }
  if (!bookData) {
    // There is no data. Time to authenticate with the password
    return (
      <>
        <AuthenticateForm
          publicHandle={publicHandle}
          setBookData={setBookData}
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
            publicHandle,
            JSON.stringify({ ...bookData, [field]: value })
          )
        }
      />
    )
  );
}

export default App;
