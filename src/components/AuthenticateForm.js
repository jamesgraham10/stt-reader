import { useState, useEffect } from "react";
import { authenticate } from "../api";

export default function AuthenticateForm({ setBookData, publicHandle }) {
  const [password, setPassword] = useState("");
  const [authAttempts, setAuthAttempts] = useState(0);

  useEffect(() => {
    if (authAttempts) {
      console.log(`Auth attempts: ${authAttempts}`);
    }
  }, [authAttempts]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const bookData = await authenticate(publicHandle, password);
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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">view</button>
    </form>
  );
}
