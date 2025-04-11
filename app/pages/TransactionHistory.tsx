import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionHistory() {
  interface Transaction {
    _id: string;
    amount: number;
    status: string;
    createdAt: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/transactions/user/${user._id}`)
      .then((res) => setTransactions(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Your Transaction History</h2>
      <div className="space-y-4">
        {transactions.map((t) => (
          <div key={t._id} className="bg-white shadow rounded p-4 border border-gray-200">
            <p><strong>Amount:</strong> ${t.amount}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 font-bold ${t.status === "Approved" ? "text-green-600" : t.status === "Rejected" ? "text-red-500" : "text-yellow-600"}`}>
                {t.status}
              </span>
            </p>
            <p><strong>Submitted:</strong> {new Date(t.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
