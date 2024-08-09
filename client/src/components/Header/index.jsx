import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
        <Link to="/">
            <img
              src="/src/assets/images/logo-no-background.png"
              alt="Site Logo"
              style={{ height: '100px' }}
            />
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-light m-2" to="/">
                Home
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/profile">
                Profile
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/workouts">
                Workouts
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-info m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
