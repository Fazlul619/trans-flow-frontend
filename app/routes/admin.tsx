import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Eye, Trash2, Download } from "lucide-react";
export default function Admin(){
    interface Contact {
        _id: string;
        name: string;
        email: string;
        message: string;
    }

    const [contacts, setContacts] = useState<Contact[]>([]);
  const [role, setRole] = useState<string | null>(null);
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

  if (role !== "admin") {
    return <h2 className="text-center text-red-500">Access Denied</h2>;
  }
    return(
        <div className="bg-[#F3F4F6] max-w-5xl mx-auto p-10">
        <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white">
                <thead className="">
                    <tr>
                        <th className="p-2  text-black">No.</th>
                        <th className="p-2  text-black">Name</th>
                        <th className="p-2  text-black">Email</th>
                        <th className="p-2  text-black">Message</th>
                        <th className="p-2 text-black">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {contacts.map((contact, index) => (
                        <tr key={index} className="text-center border">
                            <td className="p-2  text-black">{index + 1}</td>
                            <td className="p-2  text-black">{contact.name}</td>
                            <td className="p-2  text-black">{contact.email}</td>
                            <td className="p-2  text-black">{contact.message}</td>
                            <td className="p-2  flex justify-center gap-2">
                                <button className="p-1 bg-green-100 text-green-600 rounded-full"><Eye size={16} /></button>
                                <button className="p-1 bg-blue-100 text-blue-600 rounded-full"><Download size={16} /></button>
                                <button className="p-1 bg-red-100 text-red-600 rounded-full"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
      
    )
}