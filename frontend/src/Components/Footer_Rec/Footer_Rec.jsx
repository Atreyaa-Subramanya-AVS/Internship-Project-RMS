import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Footer_Rec = () => {
  return (
    <div className="main-footer-Rec">
      <div class="footer-Rec">
        <div class="con" id="services">
          <h3>Services</h3>
          <Link to="/user/recipes">Recipes</Link>
          <Link to="/user/recipesbyingredients">Recipes By Ingredients</Link>
          <Link to="/user/AskAI">Ask AI</Link>
        </div>
        <div class="con" id="info">
          <h3>Information</h3>
          <Link to="/user">Terms of Service</Link>
          <Link to="/user">Privacy Policy</Link>
          <Link to="/user">Contact Us</Link>
        </div>
        <div class="con" id="subscribe">
          <h3 id="subs-h3">Subscribe</h3>
          <p>
            Join our newsletter to receive the latest recipes, cooking tips, and
            health advice!
          </p>
          <div class="reach-out">
            <div class="mail-img">
              <img src="/foot-img/email.png" alt="" />
            </div>
            <input type="text" name="email" id="email" placeholder="email" />
            <div class="arrow-img">
              <img src="/foot-img/right-arrow.png" alt="" />
            </div>
          </div>
          <div class="socials">
            <div class="facebook">
              <img src="/foot-img/facebook.png" alt="" />
            </div>
            <div class="insta">
              <img src="/foot-img/instagram.png" alt="" />
            </div>
            <div class="youtube">
              <img src="/foot-img/youtube.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="end">
        <h2>Copyright 2024 &copy; The Recipe Book. All Rights Reserved.</h2>
      </div>
    </div>
  );
};

export default Footer_Rec;
