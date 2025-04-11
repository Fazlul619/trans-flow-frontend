import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [user, setUser] = useState<{ fullName: string; credit?: number; role?: string } | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const loadUser = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    setShowLogoutModal(true);
  };

  const handleRedirectToLogin = () => {
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-[#345485] text-white py-3 px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Contact Us App</Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">
                Welcome, {user.fullName}! <span className="ml-2">(Credit: {user.credit ?? 0})</span>
              </span>

              {/* User nav links */}
              <Link to="/submit-transaction" className="hover:underline">Submit</Link>
              <Link to="/transaction-history" className="hover:underline">History</Link>

              {/* Admin nav link */}
              {user.role === "admin" && (
                <Link to="/admin-transactions" className="hover:underline">Admin</Link>
              )}

              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
          )}
        </div>
      </nav>

      {showLogoutModal && (
        <div className="bg-[#F3F4F6] w-full fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="w-[732px] bg-[#FFFFFF] rounded-lg flex flex-col justify-center gap-3 items-center p-5">
            <div>
              <img src="/images/Asset .png" alt="Welcome Image" />
              <p className="text-black w-[428px] text-xl text-center mt-5">
                Welcome back to CyberCraft Bangladesh, where your creativity thrives
              </p>
            </div>
            <button
              className="bg-[#345485] text-white p-2.5 rounded-lg"
              onClick={handleRedirectToLogin}
            >
              Go Back to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
