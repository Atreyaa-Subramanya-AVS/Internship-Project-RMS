import React, { useEffect } from "react";
import "./style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();


  const setUserType = (userType) =>{
      window.localStorage.setItem("userType",userType)
      window.localStorage.setItem("loggedIn",true)
      console.log(`User Type: ${userType}`);
  }

  const redirectToUser = () =>{
      // window.history.replaceState(null, '', '/user');
      // navigate('/user')
      setUserType("User")
      console.log("User Type:",userType)
      return null;
  }

  const redirectToAdmin = () =>{
      // window.history.replaceState(null, '', '/admin');
      // navigate('/admin')
      setUserType("Admin")
      console.log("User Type:",userType)
      return null;
  }

  // useEffect(() => {
  //     const clearBackHistory = () => {
  //       window.history.replaceState(null, '', window.location.pathname);
  //     };
  //     clearBackHistory();
  //   }, []);

  useEffect(() => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
      loader.style.top = "-100%";
    }, 4200);
  }, []);

  return (
    <div className="auth">
      <div id="loader">
        <h1>Savor</h1>
        <h1>Feast</h1>
        <h1>Prep</h1>
      </div>

      <div className="auth-video-con">
        <video
          autoPlay
          muted
          loop
          class="background-video"
          className="auth-video"
        >
          <source src="/Videos/Video2.mp4" type="video/mp4" />
        </video>
      </div>

      <div class="main-auth">
        <div class="auth-content">
          <h1>Login</h1>
          <p>
            Discover a world of culinary delights, where every recipe is crafted
            with love and precision. Whether you're a seasoned chef or just
            starting your cooking journey, our collection of recipes offers
            something for everyone. Dive into a variety of dishes, learn new
            techniques, and share your own creations with our vibrant community.
            Let's cook up something amazing together!
            <br />
          </p>
          <p id="p-con">
            Bon appétit! <span>👩‍🍳👨‍🍳</span>
          </p>
        </div>
        <div class="auth-controls">
          <div class="admin">
            <Link to="/admin" onClick={redirectToAdmin}>
              <button>
                <div class="box-1"></div>
                <div class="box-2"></div>
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div class="admin-img">
                    {" "}
                    <img src="0-Auth/setting.png" alt="" />
                  </div>
                  <div class="admin-con">
                    <h3>Admin</h3>
                  </div>
                </div>
              </button>
            </Link>
          </div>
          <div class="user">
            <Link to="/user" onClick={redirectToUser}>
              <button>
                <div class="box-1"></div>
                <div class="box-2"></div>
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div class="admin-img">
                    {" "}
                    <img src="0-Auth/user.png" alt="" />
                  </div>
                  <div class="admin-con">
                    <h3>User</h3>
                  </div>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
