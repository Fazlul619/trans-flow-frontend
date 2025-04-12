import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTransactions() {
  interface Transaction {
    _id: string;
    userId: { fullName: string; email: string };
    amount: number;
    status: "Pending" | "Approved" | "Rejected";
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/transactions`)
      .then(res => setTransactions(res.data));
  }, []);

  const handleUpdate = async (id: string, status: "Approved" | "Rejected") => {
    await axios.put(`http://localhost:5000/api/transactions/${id}`, { status });
    setTransactions(transactions.map(t => t._id === id ? { ...t, status } : t));
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Admin – Transaction Management</h2>
      {transactions.map((t) => (
        <div key={t._id} className="bg-white p-4 rounded shadow mb-4 border border-gray-300">
          <p className="text-black"><strong>User:</strong> {t.userId.fullName}</p>
          <p  className="text-black"><strong>Email:</strong> {t.userId.email}</p>
          <p  className="text-black"><strong>Amount:</strong> ${t.amount}</p>
          <p  className="text-black"><strong>Status:</strong> 
            <span className={`ml-2 font-bold ${t.status === "Approved" ? "text-green-600" : t.status === "Rejected" ? "text-red-500" : "text-yellow-600"}`}>
              {t.status}
            </span>
          </p>
          {t.status === "Pending" && (
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleUpdate(t._id, "Approved")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdate(t._id, "Rejected")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
