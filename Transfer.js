import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Transfer() {
  const { balance, minBalance, setBalance, setTransactions } =
    useOutletContext();
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");

  const handleTransfer = () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");
    if (!to) return alert("Enter recipient username");
    if (balance - amount < minBalance)
      return alert(`Cannot transfer. Minimum balance $${minBalance} required`);

    setBalance(balance - parseFloat(amount));
    setTransactions((prev) => [
      ...prev,
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
}

export default Transfer;
