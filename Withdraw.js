import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Withdraw() {
  const { balance, minBalance, setBalance, setTransactions } =
    useOutletContext();
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");

    if (balance - amount < minBalance)
      return alert(`Insufficient funds! Minimum balance: $${minBalance}`);

    setBalance(balance - parseFloat(amount));
    setTransactions((prev) => [
      ...prev,
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
}

export default Withdraw;
