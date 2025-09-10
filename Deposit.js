import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Deposit() {
  const { balance, setBalance, setTransactions } = useOutletContext();
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");

    setBalance(balance + parseFloat(amount));
    setTransactions((prev) => [
      ...prev,
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
}

export default Deposit;
