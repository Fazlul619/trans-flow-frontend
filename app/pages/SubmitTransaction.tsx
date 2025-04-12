import { useState } from "react";
import axios from "axios";

export default function SubmitTransaction() {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    console.log(user);


    try {
      await axios.post('https://trans-flow-backend.vercel.app/api/transactions', {
        userId: user.id,
        amount: Number(amount),
      });
      alert("Transaction submitted!");
      setAmount("");
    } catch (err) {
      alert("Error submitting transaction");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Submit Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
