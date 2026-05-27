import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How HireIQ Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create your profile</p>
              <p>
                Sign up as a job seeker or employer and keep your account
                protected with secure authentication.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find or post opportunities</p>
              <p>
                Browse open roles that match your goals or publish job posts
                with clear requirements and salary details.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply and manage hiring</p>
              <p>
                Submit applications with resumes, review candidates, and keep
                every hiring action organized in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
