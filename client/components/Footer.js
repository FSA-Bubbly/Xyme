import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className='section-footer flex mb'>
    <div className='containerfooter'>
      <div style={{ textAlign: "center", marginLeft: "20px" }}>
        <Link className='footerlink' to='/'>
          HOME
        </Link>
      </div>
      <div></div>
    </div>
  </footer>
);

/**
 * CONTAINER
 */

export default Footer;
