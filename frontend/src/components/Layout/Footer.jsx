import { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved by Vaibhav Baishkhiyar.</div>
      <div>
        <Link to={"https://github.com/vaibhav1-prog/"} target="github">
          <FaGithub />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/vaibhav-baishkhiyar108"}
          target="linkedin"
        >
          <FaLinkedin />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
