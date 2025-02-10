import "./header.css";
import logo from "../assets/logo.png";

function Header({ children }) {
  return (
    <div>
      <div className="logo-container">
        <img src={logo} className="logo" alt="Logo" />
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default Header;
