import { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser, theme } = useContext(Context);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !role) {
      toast.error("Please fill all fields before registering.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUser(data.user);
      setIsAuthorized(true);
      toast.success(data.message || "Registered successfully.");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Unable to register. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <img
            src={
              theme === "dark"
                ? "/hireiq-logo-white.png"
                : "/hireiq-logo-exact.png"
            }
            alt="HireIQ logo"
          />
          <span className="auth-eyebrow">Start hiring</span>
          <h3>Create a new account</h3>
          <p>Join HireIQ to discover jobs, post openings, and track applications with clarity.</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="inputTag">
            <label>Register As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Name</label>
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FaPencilAlt />
            </div>
          </div>
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label>Phone Number</label>
            <div>
              <input
                type="tel"
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <FaPhoneFlip />
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <p className="!text-sm text-slate-500">
              Use at least 8 characters.
            </p>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <Link to={"/login"}>Login Now</Link>
        </form>
      </div>
      <div className="banner auth-visual">
        <div className="auth-visual-content">
          <span className="auth-kicker">Build your next move</span>
          <h1>A cleaner way to connect employers and job seekers.</h1>
          <p>
            Create your profile, choose your role, and move through the hiring
            process with secure access and simple workflows.
          </p>
          <div className="auth-metrics">
            <div>
              <strong>8k+</strong>
              <span>roles posted</span>
            </div>
            <div>
              <strong>32k+</strong>
              <span>applications managed</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>cloud access</span>
            </div>
          </div>
        </div>
        <div className="talent-card card-primary">
          <span>Employer Tools</span>
          <strong>Post jobs</strong>
          <small>Create and manage openings in minutes</small>
        </div>
        <div className="talent-card card-secondary">
          <span>Job Seeker View</span>
          <strong>Apply fast</strong>
          <small>Submit details and resume securely</small>
        </div>
        <div className="talent-card card-tertiary">
          <span>Profile Status</span>
          <strong>Ready</strong>
          <small>Your account is built for hiring</small>
        </div>
      </div>
    </section>
  );
};

export default Register;
