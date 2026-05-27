import { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser, theme } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please enter email, password, and role.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUser(data.user);
      setIsAuthorized(true);
      toast.success(data.message || "Logged in successfully.");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to login. Please try again."));
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
          <span className="auth-eyebrow">Welcome back</span>
          <h3>Login to your account</h3>
          <p>Continue to your hiring workspace and manage jobs, candidates, and applications.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
              </select>
              <FaRegUser />
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
            <label>Password</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link to={"/register"}>Register Now</Link>
        </form>
      </div>
      <div className="banner auth-visual">
        <div className="auth-visual-content">
          <span className="auth-kicker">Hire smarter</span>
          <h1>Match the right talent with the right opportunity.</h1>
          <p>
            HireIQ brings job posts, applicant tracking, and role-based workflows
            into one focused hiring experience.
          </p>
          <div className="auth-metrics">
            <div>
              <strong>12k+</strong>
              <span>active applicants</span>
            </div>
            <div>
              <strong>4.8x</strong>
              <span>faster shortlisting</span>
            </div>
            <div>
              <strong>98%</strong>
              <span>secure sessions</span>
            </div>
          </div>
        </div>
        <div className="talent-card card-primary">
          <span>Candidate Fit</span>
          <strong>92%</strong>
          <small>React Developer | Gurugram</small>
        </div>
        <div className="talent-card card-secondary">
          <span>New Application</span>
          <strong>Priya S.</strong>
          <small>Resume uploaded 2 min ago</small>
        </div>
        <div className="talent-card card-tertiary">
          <span>Interview Pipeline</span>
          <strong>24</strong>
          <small>candidates ready for review</small>
        </div>
      </div>
    </section>
  );
};

export default Login;
