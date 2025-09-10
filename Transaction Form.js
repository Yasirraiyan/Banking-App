import React, { useState } from "react";

function TransactionForm({
  type,
  balance,
  minBalance,
  setBalance,
  setTransactions,
}) {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState(""); // only for Transfer

  const handleTransaction = () => {
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) return alert("Enter a valid amount");

    if (type === "Withdraw" || type === "Transfer") {
      if (balance - numAmount < minBalance) {
        return alert(
          `Insufficient funds! Minimum balance $${minBalance} required`
        );
      }
    }

    // Update balance and transactions
    if (type === "Deposit") {
      setBalance(balance + numAmount);
      setTransactions((prev) => [
        ...prev,
        { type: "Deposit", amount: numAmount, date: new Date() },
      ]);
      alert(`Deposited $${numAmount} successfully!`);
    } else if (type === "Withdraw") {
      setBalance(balance - numAmount);
      setTransactions((prev) => [
        ...prev,
        { type: "Withdraw", amount: numAmount, date: new Date() },
      ]);
      alert(`Withdrawn $${numAmount} successfully!`);
    } else if (type === "Transfer") {
      if (!recipient) return alert("Enter recipient username");
      setBalance(balance - numAmount);
      setTransactions((prev) => [
        ...prev,
        {
          type: "Transfer",
          amount: numAmount,
          to: recipient,
          date: new Date(),
        },
      ]);
      alert(`Transferred $${numAmount} to ${recipient} successfully!`);
    }

    // Reset form
    setAmount("");
    setRecipient("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>{type} Money</h3>
      {type === "Transfer" && (
        <input
          type="text"
          placeholder="Recipient Username"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      )}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransaction}>{type}</button>
    </div>
  );
}

export default TransactionForm;
