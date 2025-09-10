import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Password strength
  const getPassStrength = () => {
    if (password.length === 0) return "";
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };
  const passwordStrength = getPassStrength();

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "Weak":
        return "red";
      case "Medium":
        return "orange";
      case "Strong":
        return "green";
      default:
        return "black";
    }
  };

  // Confirm password
  const getConfirmColor = () => {
    if (!confirmpassword) return "black";
    return password === confirmpassword ? "green" : "red";
  };

  const getConfirmText = () => {
    if (!confirmpassword) return "";
    return password === confirmpassword
      ? "Passwords match successfully!"
      : "Passwords do not match!";
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmpassword) {
      return; // No alert, error messages already visible
    }
    if (password !== confirmpassword) return;
    alert("Signup successful!");
    navigate("/"); // redirect to login
  };

  return (
    <div className="form-container">
      <h2>Signup Form</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "5px", padding: "5px" }}
          />
          {!name && <p style={{ color: "red" }}>Username is required!</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: "5px", padding: "5px" }}
          />
          {!email && <p style={{ color: "red" }}>Email is required!</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "5px", padding: "5px" }}
          />
          <p
            className="password-strength"
            style={{ color: getStrengthColor() }}
          >
            Password Strength: {passwordStrength}
          </p>

          {!password && <p style={{ color: "red" }}>Password is required!</p>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            style={{ margin: "5px", padding: "5px" }}
          />
          {confirmpassword && (
            <p style={{ color: getConfirmColor() }}>{getConfirmText()}</p>
          )}
          {!confirmpassword && (
            <p style={{ color: "red" }}>Please confirm your password!</p>
          )}
        </div>
        <p className="error-msg">{error}</p>
        <p className="success-msg">Signup Successful!</p>
        <button type="submit" style={{ marginTop: "10px" }}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
