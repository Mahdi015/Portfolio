import React, { useState } from "react";
import "./Navbar.css";
import * as Scroll from "react-scroll";
import { Link } from "react-scroll";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Element } from "react-scroll";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const Navbar = ({ setTheme, theme }) => {
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
  const handleToogler = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  const onToggle = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
    setIsToggled(!isToggled);
  };
  const [isToggled, setIsToggled] = useState(false);

  const Menu = () => (
    <>
      <Link to="about" smooth={true} offset={-110} duration={800}>
        Who am I
      </Link>
      <Link to="services" smooth={true} offset={-200} duration={800}>
        Services
      </Link>
      <Link to="experience" smooth={true} offset={-120} duration={800}>
        Experience
      </Link>
      <Link
        to="projects"
        smooth={true}
        duration={800}
        offset={-80}
        isDynamic={true}
      >
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
            style={
              theme == "light"
                ? { backgroundColor: "#EBE8E7" }
                : { backgroundColor: "#161A2B" }
            }
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
            <div className="themetogglecontainer">
              <label for="checkbox" className="tegler">
                <input
                  type="checkbox"
                  checked={isToggled}
                  onChange={onToggle}
                  id="checkbox"
                />
                <span className="ball"></span>
                <span className="sun">
                  {" "}
                  <BsFillSunFill />
                </span>
                <span className="moon">
                  <BsFillMoonFill />
                </span>
              </label>
            </div>
            <div className="navbar-toggle">
              {ToggleMenu ? (
                <RiCloseLine
                  color="#fff"
                  size={35}
                  onClick={() => setToggleMenu(false)}
                />
              ) : (
                <RiMenu3Line
                  color="#fff"
                  size={35}
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
