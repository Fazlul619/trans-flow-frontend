import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);

      if (response.data.success) {
        alert("Sign-up successful! Please log in.");
        navigate("/login");
      } else {
        alert("Sign-up failed: " + response.data.error);
      }
    } catch (err) {
      alert("Sign-up failed: " + (err as any).response?.data?.error || "Server error");
    }
  };

  return (
    <div>
      <div className="bg-[#C2DAFFF5] max-w-5xl mx-auto rounded-lg flex items-center justify-center gap-10 p-10 my-10">
        <div>
          <img src="/images/Asset .png" alt="Welcome" />
          <p className="text-black w-[428px] text-xl text-center mt-5">
            Welcome back to CyberCraft Bangladesh, where your creativity thrives
          </p>
        </div>

        <div className="w-[487px]">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#345485]">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
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
              <label className="block text-[#345485]">Create a password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="must be 8 characters"
                className="w-full bg-white h-14 text-black mt-2 p-2 rounded-lg"
              />
            </div>
            <div className="mt-4">
              <label className="block text-[#345485]">Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="repeat password"
                className="w-full bg-white h-14 text-black mt-2 p-2 rounded-lg"
              />
            </div>
            <button type="submit" className="w-full bg-[#345485] text-white mt-4 p-2 rounded-lg hover:bg-blue-800">
              Create account
            </button>
          </form>
          <p className="text-black text-center text-2xl my-10">Or</p>
          <p className="text-black text-center">Already have an account? Log in</p>
        </div>
      </div>
    </div>
  );
}
