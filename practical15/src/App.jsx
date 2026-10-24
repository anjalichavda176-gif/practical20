import { useRef, useState } from "react";
import "./App.css";

function App() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedData({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="container">
      <h1>Login Form</h1>

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          ref={usernameRef}
          placeholder="Enter username"
          required
        />

        <label>Password</label>
        <input
          type="password"
          ref={passwordRef}
          placeholder="Enter password"
          required
        />

        <button type="submit">Login</button>
      </form>

      {submittedData && (
        <div className="result">
          <h2>Form Submitted Successfully!</h2>
          <p>
            <strong>Username:</strong> {submittedData.username}
          </p>
          <p>
            <strong>Password:</strong> (entered)
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

