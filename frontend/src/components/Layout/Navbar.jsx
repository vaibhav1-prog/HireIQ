import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser, theme, toggleTheme } =
    useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logged out.");
    } finally {
      setUser({});
      setIsAuthorized(false);
      navigateTo("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            <img
              src={
                theme === "dark"
                  ? "/hireiq-logo-white.png"
                  : "/hireiq-logo-exact.png"
              }
              alt="HireIQ logo"
            />
          </Link>
        </div>

        {isAuthorized ? (
          <>
            <ul className={!show ? "menu" : "show-menu menu"}>
              <li>
                <Link to={"/"} onClick={() => setShow(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to={"/job/getall"} onClick={() => setShow(false)}>
                  ALL JOBS
                </Link>
              </li>
              <li>
                <Link to={"/applications/me"} onClick={() => setShow(false)}>
                  {user && user.role === "Employer"
                    ? "APPLICATIONS"
                    : "MY APPLICATIONS"}
                </Link>
              </li>
              {user && user.role === "Employer" ? (
                <>
                  <li>
                    <Link to={"/job/post"} onClick={() => setShow(false)}>
                      POST JOB
                    </Link>
                  </li>
                  <li>
                    <Link to={"/job/me"} onClick={() => setShow(false)}>
                      YOUR JOBS
                    </Link>
                  </li>
                </>
              ) : null}
              <div className="nav-actions">
                <button
                  type="button"
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            </ul>
            <div className="hamburger-wrapper">
              <button
                type="button"
                className="theme-toggle-btn mobile-toggle"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </button>
              <div className="hamburger" onClick={() => setShow(!show)}>
                {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
              </div>
            </div>
          </>
        ) : (
          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
