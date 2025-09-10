import React from "react";
import { useOutletContext } from "react-router-dom";

function TransactionHistory() {
  const { transactions } = useOutletContext();

  return (
    <div>
      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((t, idx) => (
            <li key={idx}>
              {t.date.toLocaleString()}: {t.type} ${t.amount}
              {t.to ? ` → ${t.to}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionHistory;
