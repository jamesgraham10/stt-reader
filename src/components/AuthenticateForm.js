import { useState, useEffect } from "react";
import { authenticate, getBookInfo } from "../api";

export default function AuthenticateForm({ setBookData, token, setNoneFound }) {
  const [email, setEmail] = useState("");
  const [authAttempts, setAuthAttempts] = useState(0);
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    getBookInfo(token)
      .then((response) => {
        if (response.data) {
          setBookInfo(response.data);
          setNoneFound(false);
        }
      })
      .catch(() => {
        setNoneFound(true);
      });
  }, []);

  useEffect(() => {
    if (authAttempts) {
      console.log(`Auth attempts: ${authAttempts}`);
    }
  }, [authAttempts]);

  return (
    bookInfo && (
      <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
        <div className="max-w-md w-96 shadow bg-white p-4 rounded-lg">
          <div className="flex">
            <img
              className="shadow"
              src={bookInfo.coverUrlThumb}
              style={{ height: "150px" }}
            />
            <div className="ml-4 flex flex-col justify-between">
              <div>
                <h1 className="font-medium text-lg">
                  {bookInfo.title}
                  <br />
                  <span className="font-normal"> by {bookInfo.author}</span>
                </h1>
              </div>
            </div>
          </div>
          <form
            className="flex flex-col mt-6"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const bookData = await authenticate(token, email);
                setBookData(bookData);
              } catch (err) {
                console.log("err", err);
                switch (err.response.data.message) {
                  case "Unauthorized":
                    setAuthAttempts((authAttempts) => authAttempts + 1);
                    break;
                  default:
                    break;
                }
              }
            }}
          >
            {bookInfo.privacyStatus === "PRIVATE" && (
              <>
                <p className="mt-2 font-medium text-gray-900">
                  🔒&nbsp;&nbsp;This book is private
                </p>
                <input
                  type="email"
                  className="w-full p-2 bg-gray-50 rounded mt-2 mb-4 text-lg"
                  value={email}
                  placeholder="Enter your email to continue"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </>
            )}
            <button
              type="submit"
              className="w-full p-2 bg-gray-50 hover:bg-gray-100 rounded text-lg"
            >
              {bookInfo.privacyStatus === "PRIVATE"
                ? "Start reading now"
                : "Start reading now"}
            </button>
          </form>
        </div>
      </div>
    )
  );
}
