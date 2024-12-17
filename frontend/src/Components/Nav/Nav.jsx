import React, { useState, useEffect } from "react";
import "./style.css";
import logout from "./logout.png";
import magic from "./magic-wand (1).png";
import topright from "./top-right.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import next from "./next.png";
import prev from "./back.png";
import pic1 from "./Pic-Nav-1.jpeg";
import pic2 from "./Pic-Nav-2.jpg";
import pic3 from "./Pic-Nav-3.jpg";
import pic4 from "./Pic-Nav-4.jpg";

const Nav = () => {
  const [isloading, setisLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // window.localStorage.removeItem("userType");
    // window.localStorage.setItem("loggedIn", false);

    // Clear history and redirect to home
    // window.history.replaceState(null, '', '/user');
    // navigate('/', { replace: true });
    navigate("/");
  };

  useEffect(() => {
    // Ensure history state is set correctly
    // window.history.replaceState(null, '', '/user');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const contentMap = {
      "swap-0": {
        type: "Hyderabadi",
        title: "Biryani",
        desc: "A fragrant rice dish cooked with spices, meat, or vegetables.",
        goto: `/user/recipe/66b379a14896e8df86453bbf`,
      },
      "swap-1": {
        type: "Kashmiri",
        title: "Rogan Josh",
        desc: "A flavorful lamb curry with a rich, aromatic sauce.",
        goto: `/user/recipe/66b379a14896e8df86453bbf`,
      },
      "swap-2": {
        type: "Chinese",
        title: "Soup Dumplings",
        desc: "Steamed dumplings filled with a savory pork and soup mixture, known for their delicate, purse-like shape.",
        goto: `/user/recipe/66b379a14896e8df86453bbf`,
      },
      "swap-3": {
        type: "Mexican",
        title: "Tacos-Al-Pastor",
        desc: "Authentic Mexican street tacos featuring marinated pork, pineapple, and onions.",
        goto: `/user/recipe/66b379a14896e8df86453bbf`,
      },
    };

    const prevButton = document.querySelector("#next");
    const nextButton = document.querySelector("#prev");
    const menuToggle = document.querySelector("#menu-toggle input");
    const offScreenMenu = document.querySelector("#off-screen-menu");
    const navbar = document.querySelector("#navbar");
    const seeRecipeButton = document.querySelector("#seeRecipe");

    function updateContent(swapClass) {
      const content = contentMap[swapClass] || contentMap["swap-0"];

      document.querySelector(".left .type h2").textContent = content.type;
      document.querySelector(".left .left-title h1").textContent =
        content.title;
      document.querySelector(".left .left-desc p").textContent = content.desc;
      seeRecipeButton.dataset.goto = content.goto;
    }

    document.addEventListener("DOMContentLoaded", () => {
      const rightDiv = document.querySelector(".right");
      rightDiv.classList.add("swap-0");
      updateContent("swap-0");
    });

    const runAnimation = () => {
      const elements = document.querySelectorAll(
        ".left .type, .left .left-title, .left .left-desc, .left .left-btn"
      );
      elements.forEach((element) => {
        element.classList.remove("animate-content");
        void element.offsetWidth;
        element.classList.add("animate-content");
      });

      const rightDiv = document.querySelector(".right");
      const currentClass = Array.from(rightDiv.classList).find((cls) =>
        cls.startsWith("swap")
      );

      if (contentMap[currentClass]) {
        document.querySelector(".left .type h2").textContent =
          contentMap[currentClass].type;
        document.querySelector(".left .left-title h1").textContent =
          contentMap[currentClass].title;
        document.querySelector(".left .left-desc p").textContent =
          contentMap[currentClass].desc;
      }
    };

    const handlePrevClick = () => {
      const rightDiv = document.querySelector(".right");
      runAnimation();

      const currentClass =
        [...rightDiv.classList].find((cls) => cls.startsWith("swap")) ||
        "swap-0";

      let prevClass;
      if (currentClass === "swap-0") {
        prevClass = "swap-3";
      } else if (currentClass === "swap-1") {
        prevClass = "swap-0";
      } else if (currentClass === "swap-2") {
        prevClass = "swap-1";
      } else {
        prevClass = "swap-2";
      }

      rightDiv.classList.remove(currentClass);
      rightDiv.classList.add(prevClass);
      updateContent(prevClass);
    };

    const handleNextClick = () => {
      const rightDiv = document.querySelector(".right");
      runAnimation();

      const currentClass =
        [...rightDiv.classList].find((cls) => cls.startsWith("swap")) ||
        "swap-0";

      let nextClass;
      if (currentClass === "swap-0") {
        nextClass = "swap-1";
      } else if (currentClass === "swap-1") {
        nextClass = "swap-2";
      } else if (currentClass === "swap-2") {
        nextClass = "swap-3";
      } else {
        nextClass = "swap-0";
      }

      rightDiv.classList.remove(currentClass);
      rightDiv.classList.add(nextClass);
      updateContent(nextClass);
    };

    const handleScroll = () => {
      if (window.scrollY > 100) {
        navbar.style.backgroundColor = "white";
        navbar.style.zIndex = "999";
      } else {
        navbar.style.backgroundColor = "transparent";
      }
    };

    const handleSeeRecipeClick = (event) => {
      const goto = event.currentTarget.dataset.goto;
      if (goto) {
        navigate(goto);
      }
    };

    const handleMenuToggle = () => {
      offScreenMenu.classList.toggle("active", menuToggle.checked);
    };

    prevButton.addEventListener("click", handlePrevClick);
    nextButton.addEventListener("click", handleNextClick);
    window.addEventListener("scroll", handleScroll);
    seeRecipeButton.addEventListener("click", handleSeeRecipeClick);
    menuToggle.addEventListener("change", handleMenuToggle);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      prevButton.removeEventListener("click", handlePrevClick);
      nextButton.removeEventListener("click", handleNextClick);
      seeRecipeButton.removeEventListener("click", handleSeeRecipeClick);
      menuToggle.removeEventListener("change", handleMenuToggle);
    };
  }, []);

  return (
    <div className="main-bg">
      <div className="main-div">
        <nav id="navbar">
          <label className="hamburger" id="menu-toggle">
            <input type="checkbox" />
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10L13 10C10.8 10 9 8.2 9 6C9 3.5 10.8 2 13 2C15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30C23.2 30 25 28.2 25 26C25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16L27 16"></path>
            </svg>
          </label>
          <h1>The Recipe Book</h1>
          <div className="nav-con">
            <NavLink to="/user">
              <button style={{ marginTop: "0.8rem" }}>Home</button>
            </NavLink>
            <NavLink to="/user/recipes">
              <button style={{ marginTop: "0.8rem" }}>Recipes</button>
            </NavLink>
            <NavLink to="/user/recipesbyingredients">
              <button style={{ marginTop: "0.8rem" }}>
                Recipes By Ingredients
              </button>
            </NavLink>

            <NavLink to="/user/AskAI">
              <button className="magic">
                <img src={magic} alt="Magic Wand" /> Ask AI
              </button>
            </NavLink>
          </div>
          <div className="logout">
            <NavLink
              to="/"
              style={{ textDecoration: "none" }}
              onClick={handleLogout}
            >
              <button className="logout-btn" style={{ scale: "1.2" }}>
                <img src={logout} alt="Logout" /> Logout
              </button>
            </NavLink>
          </div>
        </nav>
        <div className="off-screen-menu" id="off-screen-menu">
          <ul>
            <li onClick={() => navigate("/user")}>Home</li>
            <li onClick={() => navigate("/user/recipes")}>Recipes</li>
            <li onClick={() => navigate("/user/recipesbyingredients")}>
              Recipe By Ingredients
            </li>
            <li onClick={() => navigate("/user/AskAI")}>Ask AI</li>
            <li onClick={() => navigate("/")}>Logout</li>
          </ul>
        </div>
        <main>
          <div className="left">
            <div className="type">
              <h2>Hyderabadi</h2>
            </div>
            <div className="left-title">
              <h1>Biryani</h1>
            </div>
            <div className="left-desc">
              <p>
                A fragrant rice dish cooked with spices, meat, or vegetables.
              </p>
            </div>
            <div className="left-btn" onClick={() => handleSeeRecipeClick()}>
              <button id="seeRecipe">
                Check Recipe <img src={topright} alt="Top Right Arrow" />
              </button>
            </div>
            <div className="controls">
              <div>
                <button id="next">
                  <img src={prev} alt="" />
                </button>
              </div>
              <div>
                <button id="prev">
                  <img src={next} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="div" id="div-1">
              <img src={pic3} alt="Recipe 1" />
              <h2>Type-1</h2>
              <h1>Recipe Name 1</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
                nulla quibusdam velit nesciunt, iusto architecto?
              </p>
            </div>
            <div className="div" id="div-2">
              <img src={pic2} alt="Recipe 2" />
              <h2>Type-2</h2>
              <h1>Recipe Name 2</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Architecto, velit.
              </p>
            </div>
            <div className="div" id="div-3">
              <img src={pic1} alt="Recipe 3" />
              <h2>Type-3</h2>
              <h1>Recipe Name 3</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
                ullam earum eius veniam error dignissimos ab rem assumenda nemo!
                Nulla?
              </p>
            </div>
            <div className="div" id="div-4">
              <img src={pic4} alt="Recipe 4" />
              <h2>Type-4</h2>
              <h1>Recipe Name 4</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                minima, amet est consequatur vero repellat eligendi illo?
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Nav;
