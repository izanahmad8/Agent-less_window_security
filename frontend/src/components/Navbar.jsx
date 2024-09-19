import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Log out successfully");
    navigate("/login");
  };
  return (
    <nav className="w-full flex font-sans justify-between items-center my-4 text-white p-4 bg-transparent">
      <div className="flex">
        <Link to="/">
          <i className="fa-solid fa-skull-crossbones text-5xl ml-8"></i>
        </Link>
      </div>
      <div className="w-1/3 text-xl font-bold flex justify-end">
        {!localStorage.getItem("token") ? (
          <>
            <Link className="hover:text-[#ec4e00] py-2 px-4 mx-4" to="/">
              Home
            </Link>
            <Link className=" hover:text-[#ec4e00] py-2 px-4 mx-4" to="/about">
              About
            </Link>
            <Link
              className=" hover:text-[#ec4e00] py-2 px-4 mx-4"
              to="/services"
            >
              Services
            </Link>
          </>
        ) : (
          <Link className=" hover:text-[#ec4e00] py-2 px-4 mx-4" to="/chats">
            Chat
          </Link>
        )}
        {!localStorage.getItem("token") ? (
          <>
            <Link className=" hover:text-[#ec4e00] py-2 px-4 mx-4" to="/downloads">
              Download
            </Link>
            {/* <Link className=" hover:text-[#ec4e00] py-2 px-4 mx-4" to="/login">
              Login
            </Link> */}
          </>
        ) : (
          <button
            className="hover:text-[#ec4e00] py-2 px-4 mx-4"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}
