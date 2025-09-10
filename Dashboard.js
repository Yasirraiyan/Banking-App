import React, { useState } from "react";
import TransactionForm from "./TransactionForm";
// Banking Components
const Deposit = ({ balance, setBalance, transactions, setTransactions }) => {
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");
    setBalance(balance + parseFloat(amount));
    setTransactions([
      ...transactions,
      { type: "Deposit", amount: parseFloat(amount), date: new Date() },
    ]);
    setAmount("");
    alert(`Deposited $${amount} successfully!`);
  };

  return (
    <div>
      <h3>Deposit Money</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
};

const Withdraw = ({
  balance,
  minBalance,
  setBalance,
  transactions,
  setTransactions,
}) => {
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");
    if (balance - amount < minBalance)
      return alert(`Minimum balance $${minBalance} required`);
    setBalance(balance - parseFloat(amount));
    setTransactions([
      ...transactions,
      { type: "Withdraw", amount: parseFloat(amount), date: new Date() },
    ]);
    setAmount("");
    alert(`Withdrawn $${amount} successfully!`);
  };

  return (
    <div>
      <h3>Withdraw Money</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};

const Transfer = ({
  balance,
  minBalance,
  setBalance,
  transactions,
  setTransactions,
}) => {
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");

  const handleTransfer = () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");
    if (!to) return alert("Enter recipient username");
    if (balance - amount < minBalance)
      return alert(`Minimum balance $${minBalance} required`);
    setBalance(balance - parseFloat(amount));
    setTransactions([
      ...transactions,
      { type: "Transfer", amount: parseFloat(amount), to, date: new Date() },
    ]);
    setAmount("");
    setTo("");
    alert(`Transferred $${amount} to ${to} successfully!`);
  };

  return (
    <div>
      <h3>Transfer Money</h3>
      <input
        type="text"
        placeholder="Recipient Username"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

const TransactionHistory = ({ transactions }) => (
  <div>
    <h3>Transaction History</h3>
    {transactions.length === 0 ? (
      <p>No transactions yet.</p>
    ) : (
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>
            {t.date.toLocaleString()}: {t.type} ${t.amount}{" "}
            {t.to ? `→ ${t.to}` : ""}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("home"); // home, signup, login, deposit, withdraw, transfer, history
  const [balance, setBalance] = useState(5000);
  const [transactions, setTransactions] = useState([]);
  const [minBalance] = useState(1000);

  // User state
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ===== Signup Form =====
  const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const handleSignup = (e) => {
      e.preventDefault();
      if (!username || !email || !password) return alert("Fill all fields!");
      if (password !== confirmpassword) return alert("Passwords do not match!");
      setUser({ username, email, password });
      alert("Signup successful! Redirecting to Login...");
      setCurrentView("login"); // immediate redirect
    };

    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <br />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  };

  // ===== Login Form =====
  const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
      e.preventDefault();
      if (username === user.username && password === user.password) {
        alert("Login successful!");
        setIsLoggedIn(true);
        setCurrentView("deposit"); // default banking page
      } else {
        alert("Invalid credentials!");
      }
    };

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  // ===== Navigation =====
  const Navigation = () => (
    <nav style={{ marginBottom: "20px" }}>
      {!isLoggedIn && (
        <>
          <button onClick={() => setCurrentView("signup")}>Signup</button>
          <button onClick={() => setCurrentView("login")}>Login</button>
        </>
      )}
      {isLoggedIn && (
        <>
          <button onClick={() => setCurrentView("deposit")}>Deposit</button>
          <button onClick={() => setCurrentView("withdraw")}>Withdraw</button>
          <button onClick={() => setCurrentView("transfer")}>Transfer</button>
          <button onClick={() => setCurrentView("history")}>History</button>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setCurrentView("home");
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );

  // ===== Render Views =====
  const renderView = () => {
    if (!isLoggedIn) {
      if (currentView === "signup") return <SignupForm />;
      if (currentView === "login") return <LoginForm />;
      return <h2>Welcome! Please Signup or Login.</h2>;
    } else {
      const commonProps = {
        balance,
        setBalance,
        transactions,
        setTransactions,
        minBalance,
      };
      switch (currentView) {
        case "deposit":
          return <Deposit {...commonProps} />;
        case "withdraw":
          return <Withdraw {...commonProps} />;
        case "transfer":
          return <Transfer {...commonProps} />;
        case "history":
          return <TransactionHistory {...commonProps} />;
        default:
          return <h2>Welcome to your Dashboard!</h2>;
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Banking App</h1>
      <h3>Balance: ${balance.toFixed(2)}</h3>
      <Navigation />
      {renderView()}
    </div>
  );
}
