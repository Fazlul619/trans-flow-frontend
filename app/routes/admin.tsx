import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Eye, Trash2, Download, X } from "lucide-react";

export default function Admin() {
    interface Contact {
        _id: string;
        name: string;
        email: string;
        message: string;
    }

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [role, setRole] = useState<string | null>(null);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Unauthorized");

                const res = await axios.get("http://localhost:5000/api/contact", {
                    headers: { Authorization: token },
                });

                setContacts(res.data);
                setRole(localStorage.getItem("role"));
            } catch (err) {
                alert("Access denied");
                navigate("/login");
            }
        };

        fetchContacts();
    }, [navigate]);

    const handleDownload = async (id: string) => {
        window.open(`http://localhost:5000/api/contact/download/${id}`, "_blank");
    };

    const handleViewDetails = async (id: string) => {
      setLoading(true);

  
      try {
          const res = await axios.get(`http://localhost:5000/api/contact/${id}`, {
              headers: { Authorization: localStorage.getItem("token") },
          });
  
         
          setSelectedContact(res.data);
      } catch (err) {
          if (axios.isAxiosError(err)) {
              console.error("Failed to fetch contact details:", err.response?.data || err.message);
          } else {
              console.error("Failed to fetch contact details:", err);
          }
          alert("Failed to fetch contact details. " + ((axios.isAxiosError(err) && err.response?.data?.error) || ""));
      } finally {
          setLoading(false);
      }
  };
  

    const closeModal = () => {
        setSelectedContact(null);
    };

    if (role !== "admin") {
        return <h2 className="text-center text-red-500">Access Denied</h2>;
    }

    return (
        <div className="bg-[#F3F4F6] w-full h-screen p-10">
            <div className="overflow-x-auto rounded-lg max-w-7xl mx-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="p-2 text-black">No.</th>
                            <th className="p-2 text-black">Name</th>
                            <th className="p-2 text-black">Email</th>
                            <th className="p-2 text-black">Message</th>
                            <th className="p-2 text-black">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index} className="text-center border">
                                <td className="p-2 text-black">{index + 1}</td>
                                <td className="p-2 text-black">{contact.name}</td>
                                <td className="p-2 text-black">{contact.email}</td>
                                <td className="p-2 text-black">{contact.message}</td>
                                <td className="p-2 flex justify-center gap-2">
                                    <button 
                                        className="p-1 bg-green-100 text-green-600 rounded-full" 
                                        onClick={() => handleViewDetails(contact._id)}
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDownload(contact._id)} 
                                        className="p-1 bg-blue-100 text-blue-600 rounded-full"
                                    >
                                        <Download size={16} />
                                    </button>
                                    <button className="p-1 bg-red-100 text-red-600 rounded-full">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {selectedContact && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-lg font-bold">User Details</h2>
                            <button onClick={closeModal}>
                                <X size={20} className="text-gray-500 hover:text-black" />
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : (
                            <div className="mt-4">
                                <p className="p-2 text-black"><strong>Name:</strong> {selectedContact.name}</p>
                                <p className="p-2 text-black"><strong>Email:</strong> {selectedContact.email}</p>
                                <p className="p-2 text-black"><strong>Message:</strong> {selectedContact.message}</p>
                            </div>
                        )}

                        <div className="mt-4 flex justify-end">
                            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
