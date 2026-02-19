import React from 'react';
import { useEffect, useState } from 'react';

const API = 'http://127.0.0.1:5000';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const [form, setForm] = useState({
    amount: '',
    type: 'expense',
    category: '',
    description: '',
    date: '',
  });

  // Fetch Transactions

  const fetchTransactions = async () => {
    const res = await fetch(`${API}/transactions`);
    const data = await res.json();
    setTransactions(data);
  };

  // Fetch Balance

  const fetchBalance = async () => {
    const res = await fetch(`${API}/balance`);
    const data = await res.json();
    setBalance(data.balance);
  };

  // Load on page start
  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  }, []);

  // Handle Form Change

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Transaction

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({
      amount: '',
      type: 'expense',
      category: '',
      description: '',
      date: '',
    });

    fetchTransactions();
    fetchBalance();
  };

  // Delete Transaction

  const deleteTransaction = async (id) => {
    await fetch(`${API}/transactions/${id}`, {
      method: 'DELETE',
    });

    fetchTransactions();
    fetchBalance();
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <h2 className="balance">Balance: ${balance}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {transactions.map((t) => (
          <li key={t.id} className={`transaction ${t.type}`}>
            <div>
              <strong>{t.category}</strong>
              <div>{t.date}</div>
              <div>${t.amount}</div>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteTransaction(t.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
