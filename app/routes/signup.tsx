import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
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
        const response = await axios.post("https://trans-flow-backend.vercel.app/api/auth/signup", formData);

        if (response.data?.message == 'User registered successfully') {
          alert("Sign-up successful! Please log in.");
          navigate("/login");
        } else {
          alert("Sign-up failed: " + (response.data?.error || "Unexpected response"));
        }
      } catch (err) {
        console.error("Signup Error:", err);
        if (axios.isAxiosError(err) && err.response?.data?.error) {
          alert("Sign-up failed: " + err.response.data.error);
        } else {
          alert("Sign-up failed: Server error");
        }
      }
      
  };

  return (
    <div>
      <div className="bg-[#C2DAFFF5] rounded-lg flex items-center justify-center gap-10 p-10 my-10">
      <div>
          <img className="rounded-lg" src="/public/images/login.jpg" alt="Welcome Image" />
          <p className="text-black w-[428px] text-xl text-center mt-5">
            Welcome to our Transcation App.
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
          <p className="text-black text-center">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
        </div>
      </div>
    </div>
  );
}
