import { useState, useEffect } from "react";
import { authenticate } from "../api";
import StartReadingButton from "./StartReadingButton";
import StatusMessage from "./StatusMessage";

export default function AuthenticateForm({
  publicHandle,
  bookInfo,
  setBookData,
  setHasAuth,
  setIsReading,
  savedAuth,
}) {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(savedAuth.email || "");
  const [loginToken, setLoginToken] = useState(savedAuth.token || "");
  const [authAttempts, setAuthAttempts] = useState(0);

  useEffect(() => {
    if (authAttempts) {
      console.log(`Auth attempts: ${authAttempts}`);
    }
  }, [authAttempts]);

  return (
    <form
      className="flex flex-col flex-1 justify-between md:w-80 mt-2 md:ml-4"
      onSubmit={async (e) => {
        setErr(false);
        setLoading(true);
        e.preventDefault();
        try {
          const bookData = await authenticate(publicHandle, loginToken, email);
          setBookData(bookData);
          setHasAuth(true);
          setLoading(false);
          setIsReading(true);
        } catch (err) {
          setHasAuth(false);
          setLoading(false);
          console.log("err", err.response);
          switch (err.response.data.message) {
            case "Unauthorized":
              setErr("The email or token is invalid");
              setAuthAttempts((authAttempts) => authAttempts + 1);
              break;
            case "Bad Request":
              setErr("The email or token is invalid");
            default:
              break;
          }
        }
      }}
    >
      <div className="text-center md:text-left">
        <p className="font-medium">
          🔒&nbsp;
          <span>Enter your login details</span>
        </p>

        <input
          type="email"
          className="input"
          required
          value={email}
          placeholder="Enter your email"
          onChange={(e) => {
            setErr(null);
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="input"
          value={loginToken}
          placeholder="Enter your login token"
          onChange={(e) => {
            setErr(null);
            setLoginToken(e.target.value);
          }}
        />

        <p className="text-darkGray text-sm my-2">
          If you have lost your login information, contact the author.
        </p>
      </div>

      <StartReadingButton type="submit" loading={loading} error={err} isAuth />
    </form>
  );
}
