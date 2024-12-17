import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'
import logout from './logout.png'

const OnlyAdminNav = () => {
  return (
    <div className="main-adminRecipes">
        <div className="adminRecipes-logo">
            <h1>The Recipe Book</h1>
        </div>
        <div className="adminRecipes-title">
            <h2>ADMIN PORTAL</h2>
        </div>
        <div className="logout">
                <NavLink to="/" style={{textDecoration:'none'}}>
            <button className='logout-btn' style={{scale:'1'}}>
                Go To Login Page
          </button>
        </NavLink>
        </div>
    </div>
  )
}

export default OnlyAdminNav