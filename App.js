import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Transfer from "./components/Transfer";
import TransactionHistory from "./components/TransactionHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Dashboard.Home />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="history" element={<TransactionHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
