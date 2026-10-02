import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav>

      {/* LOGO */}
      <div>
        <Link to="/">
          🛡️ SafeSpot
        </Link>
      </div>


      {/* NAVIGATION */}
      <div>

        <Link to="/">
          Home
        </Link>

        <Link to="/about">
          About
        </Link>


        {token ? (

          /* LOGGED-IN USER */
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </>

        ) : (

          /* LOGGED-OUT USER */
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Sign Up
            </Link>
          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;
