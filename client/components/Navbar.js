import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons/lib";

const Navbar = ({ handleClick, isLoggedIn }) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div>
      <div className='navbar'>
        <Link to='/' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
          <h1 className='xyme'>xyme</h1>
        </Link>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {isLoggedIn ? (
        <div className='navbuttons'>
          <Link className='navlink' to='/profile'>
            PROFILE
          </Link>
          <Link
            className='navlink'
            onClick={handleClick}
            className='navlink'
            to='/'
          >
            LOGOUT
          </Link>
        </div>
      ) : (
        <div className='navbuttons box'>
          <Link className='navlink btn btn-one' to='/signup'>
            SIGN IN
          </Link>
        </div>
      )}
    </div>
  );
};
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
