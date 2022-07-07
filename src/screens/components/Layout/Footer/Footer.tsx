import { useLocation } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  const location = useLocation();
  
  return (
    <footer
      className="footer"
      style={{
        backgroundColor:
          location.pathname.slice(0, 7) === "/movie/" ? "white" : "transparent",
      }}
    >
      &copy; {new Date().getFullYear()}, made by{" "}
      <a href="https://github.com/ktsolkas">
        ktsolkas<i className="fa-brands fa-github"></i>
      </a>
    </footer>
  );
};

export default Footer;
