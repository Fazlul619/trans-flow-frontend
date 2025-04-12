import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import OAuthLogin from "~/components/OAuthLogin.js";


export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user)); 

      
      window.dispatchEvent(new Event("storage"));

      if (res.data.user.role === "admin") {
        navigate("/admin-transactions");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <div className=" bg-[#C2DAFFF5] rounded-lg flex items-center justify-center gap-10 p-10 my-10">
        <div>
          <img className="rounded-lg" src="/public/images/login.jpg" alt="Welcome Image" />
          <p className="text-black w-[428px] text-xl text-center mt-5">
            Welcome to our Transcation App.
          </p>
        </div>
        <div className="w-[487px]">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-[#345485]">Email address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full bg-white h-14 text-black mt-2 p-2 rounded-lg"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-[#345485]">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Must be at least 8 characters"
                className="w-full bg-white h-14 text-black mt-2 p-2 rounded-lg"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#345485] text-white mt-4 p-2 rounded-lg hover:bg-blue-800">
              Login
            </button>
            <div className="mt-4">
              <OAuthLogin />
            </div>
          </form>
          <p className="text-black text-center text-2xl my-10">Or</p>
          <p className="text-black text-center">
            Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
