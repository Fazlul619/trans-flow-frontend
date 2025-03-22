import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

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

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

    return(
        <div>
        <div className="bg-[#C2DAFFF5] max-w-5xl mx-auto rounded-lg flex items-center justify-center gap-10 p-10 my-10 ">
            <div>
                <img src="/images/Asset .png" alt="" />
                <p className="text-black w-[428px] text-xl text-center mt-5">Welcome back to CyberCraft Bangladesh, where your creativity thrives
                </p>
            </div>
        <div className="w-[487px]">
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-[#345485]">Email adress</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full bg-white h-14 text-black mt-2 p-2 rounded-lg"
            />
          </div>
          <div className="mt-4">
          <label className="block text-[#345485]">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="must be 8 characters"
              className="w-full bg-white h-14 text-black mt-2 p-2 rounded-lg"
            />
          </div>
          <button type="submit" className="w-full bg-[#345485] text-white mt-4 p-2 rounded-lg hover:bg-blue-800">Login</button>
        </form>
        <p className="text-black text-center text-2xl my-10">Or</p>
        <p className="text-black text-center">Already have an account?  Sign in</p>

    </div>
        </div>
    </div>
    )
}