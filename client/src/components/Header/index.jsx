import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css"; 
import "./Header.css"; 

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const start = (
    <Link to="/">
      <img
        src="/src/assets/images/logo-no-background.png"
        alt="Site Logo"
        className="logo"
      />
    </Link>
  );

  const end = Auth.loggedIn() ? (
    <div className="nav-buttons">
      <Link className="p-button p-component p-button-info m-2" to="/me">
        {Auth.getProfile().authenticatedPerson.username}'s Profile
      </Link>
      <Link className="p-button p-component p-button-primary m-2" to="/log-exercise">
        Log Workout
      </Link>
      <Button label="Logout" className="p-button-secondary m-2" onClick={logout} />
    </div>
  ) : (
    <div className="nav-buttons">
      <Link className="p-button p-component p-button-light m-2" to="/about">
        About
      </Link>
      <Link className="p-button p-component p-button-primary m-2" to="/log-exercise">
      Log Workout
      </Link>
      <Link className="p-button p-component p-button-light m-2" to="/login">
        Login
      </Link>
      <Link className="p-button p-component p-button-info m-2" to="/signup">
        Signup
      </Link>
    </div>
  );

  return (
    <header>
      <Menubar start={start} end={end} className="custom-menubar" />
    </header>
  );
};

export default Header;
