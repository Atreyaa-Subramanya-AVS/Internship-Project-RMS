import React, { useState, useEffect } from "react";
import "./style.css";
import logout from "./logout.png";
import { NavLink, Link, useNavigate } from "react-router-dom";

const AdminPortal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // window.localStorage.removeItem("userType");
    // window.localStorage.setItem("loggedIn", false);

    // Clear history and redirect to home
    // window.history.replaceState(null, '', '/admin');
    // navigate('/', { replace: true });
    navigate("/");
  };

  useEffect(() => {
    // Ensure history state is set correctly
    // window.history.replaceState(null, '', '/admin');
  }, []);

  return (
    <div className="main-admin">
      <nav className="admin-nav">
        <div className="nav-admin-logo">
          <h1>The Recipe Book</h1>
        </div>
        <div className="nav-admin-title">
          <h2>ADMIN PORTAL</h2>
        </div>
        <div className="logout" onClick={handleLogout}>
          <NavLink style={{ textDecoration: "none" }}>
            <button className="logout-btn" style={{ scale: "1.2" }}>
              <img src={logout} alt="Logout" /> Logout
            </button>
          </NavLink>
        </div>
      </nav>
      <div className="adminPortal-grid">
        <div className="adminPortal-card">
          {/* <div className='adminPortal-img'> */}
          <img src="/AdminPortal-img/pic1.jpeg" alt="" id="img-1" />
          {/* </div> */}
          <div className="adminPortal-h1">
            <h1>Create Recipe</h1>
          </div>
          <div className="adminPortal-p">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              asperiores voluptatibus molestiae veniam earum eos impedit
              distinctio quis similique ad?
            </p>
          </div>
          <div className="adminPortal-btn">
            <Link to="/admin/add">
              <button>
                <p className="adminPortal-btn-info">Create Recipe</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="adminPortal-card" id="card-2">
          <img src="/AdminPortal-img/pic2.jpeg" alt="" id="img-2" />
          <div className="adminPortal-h1">
            <h1>View Recipes</h1>
          </div>
          <div className="adminPortal-p">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              asperiores voluptatibus molestiae veniam earum eos impedit
              distinctio quis similique ad?
            </p>
          </div>
          <div className="adminPortal-btn">
            <Link to="/admin/adminrecipes">
              <button>
                <p className="adminPortal-btn-info">View Recipes</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
