import React, { useEffect } from 'react'
import './style.css'
import magicwand from './magic-wand (1).png'
import logout from './logout.png'
import { NavLink ,Link ,useNavigate} from 'react-router-dom'

const OnlyNav = () => {
    useEffect(() => {
        const menuToggle = document.querySelector('#menu-toggle input');
        const offScreenMenu = document.querySelector('#off-screen-menu');
        const navbar = document.querySelector('#navbar');
        const handleScroll = () => {
            if (window.scrollY > 0) {
              navbar.style.backgroundColor = 'white';
              navbar.style.zIndex = '999';
            } else {
              navbar.style.backgroundColor = 'transparent';
            }
          };
      
          const handleMenuToggle = () => {
            offScreenMenu.classList.toggle('active', menuToggle.checked);
          };

          window.addEventListener('scroll', handleScroll);
          menuToggle.addEventListener('change', handleMenuToggle);

          return () => {
            window.removeEventListener('scroll', handleScroll);
            menuToggle.removeEventListener('change', handleMenuToggle);
          };

    }, []);
    const navigate = useNavigate()
  return (
    <div className="main-onlynav">
        <nav id="navbar">
        <label class="hamburger" id="menu-toggle">
            <input type="checkbox" />
            <svg viewBox="0 0 32 32">
              <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path class="line" d="M7 16 27 16"></path>
            </svg>
        </label>
        <h1>The Recipe Book</h1>
        <div class="nav-con">
            <NavLink to="/user">
                <button style={{marginTop: '1rem'}}>Home</button>
            </NavLink>
            <NavLink to="/user/recipes">
                <button style={{marginTop: '1rem'}}>Recipes</button>
            </NavLink>
            <NavLink to="/user/recipesbyingredients">
                <button style={{marginTop: '1rem'}}>Recipes By Ingredients</button>
            </NavLink>
            {/* <button class="magic"><img src={magicwand} alt="" />Ask AI</button> */}
            <NavLink to="/user/AskAI">
              <button className="magic">
              <img src={magicwand} alt="Magic Wand" /> Ask AI
          </button>
        </NavLink>
        </div>
        <div className="logout">
        <NavLink to="/" style={{textDecoration:'none'}}>
          <button className='logout-btn' style={{scale:'1.2'}}>
            <img src={logout} alt="Logout" /> Logout
          </button>
        </NavLink>
        </div>
    </nav>
    <div class="off-screen-menu" id="off-screen-menu">
        <ul>
            <li onClick={() => navigate('/user')}>Home</li>
            <li onClick={() => navigate('/user/recipes')}>Recipes</li>
            <li onClick={() => navigate('/user/recipesbyingredients')}>Recipe By Ingredients</li>
            <li onClick={() => navigate('/user/AskAI')}>Ask AI</li>
            <li onClick={() => navigate('/')}>Logout</li>
        </ul>
    </div>
    </div>
  )
}

export default OnlyNav