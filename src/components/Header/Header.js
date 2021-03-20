import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { id } = useParams();

  return (


    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
      <div className="container-fluid ">
        <a className=" brand">
          Fast Ride </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav  ">
          
              <Link className="navComponent" to="/home">Home</Link>
              <Link  className="navComponent" to={`/details/${id}`}>Destination</Link>
              <Link  className="navComponent" to="/">Blog</Link>
              <Link  className="navComponent" to="/">Contact</Link>
              <Link  to={`/details/${id}`}>
              {
                loggedInUser.email?<p className=" brand">{loggedInUser.email}</p> :<button className="navButton">Login</button>
              }
              </Link>

            </ul>
          </div>
</div>
      </div>
</nav>
    );
};

export default Header;