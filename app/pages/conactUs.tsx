import axios from "axios";
import React, { useState } from "react";

export function ContactUs () {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sending data:", formData);
    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      console.log("Server response:", response.data);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending form data:", error);
      alert("Failed to send message.");
    }
  };
  


    return (
    <div className="max-w-5xl">
      <div className="absolute w-full h-screen ">
        <img className="w-full h-screen " src="/images/Contact.png" alt="" />
        <div className="relative -top-[600px] left-[200px] w-[487px]">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#345485]">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-white mt-2 p-2 h-14 rounded-lg text-black"
                />
              </div>
              <div className="mt-4">
                <label className="block text-[#345485]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full bg-white h-14 text-black mt-2 p-2 rounded-lg"
                />
              </div>
              <div className="mt-4">
                <label className="block text-[#345485]">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write message"
                  className="w-full mt-2 p-2 h-[140px] text-black bg-white rounded-lg"
                  rows={4}
                />
              </div>
              <button type="submit" className="w-full bg-[#345485] text-white mt-4 p-2 rounded-lg hover:bg-blue-800">Submit</button>
            </form>

        </div>
      </div>
    </div>
    );
}