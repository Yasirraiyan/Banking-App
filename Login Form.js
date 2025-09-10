import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // new
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username.trim() === "" &&
      email.trim() === "" &&
      password.trim() === ""
    ) {
      alert("Please fill up your username, email and password!");
      setError("Please fill up your username, email and password!");
      setSuccess(false);
      return;
    }

    // Only username empty
    if (
      username.trim() === "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      alert("Please fill up your username!");
      setError("Please fill up your username!");
      setSuccess(false);
      return;
    }

    // Only email empty
    if (
      username.trim() !== "" &&
      email.trim() === "" &&
      password.trim() !== ""
    ) {
      alert("Please fill up your email!");
      setError("Please fill up your email!");
      setSuccess(false);
      return;
    }

    // Only password empty
    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() === ""
    ) {
      alert("Please fill up your password!");
      setError("Please fill up your password!");
      setSuccess(false);
      return;
    }

    // Username and email empty
    if (
      username.trim() === "" &&
      email.trim() === "" &&
      password.trim() !== ""
    ) {
      alert("Please fill up your username and email!");
      setError("Please fill up your username and email!");
      setSuccess(false);
      return;
    }

    // Username and password empty
    if (
      username.trim() === "" &&
      email.trim() !== "" &&
      password.trim() === ""
    ) {
      alert("Please fill up your username and password!");
      setError("Please fill up your username and password!");
      setSuccess(false);
      return;
    }

    // Email and password empty
    if (
      username.trim() !== "" &&
      email.trim() === "" &&
      password.trim() === ""
    ) {
      alert("Please fill up your email and password!");
      setError("Please fill up your email and password!");
      setSuccess(false);
      return;
    }

    // All fields filled
    if (username && email && password) {
      alert("Welcome! You're login successfully");
      setError("");
      setSuccess(true);
      navigate("/dashboard");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to our Login Form</h2>
      <div>
        <label>Username</label>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>

        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Login Successful!</p>}
    </div>
  );
}
export default LoginForm;
