import React, { useState } from "react";
import "./Navbar.css";
import * as Scroll from "react-scroll";
import { Link } from "react-scroll";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Element } from "react-scroll";
const Navbar = () => {
  const [ToggleMenu, setToggleMenu] = useState(false);
  const [navbar, setnavbar] = useState(false);
  const changeNavbarBg = () => {
    if (window.scrollY >= 90) {
      setnavbar(true);
    } else {
      setnavbar(false);
    }
  };
  window.addEventListener("scroll", changeNavbarBg);
  const Menu = () => (
    <>
      <Link to="home" smooth={true} duration={800}>
        Home
      </Link>

      <Link to="about" smooth={true} duration={800}>
        About
      </Link>
      <Link to="services" smooth={true} duration={800}>
        Services
      </Link>
      <Link to="projects" smooth={true} duration={800}>
        Projects
      </Link>
      <Link to="contact" smooth={true} duration={800}>
        Contact
      </Link>
    </>
  );
  return (
    <>
      <Element id="nav" name="nav">
        <div>
          <div
            className={navbar ? "portfolio-navbar active" : "portfolio-navbar"}
          >
            <div className="logo">
              <Link to="nav" smooth={true} duration={800}>
                Mahdi
              </Link>
            </div>
            <div className="portfolio-navbar-links">
              <Menu />
            </div>
            <div className="navbar-toggle">
              {ToggleMenu ? (
                <RiCloseLine
                  color="#fff"
                  size={27}
                  onClick={() => setToggleMenu(false)}
                />
              ) : (
                <RiMenu3Line
                  color="#fff"
                  size={27}
                  onClick={() => setToggleMenu(true)}
                />
              )}
              {ToggleMenu && (
                <div className="navbar-toggle-container scale-up-center">
                  <Menu />
                </div>
              )}
            </div>
          </div>
        </div>
      </Element>
    </>
  );
};

export default Navbar;
