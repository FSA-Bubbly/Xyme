import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <div>
    {" "}
    <footer className='section-footer'>
      <div className='containerfooter'>
        <div style={{ textAlign: "center", marginLeft: "20px" }}>
      

          <Link className='footerlink' to='/'>
            HOME
          </Link>
        </div>
        <div></div>
      </div>
    </footer>
  </div>
);

/**
 * CONTAINER
 */

export default Footer;
