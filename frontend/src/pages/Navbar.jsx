import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold text-white tracking-wide"
      >
        ARClinks
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition"
            >
                Home
            </Link>

            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
