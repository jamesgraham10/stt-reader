import { useState } from "react";
import AuthenticateForm from "./AuthenticateForm";
import BookSummary from "./BookSummary";
import StartReadingButton from "./StartReadingButton";
import StatusMessage from "./StatusMessage";
import { authenticate } from "../api";

function Slogan() {
  return (
    <a
      className="mb-2 md:mb-6"
      href={process.env.REACT_APP_HOME_URL}
      title="Go to homepage"
    >
      <h1 className="brand text-4xl">Stories To Tell</h1>
      <p className="text-sm text-gray mb-4">
        The easy way to write your life story
      </p>
    </a>
  );
}

export default function WelcomeScreen({
  gettingInfo,
  status,
  bookInfo,
  publicHandle,
  bookData,
  setBookData,
  setHasAuth,
  setIsReading,
}) {
  const [gettingBook, setGettingBook] = useState(false);
  function renderBottom() {
    switch (status) {
      case "START_READING":
        return (
          <StartReadingButton
            css="mt-2"
            text={bookData ? "Continue reading" : null}
            loading={gettingBook}
            action={async () => {
              if (bookData) {
                setIsReading(true);
              } else {
                try {
                  setGettingBook(true);
                  const bookData = await authenticate(publicHandle);
                  setBookData(bookData);
                  setGettingBook(false);
                  setIsReading(true);
                } catch (err) {
                  console.log(err);
                  setGettingBook(false);
                }
              }
            }}
          />
        );
      case "NO_HANDLE":
      case "NOTHING_FOUND":
        return (
          <StatusMessage>
            No book found. Please check you have the correct url
          </StatusMessage>
        );
    }
  }
  return (
    <div
      className="bg-lightestGray w-full flex flex-col items-center justify-center"
      style={{
        height: "100vh",
        height: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      <div className="animate-fade-in shadow bg-white p-4 md:p-6 rounded-lg text-center my-2 mx-4">
        <Slogan />
        <div className="flex flex-col md:flex-row">
          <BookSummary loading={gettingInfo} bookInfo={bookInfo} />
          {!gettingInfo && status === "AUTHENTICATE" && (
            <AuthenticateForm
              savedAuth={{ email: bookData?.email, token: bookData?.token }}
              publicHandle={publicHandle}
              bookInfo={bookInfo}
              publicHandle={publicHandle}
              setBookData={setBookData}
              setHasAuth={setHasAuth}
              setIsReading={setIsReading}
            />
          )}
        </div>

        {gettingInfo ? (
          <StartReadingButton
            css="mt-2"
            loading={true}
            text="Fetching book..."
          />
        ) : (
          renderBottom()
        )}
      </div>
    </div>
  );
}
